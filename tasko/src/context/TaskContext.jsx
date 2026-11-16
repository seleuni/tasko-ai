import React, { createContext, useContext, useState } from 'react';
import initialTasks from '../data/tasks.js';

// 할 일 상태 공유를 위한 React Context
const TaskContext = createContext(null);

export function TaskProvider({ children }) {
  // src/data/tasks.js의 8개 샘플 데이터를 초기 상태로 사용
  const [tasks, setTasks] = useState(initialTasks);

  // 할 일 완료 상태 토글 함수
  const toggleTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // 할 일 추가 함수
  const addTask = ({ title, priority = 'medium', tag = '#생활', dueDate = '오늘', starred = false }) => {
    const newTask = {
      id: Date.now(),
      title,
      tag,
      priority,
      completed: false,
      starred: Boolean(starred),
      dueDate: dueDate || '오늘 마감',
      isOverdue: false,
      createdAt: new Date().toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }).replace(/\. /g, '.').replace(/\.$/, '')
    };
    setTasks((prev) => [newTask, ...prev]);
    return newTask;
  };

  // 할 일 수정 함수
  const updateTask = (id, updatedFields) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, ...updatedFields } : task
      )
    );
  };

  // 할 일 삭제 함수
  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  // 통계 계산: 8개 할 일을 기준으로 계산
  const totalCount = tasks.length;
  const completedCount = tasks.filter((t) => t.completed).length;
  const inProgressCount = totalCount - completedCount;
  const starredCount = tasks.filter((t) => t.starred).length;
  const percentage = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  // 카테고리별 통계 계산 (#생활, #건강, #공부 등)
  const categories = ['#생활', '#건강', '#공부'];
  const categoryStats = categories.map((cat) => {
    const catTasks = tasks.filter((t) => t.tag === cat);
    const catTotal = catTasks.length;
    const catCompleted = catTasks.filter((t) => t.completed).length;
    const catPercentage = catTotal === 0 ? 0 : Math.round((catCompleted / catTotal) * 100);
    return {
      name: cat,
      total: catTotal,
      completed: catCompleted,
      percentage: catPercentage,
    };
  });

  return (
    <TaskContext.Provider
      value={{
        tasks,
        toggleTask,
        addTask,
        updateTask,
        deleteTask,
        totalCount,
        completedCount,
        inProgressCount,
        starredCount,
        percentage,
        categoryStats,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

// 편의를 위한 Custom Hook
export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
}
