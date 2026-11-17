import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../context/ThemeContext.jsx';

/**
 * 화면 모드 전환 버튼
 * - 누를 때마다 시스템 → 라이트 → 다크 순서로 바뀝니다.
 */
export default function ThemeToggle() {
  const { mode, changeMode } = useTheme();

  // 다음 모드를 정합니다.
  function handleClick() {
    if (mode === 'system') {
      changeMode('light');
    } else if (mode === 'light') {
      changeMode('dark');
    } else {
      changeMode('system');
    }
  }

  // 현재 모드에 맞는 아이콘과 안내 문구를 고릅니다.
  let icon = <Monitor className="w-5 h-5" />;
  let label = '화면 모드: 시스템 설정 따라가기';
  if (mode === 'light') {
    icon = <Sun className="w-5 h-5" />;
    label = '화면 모드: 라이트';
  }
  if (mode === 'dark') {
    icon = <Moon className="w-5 h-5" />;
    label = '화면 모드: 다크';
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={label}
      title={label}
      className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#F8F9FA] dark:hover:bg-[#2C3036] text-[#495057] dark:text-[#ADB5BD] active:scale-95 transition-all"
    >
      {icon}
    </button>
  );
}
