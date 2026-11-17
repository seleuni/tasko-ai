import React, { createContext, useContext, useEffect, useState } from 'react';

// 화면 모드: 'system'(기기 설정 따라가기), 'light', 'dark'
const STORAGE_KEY = 'tasko-theme';
const ThemeContext = createContext(null);

// 저장해 둔 모드를 읽습니다. 저장소를 못 쓰면 system으로 처리합니다.
function readSavedMode() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') {
      return saved;
    }
  } catch (err) {
    // 저장소를 쓸 수 없는 환경이면 무시합니다.
  }
  return 'system';
}

// 기기가 다크 모드를 쓰는지 확인합니다.
function systemPrefersDark() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

// <html>에 dark 클래스를 붙이거나 뺍니다.
function applyTheme(mode) {
  let useDark = mode === 'dark';
  if (mode === 'system') {
    useDark = systemPrefersDark();
  }
  document.documentElement.classList.toggle('dark', useDark);
}

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState(readSavedMode);

  useEffect(function syncTheme() {
    applyTheme(mode);

    // 시스템 따라가기 상태에서는 기기 설정이 바뀔 때도 반영합니다.
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    function handleSystemChange() {
      if (mode === 'system') {
        applyTheme('system');
      }
    }
    media.addEventListener('change', handleSystemChange);
    return function cleanup() {
      media.removeEventListener('change', handleSystemChange);
    };
  }, [mode]);

  // 모드를 바꾸고 저장합니다.
  function changeMode(nextMode) {
    setMode(nextMode);
    try {
      if (nextMode === 'system') {
        localStorage.removeItem(STORAGE_KEY);
      } else {
        localStorage.setItem(STORAGE_KEY, nextMode);
      }
    } catch (err) {
      // 저장에 실패해도 현재 화면은 바뀝니다.
    }
  }

  return (
    <ThemeContext.Provider value={{ mode, changeMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme은 ThemeProvider 안에서만 사용할 수 있습니다.');
  }
  return ctx;
}
