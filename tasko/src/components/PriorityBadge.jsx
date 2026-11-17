import React from 'react';

/**
 * 우선순위 뱃지 컴포넌트
 * 높음(빨강/Destructive), 중간(중립 회색), 낮음(브랜드 연두/초록)
 */
export default function PriorityBadge({ priority }) {
  if (priority === 'high' || priority === '높음') {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-[#FA5252]/10 dark:bg-[#FF6B6B]/10 text-[#FA5252] dark:text-[#FF6B6B] border border-[#FA5252]/20 dark:border-[#FF6B6B]/20">
        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
          <line x1="4" y1="22" x2="4" y2="15"></line>
        </svg>
        <span>높음</span>
      </span>
    );
  }

  if (priority === 'medium' || priority === '중간') {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-[#F8F9FA] dark:bg-[#121417] text-[#495057] dark:text-[#ADB5BD] border border-[#E9ECEF] dark:border-[#2C3036]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#495057] dark:bg-[#ADB5BD]"></span>
        <span>중간</span>
      </span>
    );
  }

  // 낮음 (low)
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-[#E8F7EE] dark:bg-[#1B3A2A] text-[#1EA65C] border border-[#1EA65C]/20">
      <span className="w-1.5 h-1.5 rounded-full bg-[#1EA65C]"></span>
      <span>낮음</span>
    </span>
  );
}
