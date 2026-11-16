import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTasks } from '../context/TaskContext.jsx';
import TaskCard from '../components/TaskCard.jsx';
import BottomSheet from '../components/BottomSheet.jsx';

/**
 * Tasko 모바일 전체 할 일 목록 화면
 * - 상태 필터(전체/진행 중/완료/중요) 및 카테고리 필터(전체/#생활/#건강/#공부) 듀얼 필터링
 * - 검색 기능 지원
 * - 항목 터치 시 할 일 상세/수정 화면으로 이동
 * - 완료된 할 일은 취소선과 연한 회색으로 표시
 */
export default function AllTasksScreen() {
  const navigate = useNavigate();
  const {
    tasks,
    toggleTask,
    addTask,
    totalCount,
    completedCount,
    inProgressCount,
    starredCount,
  } = useTasks();

  const [statusFilter, setStatusFilter] = useState('ALL'); // 'ALL' | 'IN_PROGRESS' | 'COMPLETED' | 'STARRED'
  const [categoryFilter, setCategoryFilter] = useState('ALL'); // 'ALL' | '#생활' | '#건강' | '#공부'
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  // 필터링 적용
  const filteredTasks = tasks.filter((task) => {
    // 1. 상태 필터
    if (statusFilter === 'IN_PROGRESS' && task.completed) return false;
    if (statusFilter === 'COMPLETED' && !task.completed) return false;
    if (statusFilter === 'STARRED' && !task.starred) return false;

    // 2. 카테고리 필터
    if (categoryFilter !== 'ALL' && task.tag !== categoryFilter) return false;

    // 3. 검색어 필터
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        task.title.toLowerCase().includes(q) ||
        task.tag.toLowerCase().includes(q) ||
        (task.dueDate && task.dueDate.toLowerCase().includes(q));
      if (!match) return false;
    }

    return true;
  });

  return (
    <div className="relative w-full h-full bg-[#F8F9FA] flex flex-col overflow-hidden select-none">
      {/* 1. 상단 스티키 헤더: 뒤로가기 버튼, 타이틀, 검색 버튼 */}
      <header className="sticky top-0 z-20 bg-[#F8F9FA]/95 backdrop-blur-md px-5 py-3 border-b border-[#E9ECEF] flex items-center justify-between select-none shrink-0">
        {/* 뒤로 가기 (대시보드로 돌아가기) */}
        <button
          type="button"
          onClick={() => navigate('/dashboard')}
          aria-label="대시보드로 돌아가기"
          className="w-10 h-10 -ml-2 rounded-xl flex items-center justify-center text-[#212529] hover:bg-[#E9ECEF]/70 active:scale-95 transition-all cursor-pointer"
        >
          <svg className="w-6 h-6 stroke-[#212529]" fill="none" viewBox="0 0 24 24" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        {/* 중앙 타이틀 */}
        <h1 className="text-[18px] font-bold tracking-tight text-[#212529] text-center">전체 할 일</h1>

        {/* 우측 검색 아이콘 */}
        <button
          type="button"
          onClick={() => setIsSearchOpen(!isSearchOpen)}
          aria-label="할 일 검색"
          className="w-10 h-10 -mr-2 rounded-xl flex items-center justify-center text-[#212529] hover:bg-[#E9ECEF]/70 active:scale-95 transition-all cursor-pointer"
        >
          <svg className="w-5 h-5 stroke-[#212529]" fill="none" viewBox="0 0 24 24" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="M21 21l-4.35-4.35"></path>
          </svg>
        </button>
      </header>

      {/* 검색 입력창 토글 영역 */}
      {isSearchOpen && (
        <div className="bg-white px-5 py-2.5 border-b border-[#E9ECEF] flex items-center gap-2 shrink-0">
          <input
            type="text"
            placeholder="할 일 제목이나 태그를 검색하세요..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
            className="flex-1 h-9 px-3 rounded-lg bg-[#F8F9FA] border border-[#E9ECEF] text-xs text-[#212529] focus:outline-none focus:border-[#1EA65C]"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="text-xs text-[#868E96] hover:text-[#212529] px-1"
            >
              지우기
            </button>
          )}
        </div>
      )}

      {/* 2. 듀얼 가로 필터 칩 바 */}
      <div className="bg-[#F8F9FA] px-5 pt-3 pb-2.5 space-y-2 border-b border-[#E9ECEF]/70 select-none shrink-0">
        {/* 1줄: 상태 필터 (전체 / 진행 중 / 완료 / 중요) */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          <button
            type="button"
            onClick={() => setStatusFilter('ALL')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 active:scale-95 transition-all cursor-pointer ${
              statusFilter === 'ALL'
                ? 'bg-[#1EA65C] text-white shadow-xs'
                : 'bg-white border border-[#E9ECEF] text-[#495057] hover:border-[#1EA65C]'
            }`}
          >
            <span>전체</span>
            <span
              className={`rounded-full px-1.5 py-0.2 text-[11px] ${
                statusFilter === 'ALL' ? 'bg-white/25 text-white' : 'text-[#868E96]'
              }`}
            >
              {totalCount}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setStatusFilter('IN_PROGRESS')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium shrink-0 active:scale-95 transition-all cursor-pointer ${
              statusFilter === 'IN_PROGRESS'
                ? 'bg-[#1EA65C] text-white font-semibold shadow-xs'
                : 'bg-white border border-[#E9ECEF] text-[#495057] hover:border-[#1EA65C]'
            }`}
          >
            <span>진행 중</span>
            <span
              className={`text-[11px] ${
                statusFilter === 'IN_PROGRESS' ? 'text-white' : 'text-[#868E96]'
              }`}
            >
              {inProgressCount}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setStatusFilter('COMPLETED')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium shrink-0 active:scale-95 transition-all cursor-pointer ${
              statusFilter === 'COMPLETED'
                ? 'bg-[#1EA65C] text-white font-semibold shadow-xs'
                : 'bg-white border border-[#E9ECEF] text-[#495057] hover:border-[#1EA65C]'
            }`}
          >
            <span>완료</span>
            <span
              className={`text-[11px] ${
                statusFilter === 'COMPLETED' ? 'text-white' : 'text-[#868E96]'
              }`}
            >
              {completedCount}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setStatusFilter('STARRED')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium shrink-0 active:scale-95 transition-all cursor-pointer ${
              statusFilter === 'STARRED'
                ? 'bg-[#1EA65C] text-white font-semibold shadow-xs'
                : 'bg-white border border-[#E9ECEF] text-[#495057] hover:border-[#1EA65C]'
            }`}
          >
            <svg
              className={`w-3.5 h-3.5 ${
                statusFilter === 'STARRED' ? 'fill-white text-white' : 'fill-[#FAB005] text-[#FAB005]'
              }`}
              viewBox="0 0 24 24"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
            <span>중요</span>
            <span
              className={`text-[11px] ${
                statusFilter === 'STARRED' ? 'text-white' : 'text-[#868E96]'
              }`}
            >
              {starredCount}
            </span>
          </button>
        </div>

        {/* 2줄: 카테고리 필터 (전체 / #생활 / #건강 / #공부) */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          <button
            type="button"
            onClick={() => setCategoryFilter('ALL')}
            className={`px-3 py-1 rounded-full text-[12px] shrink-0 active:scale-95 transition-all cursor-pointer ${
              categoryFilter === 'ALL'
                ? 'font-semibold bg-[#212529] text-white'
                : 'font-medium bg-white border border-[#E9ECEF] text-[#495057] hover:border-[#1EA65C]'
            }`}
          >
            전체
          </button>
          {['#생활', '#건강', '#공부'].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1 rounded-full text-[12px] shrink-0 active:scale-95 transition-all cursor-pointer ${
                categoryFilter === cat
                  ? 'font-semibold bg-[#212529] text-white'
                  : 'font-medium bg-white border border-[#E9ECEF] text-[#495057] hover:border-[#1EA65C]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 3. 태스크 리스트 메인 스크롤 영역 */}
      <main className="flex-1 overflow-y-auto px-5 py-3.5 space-y-3 pb-24 no-scrollbar">
        {filteredTasks.length === 0 ? (
          <div className="h-44 flex flex-col items-center justify-center text-center p-6 bg-white rounded-2xl border border-dashed border-[#E9ECEF]">
            <p className="text-sm font-medium text-[#495057]">조건에 맞는 할 일이 없습니다</p>
            <p className="text-xs text-[#868E96] mt-1">필터를 변경하거나 새 할 일을 추가해보세요</p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <TaskCard key={task.id} task={task} onToggle={toggleTask} />
          ))
        )}
      </main>

      {/* 4. 플로팅 액션 버튼 (FAB +) */}
      <div className="absolute right-5 bottom-6 z-30">
        <button
          type="button"
          onClick={() => setIsBottomSheetOpen(true)}
          aria-label="새 태스크 추가"
          className="w-14 h-14 rounded-full bg-[#1EA65C] text-white flex items-center justify-center shadow-[0_4px_14px_rgba(30,166,92,0.35)] hover:bg-[#178449] active:scale-95 transition-all cursor-pointer"
        >
          <svg className="w-6 h-6 stroke-white" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </button>
      </div>

      {/* 5. 바텀시트 */}
      <BottomSheet
        isOpen={isBottomSheetOpen}
        onClose={() => setIsBottomSheetOpen(false)}
        onAddTask={addTask}
      />
    </div>
  );
}
