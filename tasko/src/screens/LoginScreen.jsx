import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

/**
 * Tasko 모바일 로그인 화면
 * - 앱 첫 화면으로 사용됩니다.
 * - 버튼 클릭 시 대시보드(/dashboard)로 이동합니다.
 */
export default function LoginScreen() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('demo@tasko.app');
  const [password, setPassword] = useState('••••••••');

  const handleSubmit = (e) => {
    e.preventDefault();
    // 목업 로그인: 대시보드로 이동
    navigate('/dashboard');
  };

  return (
    <div className="w-full h-full bg-[#F8F9FA] flex flex-col justify-between select-none">
      {/* 상단 헤더: 앱 상태 및 연결 상태 */}
      <header className="w-full pt-4 px-6 flex justify-between items-center z-10 shrink-0">
        <div className="text-xs font-semibold text-[#868E96] tracking-tight">Tasko Mobile</div>
        <div className="flex items-center space-x-1.5 text-xs text-[#868E96]">
          <span className="inline-block w-2 h-2 rounded-full bg-[#1EA65C]"></span>
          <span>Online</span>
        </div>
      </header>

      {/* 중앙 메인 컨텐츠: 브랜드 로고 및 로그인 폼 */}
      <section className="flex-1 px-6 flex flex-col justify-center -mt-6">
        {/* 브랜드 아이콘 & 로고 & 안내 문구 */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="flex items-center space-x-2.5 mb-3">
            <div className="w-10 h-10 rounded-xl bg-[#1EA65C] flex items-center justify-center shadow-md shadow-[#1EA65C]/20">
              <svg className="w-5 h-5 text-white stroke-[2.8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <span className="text-3xl font-extrabold text-[#212529] tracking-tight">tasko 할일관리</span>
          </div>
          <p className="text-sm font-medium text-[#495057]">
            오늘 할 일을 이어서 관리해 보세요
          </p>
        </div>

        {/* 로그인 폼 */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 이메일 입력창 */}
          <div className="space-y-1.5">
            <label htmlFor="loginEmail" className="block text-xs font-semibold text-[#495057]">
              이메일
            </label>
            <input
              type="email"
              id="loginEmail"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@tasko.app"
              className="w-full h-12 px-4 bg-white border border-[#E9ECEF] rounded-xl text-sm text-[#212529] font-normal placeholder-[#868E96] focus:outline-none focus:border-[#1EA65C] focus:ring-2 focus:ring-[#1EA65C]/15 transition-all"
            />
          </div>

          {/* 비밀번호 입력창 */}
          <div className="space-y-1.5">
            <label htmlFor="loginPassword" className="block text-xs font-semibold text-[#495057]">
              비밀번호
            </label>
            <input
              type="password"
              id="loginPassword"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
              className="w-full h-12 px-4 bg-white border border-[#E9ECEF] rounded-xl text-sm text-[#212529] font-normal placeholder-[#868E96] focus:outline-none focus:border-[#1EA65C] focus:ring-2 focus:ring-[#1EA65C]/15 transition-all"
            />
          </div>

          {/* 로그인 버튼: 에메랄드 그린 풀사이즈 버튼 */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full h-12 bg-[#1EA65C] hover:bg-[#178449] active:scale-[0.98] text-white text-base font-semibold rounded-xl shadow-md shadow-[#1EA65C]/25 transition-all duration-150 flex items-center justify-center cursor-pointer"
            >
              로그인
            </button>
          </div>
        </form>
      </section>

      {/* 하단 회원가입 전환 링크 */}
      <footer className="w-full pb-8 px-6 text-center shrink-0">
        <div className="text-sm text-[#495057]">
          계정이 없으신가요?{' '}
          <Link to="/signup" className="font-bold text-[#1EA65C] hover:underline ml-1">
            회원가입
          </Link>
        </div>
      </footer>
    </div>
  );
}
