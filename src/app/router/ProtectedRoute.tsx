import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { ROUTES } from '@/shared/config/routes';
import { useAuthStore } from '@/shared/store/authStore';

interface ProtectedRouteProps {
  children: ReactNode;
  requireAuth?: boolean; // true: 로그인 필요, false: 비로그인만 접근
}

export const ProtectedRoute = ({ children, requireAuth = true }: ProtectedRouteProps) => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const isLoading = useAuthStore(state => state.isLoading);

  // 최초 인증 상태 확인 중에는 아무것도 렌더링하지 않거나 로딩 스피너를 보여줌
  if (isLoading) {
    return null; // App.tsx에서 전역 로딩을 처리하므로 여기선 null 반환
  }

  // 로그인이 필요한 페이지인데, 로그인하지 않은 경우
  if (requireAuth && !isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  // 비로그인 전용 페이지(로그인, 회원가입)인데, 로그인한 경우
  if (!requireAuth && isAuthenticated) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  // 그 외의 경우는 페이지를 정상적으로 보여줌
  return <>{children}</>;
};
