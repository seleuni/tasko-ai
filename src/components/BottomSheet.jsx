import React, { useState } from 'react';

/**
 * 할 일 추가 바텀시트 모달 컴포넌트
 * 슬라이드업 애니메이션, 입력 폼(제목, 우선순위, 카테고리, 마감일) 포함
 */
export default function BottomSheet({ isOpen, onClose, onAddTask }) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('medium');
  const [tag, setTag] = useState('#생활');
  const [dueDate, setDueDate] = useState('오늘 마감');
  const [starred, setStarred] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddTask({
      title: title.trim(),
      priority,
      tag,
      dueDate: dueDate.trim() || '오늘',
      starred,
    });

    // 폼 초기화 후 닫기
    setTitle('');
    setPriority('medium');
    setTag('#생활');
    setDueDate('오늘 마감');
    setStarred(false);
    onClose();
  };

  return (
    <div className="absolute inset-0 z-40 flex flex-col justify-end">
      {/* 반투명 딤드 배경 (터치 시 닫힘) */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px] transition-opacity duration-200"
      ></div>

      {/* 바텀시트 본문 패널 */}
      <div className="relative z-10 bg-white rounded-t-[28px] p-5 pb-8 shadow-[0_-8px_30px_rgba(0,0,0,0.15)] flex flex-col border-t border-[#E9ECEF] max-h-[90%] overflow-y-auto no-scrollbar animate-in slide-in-from-bottom duration-300">
        {/* 상단 드래그 핸들 바 */}
        <div
          onClick={onClose}
          className="w-12 h-1.5 bg-[#E9ECEF] rounded-full mx-auto mb-3 cursor-pointer hover:bg-gray-300 transition-colors"
        ></div>

        {/* 시트 헤더 */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[17px] font-bold text-[#212529] tracking-tight">새로운 할 일 등록</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="닫기"
            className="w-8 h-8 rounded-full hover:bg-[#F8F9FA] text-[#868E96] hover:text-[#212529] flex items-center justify-center transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* 바텀시트 입력 폼 */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 1. 할 일 제목 */}
          <div>
            <label htmlFor="modalTaskTitle" className="block text-xs font-semibold text-[#495057] mb-1.5">
              할 일 제목 <span className="text-[#FA5252]">*</span>
            </label>
            <input
              type="text"
              id="modalTaskTitle"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="무엇을 완료해야 하나요?"
              autoFocus
              className="w-full h-11 px-3.5 rounded-xl bg-[#F8F9FA] border border-[#E9ECEF] text-sm text-[#212529] placeholder:text-[#868E96] focus:outline-none focus:border-[#1EA65C] focus:ring-1 focus:ring-[#1EA65C] transition-all"
            />
          </div>

          {/* 2. 우선순위 선택 버튼 그룹 */}
          <div>
            <label className="block text-xs font-semibold text-[#495057] mb-1.5">우선순위</label>
            <div className="grid grid-cols-3 gap-2">
              {/* 높음 */}
              <button
                type="button"
                onClick={() => setPriority('high')}
                className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl border text-xs font-semibold transition-all ${
                  priority === 'high'
                    ? 'border-[#FFA8A8] bg-[#FFF5F5] text-[#FA5252] shadow-xs'
                    : 'border-[#E9ECEF] bg-white text-[#495057] hover:bg-[#F8F9FA]'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#FA5252]"></span>
                <span>높음</span>
              </button>

              {/* 중간 */}
              <button
                type="button"
                onClick={() => setPriority('medium')}
                className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl border text-xs font-semibold transition-all ${
                  priority === 'medium'
                    ? 'border-[#212529] bg-[#F8F9FA] text-[#212529] shadow-xs'
                    : 'border-[#E9ECEF] bg-white text-[#495057] hover:bg-[#F8F9FA]'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#495057]"></span>
                <span>중간</span>
              </button>

              {/* 낮음 */}
              <button
                type="button"
                onClick={() => setPriority('low')}
                className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl border text-xs font-semibold transition-all ${
                  priority === 'low'
                    ? 'border-[#1EA65C]/40 bg-[#E8F7EE] text-[#1EA65C] shadow-xs'
                    : 'border-[#E9ECEF] bg-white text-[#495057] hover:bg-[#F8F9FA]'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#1EA65C]"></span>
                <span>낮음</span>
              </button>
            </div>
          </div>

          {/* 3. 카테고리 태그 & 마감일 */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="modalCategorySelect" className="block text-xs font-semibold text-[#495057] mb-1.5">
                카테고리
              </label>
              <div className="relative">
                <select
                  id="modalCategorySelect"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  className="w-full h-11 px-3 pr-8 rounded-xl bg-[#F8F9FA] border border-[#E9ECEF] text-xs font-medium text-[#212529] appearance-none focus:outline-none focus:border-[#1EA65C] cursor-pointer"
                >
                  <option value="#생활">#생활</option>
                  <option value="#건강">#건강</option>
                  <option value="#공부">#공부</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2.5 pointer-events-none text-[#868E96]">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="modalDueDateInput" className="block text-xs font-semibold text-[#495057] mb-1.5">
                마감일
              </label>
              <input
                type="text"
                id="modalDueDateInput"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                placeholder="오늘 19:00, 내일 등"
                className="w-full h-11 px-3 rounded-xl bg-[#F8F9FA] border border-[#E9ECEF] text-xs font-medium text-[#212529] focus:outline-none focus:border-[#1EA65C]"
              />
            </div>
          </div>

          {/* 4. 중요 표시 토글 */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-[#F8F9FA] border border-[#E9ECEF]">
            <div className="flex items-center gap-2">
              <svg className={`w-4 h-4 ${starred ? 'text-[#FAB005] fill-[#FAB005]' : 'text-[#868E96]'}`} viewBox="0 0 24 24">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
              <span className="text-xs font-semibold text-[#212529]">중요 할 일로 표시</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer select-none">
              <input
                type="checkbox"
                checked={starred}
                onChange={(e) => setStarred(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-10 h-5 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#1EA65C]"></div>
            </label>
          </div>

          {/* 하단: 에메랄드 그린 와이드 '할 일 추가하기' 버튼 */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full h-12 rounded-xl bg-[#1EA65C] hover:bg-[#178449] active:scale-[0.99] text-white font-bold text-sm shadow-[0_4px_14px_rgba(30,166,92,0.3)] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <svg className="w-4 h-4 stroke-[2.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              <span>할 일 추가하기</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
