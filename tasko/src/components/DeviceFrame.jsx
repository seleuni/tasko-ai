import React from 'react';

/**
 * iPhone 16 디바이스 프레임 공통 래퍼
 * Stitch 및 Figma 프로토타입 규격(393px × 852px)과 다이내믹 아일랜드, 홈 인디케이터를 포함합니다.
 */
export default function DeviceFrame({ children, hideStatusBar = false }) {
  return (
    <div className="min-h-screen bg-[#1A1E29] flex items-center justify-center p-0 md:p-6 select-none font-sans">
      <div
        className="w-full max-w-[393px] h-[852px] min-h-[852px] bg-[#F8F9FA] rounded-none md:rounded-[48px] relative overflow-hidden flex flex-col shadow-2xl md:border-[8px] border-[#2C3240]"
        data-purpose="iphone-16-mockup"
      >
        {/* iOS 상단 상태 표시줄 및 다이내믹 아일랜드 */}
        {!hideStatusBar && (
          <header className="w-full pt-3 px-7 flex justify-between items-center z-30 shrink-0 select-none bg-inherit">
            <span className="text-[14px] font-semibold tracking-tight text-[#212529]">9:41</span>
            
            {/* 다이내믹 아일랜드 캡슐 */}
            <div className="w-[100px] h-[26px] bg-black rounded-full flex items-center justify-between px-2.5 pointer-events-none">
              <div className="w-2.5 h-2.5 rounded-full bg-[#111] border border-neutral-800"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#0a0a14] border border-[#1a1a2e] flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-[#1e293b]"></div>
              </div>
            </div>

            {/* 통신, Wi-Fi, 배터리 아이콘 */}
            <div className="flex items-center space-x-1.5 text-[#212529]">
              {/* 셀룰러 신호 아이콘 */}
              <svg className="w-4 h-3 fill-current" viewBox="0 0 18 12">
                <rect height="4" rx="0.5" width="3" x="0" y="8" />
                <rect height="7" rx="0.5" width="3" x="5" y="5" />
                <rect height="10" rx="0.5" width="3" x="10" y="2" />
                <rect height="12" rx="0.5" width="3" x="15" y="0" />
              </svg>
              {/* 와이파이 아이콘 */}
              <svg className="w-3.5 h-3 fill-current" viewBox="0 0 16 12">
                <path d="M8 2.5C10.7 2.5 13.1 3.6 14.8 5.4L16 4.1C13.9 1.9 11.1 0.5 8 0.5C4.9 0.5 2.1 1.9 0 4.1L1.2 5.4C2.9 3.6 5.3 2.5 8 2.5ZM8 6.5C9.7 6.5 11.2 7.2 12.3 8.3L13.5 7.1C12.1 5.7 10.1 4.8 8 4.8C5.9 4.8 3.9 5.7 2.5 7.1L3.7 8.3C4.8 7.2 6.3 6.5 8 6.5ZM8 10C8.8 10 9.5 10.7 9.5 11.5C9.5 12.3 8.8 13 8 13C7.2 13 6.5 12.3 6.5 11.5C6.5 10.7 7.2 10 8 10Z" />
              </svg>
              {/* 배터리 아이콘 */}
              <svg className="w-6 h-3 fill-current" viewBox="0 0 24 12">
                <rect fill="none" height="11" rx="3.5" stroke="currentColor" strokeWidth="1" width="20" x="0.5" y="0.5" />
                <rect fill="currentColor" height="8" rx="2" width="14" x="2" y="2" />
                <path d="M22 4C22.6 4.5 23 5.2 23 6C23 6.8 22.6 7.5 22 8V4Z" fill="currentColor" />
              </svg>
            </div>
          </header>
        )}

        {/* 메인 화면 컨텐츠 영역 */}
        <div className="flex-1 flex flex-col min-h-0 relative overflow-hidden">
          {children}
        </div>

        {/* iOS 하단 홈 인디케이터 바 */}
        <footer className="w-full pb-2 pt-1 flex justify-center shrink-0 z-30 select-none bg-inherit">
          <div className="w-36 h-1 bg-[#212529] opacity-30 rounded-full"></div>
        </footer>
      </div>
    </div>
  );
}
