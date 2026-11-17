import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { TaskProvider } from './context/TaskContext.jsx';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import DeviceFrame from './components/DeviceFrame.jsx';
import LoginScreen from './screens/LoginScreen.jsx';
import SignupScreen from './screens/SignupScreen.jsx';
import DashboardScreen from './screens/DashboardScreen.jsx';
import AllTasksScreen from './screens/AllTasksScreen.jsx';
import TaskDetailScreen from './screens/TaskDetailScreen.jsx';

// 로그인한 사람만 통과시키는 보호막. 아니면 로그인 화면으로 보냅니다.
function RequireAuth({ children }) {
  const { session, loading } = useAuth();
  if (loading) {
    return null;
  }
  if (!session) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

// 이미 로그인한 사람은 로그인/회원가입 대신 대시보드로 보냅니다.
function PublicOnly({ children }) {
  const { session, loading } = useAuth();
  if (loading) {
    return null;
  }
  if (session) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
}

/**
 * Tasko 메인 애플리케이션 컴포넌트
 * - React Router 7을 이용한 화면 이동 라우팅
 * - 첫 화면은 로그인(/login) 화면으로 설정
 * - 5개 지정 화면 라우트 구성:
 *   1. 로그인 (/login)
 *   2. 회원가입 (/signup)
 *   3. 대시보드 (/dashboard)
 *   4. 전체 할 일 목록 (/tasks)
 *   5. 할 일 상세/수정 (/tasks/:id)
 */
export default function App() {
  return (
    <ThemeProvider>
    <AuthProvider>
      <TaskProvider>
        <BrowserRouter>
          <DeviceFrame>
            <Routes>
              {/* 앱 첫 화면은 로그인 화면입니다 */}
              <Route path="/" element={<PublicOnly><LoginScreen /></PublicOnly>} />
              <Route path="/login" element={<PublicOnly><LoginScreen /></PublicOnly>} />
              <Route path="/signup" element={<PublicOnly><SignupScreen /></PublicOnly>} />
              {/* 아래 화면은 로그인한 사람만 볼 수 있습니다 */}
              <Route path="/dashboard" element={<RequireAuth><DashboardScreen /></RequireAuth>} />
              <Route path="/tasks" element={<RequireAuth><AllTasksScreen /></RequireAuth>} />
              <Route path="/tasks/:id" element={<RequireAuth><TaskDetailScreen /></RequireAuth>} />
              {/* 알 수 없는 경로는 로그인으로 리디렉트 */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </DeviceFrame>
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
    </ThemeProvider>
  );
}
