import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '@/app/hooks/useAuth';
import { useAuthBootstrap } from '@/app/hooks/useAuthBootstrap';

const PrivateRouter = () => {
  const isReady = useAuthBootstrap();
  const { isAuthenticated } = useAuth();

  if (!isReady) {
    return <div>Loading...</div>; // 준비 중일 때 로딩 표시
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRouter;
