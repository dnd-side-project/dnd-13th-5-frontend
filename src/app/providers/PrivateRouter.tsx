import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '@/app/hooks/useAuth';
import { useAuthStore } from '@/app/store/useAuthStore';
import { ROUTES } from '@/shared/config/routes';

const PrivateRouter = () => {
  const ready = useAuthStore(state => state.ready);
  const bootstrap = useAuthStore(state => state.bootstrap);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    bootstrap();
  }, [bootstrap]);

  if (!ready) {
    return <div>Loading...</div>; // 준비 중일 때 로딩 표시
  }

  return isAuthenticated ? <Outlet /> : <Navigate to={ROUTES.LOGIN} replace />;
};

export default PrivateRouter;
