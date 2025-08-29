import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '@/app/hooks/useAuth';
import { ROUTES } from '@/shared/config/routes';

const PublicRouter = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Navigate to={ROUTES.SUBSCRIPTIONS} replace /> : <Outlet />;
};

export default PublicRouter;
