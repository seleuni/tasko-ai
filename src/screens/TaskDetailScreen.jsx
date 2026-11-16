import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTasks } from '../context/TaskContext.jsx';

/**
 * Tasko 모바일 할 일 상세/수정 화면
 * - 상단 앱 바: 뒤로 가기, 타이틀(할 일 상세), 삭제 버튼(휴지통)
 * - 완료 상태 토글 카드
 * - 제목, 우선순위, 카테고리, 마감일, 중요 표시 수정 폼
 * - 주의: 요구사항에 따라 중요 표시 아래 설명 문구("목록 상단에 강조 표시됩니다")는 넣지 않습니다.
 * - 하단 '저장하기' 버튼으로 변경사항 저장
 */
export default function TaskDetailScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks, updateTask, deleteTask } = useTasks();

  const taskId = Number(id);
  const task = tasks.find((t) => t.id === taskId);

  // 로컬 폼 상태
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('medium');
  const [tag, setTag] = useState('#생활');
  const [dueDate, setDueDate] = useState('');
  const [starred, setStarred] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [createdAt, setCreatedAt] = useState('2026.11.10');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setPriority(task.priority || 'medium');
      setTag(task.tag || '#생활');
      setDueDate(task.dueDate || '');
      setStarred(Boolean(task.starred));
      setCompleted(Boolean(task.completed));
      setCreatedAt(task.createdAt || '2026.11.10');
    }
  }, [task]);

  if (!task) {
    return (
      <div className="w-full h-full bg-[#F8F9FA] flex flex-col items-center justify-center p-6 text-center">
        <p className="text-base font-semibold text-[#212529] mb-2">할 일을 찾을 수 없습니다.</p>
        <button
          type="button"
          onClick={() => navigate('/tasks')}
          className="px-4 py-2 bg-[#1EA65C] text-white text-sm font-semibold rounded-xl"
        >
          할 일 목록으로 돌아가기
        </button>
      </div>
    );
  }

  // 완료 상태 토글
  const handleToggleCompletion = () => {
    setCompleted(!completed);
  };

  // 삭제 처리
  const handleDelete = () => {
    if (window.confirm('이 할 일을 삭제하시겠습니까?')) {
      deleteTask(taskId);
      navigate(-1);
    }
  };

  // 저장 처리
  const handleSave = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    updateTask(taskId, {
      title: title.trim(),
      priority,
      tag,
      dueDate: dueDate.trim() || '오늘',
      starred,
      completed,
    });

    navigate(-1);
  };

  return (
    <div className="relative w-full h-full bg-[#F8F9FA] flex flex-col overflow-hidden select-none">
      {/* 1. 상단 내비게이션 바 (뒤로가기, 타이틀, 삭제 버튼) */}
      <nav className="w-full px-5 py-3 flex items-center justify-between bg-[#F8F9FA] z-20 shrink-0 border-b border-[#E9ECEF]/70">
        {/* 뒤로 가기 버튼 */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="뒤로 가기"
          className="w-10 h-10 -ml-2 flex items-center justify-center rounded-full hover:bg-gray-200/60 active:scale-95 transition-all text-[#212529] cursor-pointer"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" viewBox="0 0 24 24">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        {/* 중앙 타이틀 */}
        <h1 className="text-[17px] font-bold text-[#212529] tracking-tight">할 일 상세</h1>

        {/* 삭제 버튼 (Destructive Red) */}
        <button
          type="button"
          onClick={handleDelete}
          aria-label="할 일 삭제"
          className="w-10 h-10 -mr-2 flex items-center justify-center rounded-full hover:bg-red-50 active:scale-95 transition-all text-[#FA5252] cursor-pointer"
        >
          <svg className="w-[22px] h-[22px]" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.9" viewBox="0 0 24 24">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            <line x1="10" x2="10" y1="11" y2="17"></line>
            <line x1="14" x2="14" y1="11" y2="17"></line>
          </svg>
        </button>
      </nav>

      {/* 2. 메인 스크롤 영역 */}
      <main className="flex-1 overflow-y-auto px-5 pt-3 pb-6 no-scrollbar flex flex-col justify-between">
        <form onSubmit={handleSave} className="space-y-4">
          {/* 완료 상태 토글 카드 */}
          <section
            onClick={handleToggleCompletion}
            className="bg-white rounded-2xl p-4 border border-[#E9ECEF] flex items-center justify-between shadow-[0_1px_2px_rgba(0,0,0,0.03)] cursor-pointer hover:border-gray-300 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-[22px] h-[22px] rounded-full flex items-center justify-center transition-all ${
                  completed
                    ? 'bg-[#1EA65C] text-white'
                    : 'border-2 border-[#E9ECEF] bg-white'
                }`}
              >
                {completed && (
                  <svg className="w-3.5 h-3.5 stroke-[3]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                )}
              </div>
              <span className={`text-[15px] font-medium ${completed ? 'line-through text-[#868E96]' : 'text-[#212529]'}`}>
                {completed ? '완료됨' : '완료로 표시'}
              </span>
            </div>
            <span
              className={`text-[12px] font-medium px-2 py-0.5 rounded-md ${
                completed ? 'bg-[#E8F7EE] text-[#1EA65C]' : 'bg-gray-100 text-[#868E96]'
              }`}
            >
              {completed ? '완료됨' : '진행 중'}
            </span>
          </section>

          {/* 수정 입력 폼 카드 */}
          <section className="bg-white rounded-2xl p-4 border border-[#E9ECEF] shadow-[0_1px_2px_rgba(0,0,0,0.03)] space-y-4">
            {/* 항목 1: 할 일 제목 */}
            <div className="space-y-1.5">
              <label className="block text-[13px] font-semibold text-[#495057]" htmlFor="editTitleInput">
                할 일 제목 <span className="text-[#FA5252]">*</span>
              </label>
              <input
                id="editTitleInput"
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`w-full h-12 px-3.5 rounded-xl border border-[#E9ECEF] bg-white font-medium text-[15px] focus:border-[#1EA65C] focus:ring-1 focus:ring-[#1EA65C] focus:outline-none transition-colors ${
                  completed ? 'line-through text-[#868E96]' : 'text-[#212529]'
                }`}
              />
            </div>

            {/* 항목 2: 우선순위 선택 버튼 그룹 */}
            <div className="space-y-1.5">
              <label className="block text-[13px] font-semibold text-[#495057]">
                우선순위
              </label>
              <div className="grid grid-cols-3 gap-2">
                {/* 높음 */}
                <button
                  type="button"
                  onClick={() => setPriority('high')}
                  className={`h-11 rounded-xl text-[14px] flex items-center justify-center transition-all cursor-pointer ${
                    priority === 'high'
                      ? 'font-semibold border border-[#FFA8A8] bg-[#FFF5F5] text-[#FA5252] shadow-xs'
                      : 'font-medium border border-[#E9ECEF] bg-white text-[#495057] hover:bg-gray-50'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full mr-1.5 bg-[#FA5252] ${priority !== 'high' ? 'opacity-60' : ''}`}></span>
                  높음
                </button>

                {/* 중간 */}
                <button
                  type="button"
                  onClick={() => setPriority('medium')}
                  className={`h-11 rounded-xl text-[14px] flex items-center justify-center transition-all cursor-pointer ${
                    priority === 'medium'
                      ? 'font-semibold border border-[#212529] bg-[#F8F9FA] text-[#212529] shadow-xs'
                      : 'font-medium border border-[#E9ECEF] bg-white text-[#495057] hover:bg-gray-50'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full mr-1.5 bg-amber-400 ${priority !== 'medium' ? 'opacity-60' : ''}`}></span>
                  중간
                </button>

                {/* 낮음 */}
                <button
                  type="button"
                  onClick={() => setPriority('low')}
                  className={`h-11 rounded-xl text-[14px] flex items-center justify-center transition-all cursor-pointer ${
                    priority === 'low'
                      ? 'font-semibold border border-[#1EA65C]/40 bg-[#E8F7EE] text-[#1EA65C] shadow-xs'
                      : 'font-medium border border-[#E9ECEF] bg-white text-[#495057] hover:bg-gray-50'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full mr-1.5 bg-[#1EA65C] ${priority !== 'low' ? 'opacity-60' : ''}`}></span>
                  낮음
                </button>
              </div>
            </div>

            {/* 항목 3: 카테고리 선택 */}
            <div className="space-y-1.5">
              <label className="block text-[13px] font-semibold text-[#495057]" htmlFor="editCategorySelect">
                카테고리
              </label>
              <div className="relative">
                <select
                  id="editCategorySelect"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  className="w-full h-12 px-3.5 pr-10 rounded-xl border border-[#E9ECEF] bg-white text-[#212529] font-medium text-[15px] appearance-none focus:border-[#1EA65C] focus:ring-1 focus:ring-[#1EA65C] focus:outline-none transition-colors cursor-pointer"
                >
                  <option value="#생활">#생활</option>
                  <option value="#건강">#건강</option>
                  <option value="#공부">#공부</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-[#495057]">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
              </div>
            </div>

            {/* 항목 4: 마감일 선택 입력 */}
            <div className="space-y-1.5">
              <label className="block text-[13px] font-semibold text-[#495057]" htmlFor="editDueDateInput">
                마감일
              </label>
              <div className="relative">
                <input
                  id="editDueDateInput"
                  type="text"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full h-12 px-3.5 pr-10 rounded-xl border border-[#E9ECEF] bg-white text-[#212529] font-medium text-[15px] focus:border-[#1EA65C] focus:ring-1 focus:ring-[#1EA65C] focus:outline-none transition-colors"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-[#495057]">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                    <rect height="18" rx="2" ry="2" width="18" x="3" y="4"></rect>
                    <line x1="16" x2="16" y1="2" y2="6"></line>
                    <line x1="8" x2="8" y1="2" y2="6"></line>
                    <line x1="3" x2="21" y1="10" y2="10"></line>
                  </svg>
                </div>
              </div>
            </div>

            {/* 항목 5: 중요 표시 (토글 스위치, 요구사항: 설명 문구 제외!) */}
            <div className="pt-1">
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#F8F9FA] border border-[#E9ECEF]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-[#FAB005] fill-current" viewBox="0 0 24 24">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                  </div>
                  {/* 설명 문구 없이 "중요 할 일로 표시"만 단독 표시 */}
                  <div className="text-[14px] font-semibold text-[#212529]">
                    중요 할 일로 표시
                  </div>
                </div>

                {/* 활성 iOS 토글 스위치 */}
                <label className="relative inline-flex items-center cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={starred}
                    onChange={(e) => setStarred(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1EA65C]"></div>
                </label>
              </div>
            </div>
          </section>

          {/* 생성 일자 메타데이터 */}
          <div className="text-center pt-1">
            <span className="text-[12px] font-normal text-[#868E96] tracking-tight">
              {createdAt} 생성
            </span>
          </div>

          {/* 3. 하단 액션 버튼: 저장하기 */}
          <div className="pt-2 pb-2">
            <button
              type="submit"
              className="w-full h-[50px] bg-[#1EA65C] hover:bg-[#178449] active:scale-[0.99] text-white font-bold text-[16px] rounded-xl shadow-sm transition-all flex items-center justify-center cursor-pointer"
            >
              저장하기
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
