import React from 'react';
import { useNavigate } from 'react-router-dom';
import PriorityBadge from './PriorityBadge.jsx';

/**
 * 할 일 카드 컴포넌트
 * - 좌측 체크박스 터치: 완료/미완료 토글
 * - 본문 터치: 할 일 상세/수정 화면(/tasks/:id)으로 이동
 * - 완료 상태 시: 모든 화면에서 제목에 취소선 및 연한 회색(#868E96) 처리
 */
export default function TaskCard({ task, onToggle }) {
  const navigate = useNavigate();
  const isDone = task.completed;

  const handleCardClick = () => {
    navigate(`/tasks/${task.id}`);
  };

  const handleCheckboxClick = (e) => {
    e.stopPropagation();
    onToggle(task.id);
  };

  const handleMoreClick = (e) => {
    e.stopPropagation();
    navigate(`/tasks/${task.id}`);
  };

  // 마감 기한 지남 여부 판별
  const isOverdue = task.isOverdue || (task.dueDate && task.dueDate.includes('기한 지남'));

  return (
    <article
      onClick={handleCardClick}
      className={`relative flex items-center gap-3 p-3.5 bg-white rounded-2xl border transition-all duration-200 cursor-pointer shadow-[0_1px_3px_rgba(0,0,0,0.04)] ${
        isDone
          ? 'border-[#E9ECEF]/60 bg-white/80 opacity-90'
          : 'border-[#E9ECEF] hover:border-[#1EA65C]/50'
      }`}
    >
      {/* 1. 좌측 원형 체크박스 (터치 영역 확보) */}
      <button
        type="button"
        onClick={handleCheckboxClick}
        aria-label={isDone ? '미완료로 변경' : '완료 처리'}
        className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center transition-all ${
          isDone
            ? 'bg-[#1EA65C] text-white shadow-xs'
            : 'border-2 border-[#868E96]/50 hover:border-[#1EA65C]'
        }`}
      >
        {isDone ? (
          <svg className="w-4 h-4 stroke-[2.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        ) : (
          <div className="w-2 h-2 rounded-full bg-transparent"></div>
        )}
      </button>

      {/* 2. 중앙 컨텐츠 영역 */}
      <div className="flex-1 min-w-0">
        {/* 뱃지 라인: 우선순위 + 카테고리 태그 + 중요 별표 */}
        <div className="flex items-center gap-1.5 mb-1 flex-wrap">
          <PriorityBadge priority={task.priority} />
          
          <span className="text-[11px] font-medium text-[#495057] px-1.5 py-0.5 bg-[#F8F9FA] border border-[#E9ECEF] rounded">
            {task.tag}
          </span>

          {task.starred && (
            <svg
              className="w-3.5 h-3.5 text-[#FAB005] fill-[#FAB005] shrink-0"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
          )}
        </div>

        {/* 할 일 제목 (완료 시 취소선 및 연한 회색 적용) */}
        <h3
          className={`text-[14px] font-semibold tracking-tight truncate transition-colors ${
            isDone ? 'line-through text-[#868E96]' : 'text-[#212529]'
          }`}
        >
          {task.title}
        </h3>

        {/* 마감일 정보 */}
        <div
          className={`flex items-center gap-1 mt-1 text-[11px] font-medium ${
            isDone
              ? 'text-[#868E96]'
              : isOverdue
              ? 'text-[#FA5252]'
              : 'text-[#495057]'
          }`}
        >
          <svg
            className={`w-3.5 h-3.5 ${
              isDone
                ? 'stroke-[#868E96]'
                : isOverdue
                ? 'stroke-[#FA5252]'
                : 'stroke-[#868E96]'
            }`}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          <span>{task.dueDate}</span>
        </div>
      </div>

      {/* 3. 우측 더보기 / 상세 이동 버튼 */}
      <button
        type="button"
        onClick={handleMoreClick}
        aria-label="상세 보기"
        className="w-8 h-8 shrink-0 flex items-center justify-center rounded-lg text-[#868E96] hover:text-[#212529] hover:bg-[#F8F9FA] transition-colors"
      >
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <circle cx="12" cy="5" r="2"></circle>
          <circle cx="12" cy="12" r="2"></circle>
          <circle cx="12" cy="19" r="2"></circle>
        </svg>
      </button>
    </article>
  );
}
