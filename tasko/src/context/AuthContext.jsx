import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase.js';

// 로그인 상태(세션)를 앱 전체에서 같이 쓰기 위한 컨텍스트입니다.
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(function watchSession() {
    let active = true;

    // 새로고침 직후 저장된 세션이 있는지 확인합니다.
    supabase.auth.getSession().then(function handleSession(result) {
      if (active) {
        setSession(result.data.session);
        setLoading(false);
      }
    });

    // 로그인·로그아웃이 일어날 때마다 세션을 갱신합니다.
    const listener = supabase.auth.onAuthStateChange(function handleChange(event, nextSession) {
      setSession(nextSession);
    });

    return function cleanup() {
      active = false;
      listener.data.subscription.unsubscribe();
    };
  }, []);

  // 로그아웃
  function signOut() {
    return supabase.auth.signOut();
  }

  return (
    <AuthContext.Provider value={{ session, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth는 AuthProvider 안에서만 사용할 수 있습니다.');
  }
  return ctx;
}
