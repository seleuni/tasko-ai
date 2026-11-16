import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTasks } from '../context/TaskContext.jsx';
import TaskCard from '../components/TaskCard.jsx';
import BottomSheet from '../components/BottomSheet.jsx';

/**
 * Tasko 모바일 대시보드 화면
 * - 완료율 달성 카드 및 카테고리별 진행도 표시
 * - "오늘 할 일 · 전체 보기 >" 링크 제공 (클릭 시 전체 목록 화면으로 이동)
 * - 할 일 카드 터치 시 상세/수정 화면으로 이동
 * - 우측 하단 에메랄드 그린 FAB (+) 버튼을 통해 새로운 할 일 추가 바텀시트 오픈
 */
export default function DashboardScreen() {
  const navigate = useNavigate();
  const {
    tasks,
    toggleTask,
    addTask,
    totalCount,
    completedCount,
    inProgressCount,
    starredCount,
    percentage,
    categoryStats,
  } = useTasks();

  const [currentFilter, setCurrentFilter] = useState('ALL'); // 'ALL' | 'IN_PROGRESS' | 'COMPLETED' | 'STARRED'
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);

  // 필터 조건에 따른 태스크 필터링
  const filteredTasks = tasks.filter((task) => {
    // 텍스트 검색 조건 (검색 활성화 시)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        task.title.toLowerCase().includes(q) ||
        task.tag.toLowerCase().includes(q) ||
        (task.dueDate && task.dueDate.toLowerCase().includes(q));
      if (!match) return false;
    }

    // 상태 필터 조건
    if (currentFilter === 'IN_PROGRESS') return !task.completed;
    if (currentFilter === 'COMPLETED') return task.completed;
    if (currentFilter === 'STARRED') return task.starred;
    return true;
  });

  return (
    <div className="relative w-full h-full bg-[#F8F9FA] flex flex-col overflow-hidden select-none">
      {/* 1. 상단 Safe Area & 헤더 섹션 */}
      <header className="pt-2 px-5 pb-3 bg-white border-b border-[#E9ECEF] flex items-center justify-between shrink-0 z-10">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#1EA65C] flex items-center justify-center text-white shadow-sm">
            <svg className="w-4 h-4 stroke-[2.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <h1 className="text-xl font-bold text-[#212529] tracking-tight">오늘의 할 일</h1>
        </div>

        {/* 우측 액션: 검색 아이콘 및 프로필 아바타 */}
        <div className="flex items-center gap-2.5">
          {/* 검색 토글 버튼 */}
          <button
            type="button"
            onClick={() => setIsSearchActive(!isSearchActive)}
            aria-label="할 일 검색"
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#F8F9FA] text-[#495057] active:scale-95 transition-all"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
          {/* 프로필 아바타: 클릭 시 로그아웃 / 로그인 화면 이동 가능 */}
          <button
            type="button"
            onClick={() => navigate('/login')}
            title="로그인 화면으로 이동"
            className="w-8 h-8 rounded-full bg-[#E8F7EE] border border-[#1EA65C]/20 flex items-center justify-center text-xs font-bold text-[#1EA65C] hover:opacity-80 transition-opacity"
          >
            TK
          </button>
        </div>
      </header>

      {/* 인라인 검색 바 (검색 토글 시 노출) */}
      {isSearchActive && (
        <div className="bg-white px-5 py-2.5 border-b border-[#E9ECEF] flex items-center gap-2">
          <input
            type="text"
            placeholder="할 일 검색..."
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

      {/* 2. 상단 요약 & 필터 섹션 */}
      <div className="shrink-0 bg-white px-5 pt-3 pb-3 border-b border-[#E9ECEF] shadow-xs">
        {/* 2-1. 완료율 달성 프로그레스 카드 */}
        <div className="bg-[#E8F7EE] rounded-2xl p-4 border border-[#1EA65C]/20 mb-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[#1EA65C] px-2 py-0.5 bg-white rounded-full shadow-xs">
                목표 달성률
              </span>
              <span className="text-xs text-[#495057]">
                {totalCount}개 중 {completedCount}개 완료
              </span>
            </div>
            <span className="text-sm font-bold text-[#1EA65C]">{percentage}%</span>
          </div>
          {/* 게이지 바 */}
          <div className="w-full h-2.5 bg-white/80 rounded-full overflow-hidden p-0.5">
            <div
              className="h-full bg-[#1EA65C] rounded-full transition-all duration-300 ease-out"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </div>

        {/* 2-2. 카테고리별 진행도 카드 (8개 샘플 데이터 기반 자동 계산) */}
        <div className="bg-white rounded-xl p-3.5 border border-[#E9ECEF] shadow-xs mb-3">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-xs font-semibold text-[#495057]">카테고리별 진행도</span>
            <span className="text-[11px] text-[#868E96]">총 {categoryStats.length}개 분야</span>
          </div>
          <div className="space-y-2.5">
            {categoryStats.map((cat) => (
              <div key={cat.name}>
                <div className="flex items-center justify-between mb-1">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-[#F8F9FA] text-[#495057] border border-[#E9ECEF]">
                    {cat.name}
                  </span>
                  <span className="text-xs font-semibold text-[#212529]">
                    {cat.completed}/{cat.total}{' '}
                    <span className={`text-[11px] font-medium ${cat.percentage > 0 ? 'text-[#1EA65C]' : 'text-[#868E96]'}`}>
                      ({cat.percentage}%)
                    </span>
                  </span>
                </div>
                <div className="w-full h-1.5 bg-[#E9ECEF] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#1EA65C] rounded-full transition-all duration-300"
                    style={{ width: `${cat.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2-3. 가로 스크롤 상태 필터 칩 바 */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
          {/* 전체 */}
          <button
            type="button"
            onClick={() => setCurrentFilter('ALL')}
            className={`shrink-0 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs transition-all active:scale-95 cursor-pointer ${
              currentFilter === 'ALL'
                ? 'font-semibold bg-[#1EA65C] text-white shadow-xs'
                : 'font-medium bg-white border border-[#E9ECEF] text-[#212529] hover:bg-[#F8F9FA]'
            }`}
          >
            <span>전체</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[11px] ${
                currentFilter === 'ALL' ? 'font-bold bg-white/20 text-white' : 'font-medium bg-[#F8F9FA] text-[#495057]'
              }`}
            >
              {totalCount}
            </span>
          </button>

          {/* 진행 중 */}
          <button
            type="button"
            onClick={() => setCurrentFilter('IN_PROGRESS')}
            className={`shrink-0 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs transition-all active:scale-95 cursor-pointer ${
              currentFilter === 'IN_PROGRESS'
                ? 'font-semibold bg-[#1EA65C] text-white shadow-xs'
                : 'font-medium bg-white border border-[#E9ECEF] text-[#212529] hover:bg-[#F8F9FA]'
            }`}
          >
            <span>진행 중</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[11px] ${
                currentFilter === 'IN_PROGRESS'
                  ? 'font-bold bg-white/20 text-white'
                  : 'font-medium bg-[#F8F9FA] text-[#495057]'
              }`}
            >
              {inProgressCount}
            </span>
          </button>

          {/* 완료 */}
          <button
            type="button"
            onClick={() => setCurrentFilter('COMPLETED')}
            className={`shrink-0 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs transition-all active:scale-95 cursor-pointer ${
              currentFilter === 'COMPLETED'
                ? 'font-semibold bg-[#1EA65C] text-white shadow-xs'
                : 'font-medium bg-white border border-[#E9ECEF] text-[#212529] hover:bg-[#F8F9FA]'
            }`}
          >
            <span>완료</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[11px] ${
                currentFilter === 'COMPLETED'
                  ? 'font-bold bg-white/20 text-white'
                  : 'font-medium bg-[#F8F9FA] text-[#495057]'
              }`}
            >
              {completedCount}
            </span>
          </button>

          {/* 중요 */}
          <button
            type="button"
            onClick={() => setCurrentFilter('STARRED')}
            className={`shrink-0 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs transition-all active:scale-95 cursor-pointer ${
              currentFilter === 'STARRED'
                ? 'font-semibold bg-[#1EA65C] text-white shadow-xs'
                : 'font-medium bg-white border border-[#E9ECEF] text-[#212529] hover:bg-[#F8F9FA]'
            }`}
          >
            <svg
              className={`w-3.5 h-3.5 ${
                currentFilter === 'STARRED' ? 'fill-white text-white' : 'fill-[#FAB005] text-[#FAB005]'
              }`}
              viewBox="0 0 24 24"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
            <span>중요</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[11px] ${
                currentFilter === 'STARRED'
                  ? 'font-bold bg-white/20 text-white'
                  : 'font-medium bg-[#F8F9FA] text-[#495057]'
              }`}
            >
              {starredCount}
            </span>
          </button>
        </div>
      </div>

      {/* 3. 중앙 메인 스크롤 영역: 할 일 목록 */}
      <main className="flex-1 overflow-y-auto px-4 py-3 space-y-2.5 pb-24 no-scrollbar">
        {/* [요구사항] "오늘 할 일 · 전체 보기 >" 링크 */}
        <div className="flex items-center justify-between px-1 pt-1 pb-1">
          <Link
            to="/tasks"
            className="group inline-flex items-center gap-1 text-[13px] font-bold text-[#1EA65C] hover:text-[#178449] transition-colors"
          >
            <span>오늘 할 일 · 전체 보기</span>
            <svg
              className="w-4 h-4 stroke-[2.5] group-hover:translate-x-0.5 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </Link>
          <span className="text-[11px] font-medium text-[#868E96]">
            {filteredTasks.length}개 표시 중
          </span>
        </div>

        {/* 할 일 카드 리스트 */}
        {filteredTasks.length === 0 ? (
          <div className="h-44 flex flex-col items-center justify-center text-center p-6 bg-white rounded-2xl border border-dashed border-[#E9ECEF]">
            <div className="w-10 h-10 rounded-full bg-[#F8F9FA] flex items-center justify-center text-[#868E96] mb-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </div>
            <p className="text-sm font-medium text-[#495057]">해당하는 할 일이 없습니다</p>
            <p className="text-xs text-[#868E96] mt-0.5">우측 하단 (+) 버튼을 눌러 새 할 일을 등록해보세요</p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <TaskCard key={task.id} task={task} onToggle={toggleTask} />
          ))
        )}
      </main>

      {/* 4. 최하단 고정 플로팅 액션 버튼 (FAB +) */}
      <div className="absolute bottom-5 right-5 z-30">
        <button
          type="button"
          onClick={() => setIsBottomSheetOpen(true)}
          aria-label="새로운 태스크 추가"
          className="w-14 h-14 rounded-full bg-[#1EA65C] hover:bg-[#178449] active:scale-95 text-white flex items-center justify-center shadow-[0_4px_14px_rgba(30,166,92,0.4)] transition-all cursor-pointer"
        >
          <svg className="w-6 h-6 stroke-[2.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </button>
      </div>

      {/* 5. 태스크 등록 바텀시트 */}
      <BottomSheet
        isOpen={isBottomSheetOpen}
        onClose={() => setIsBottomSheetOpen(false)}
        onAddTask={addTask}
      />
    </div>
  );
}
