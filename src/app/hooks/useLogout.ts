import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { useAuthStore } from '@/app/store/useAuthStore';
import apiClient from '@/shared/api/apiClient';
import { ROUTES } from '@/shared/config/routes';

export const logout = async (): Promise<void> => {
  await apiClient.post(`/auth/logout`, {}, { withCredentials: true });
};

export const useLogout = () => {
  const logoutLocal = useAuthStore(state => state.logoutLocal);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      logoutLocal();
      navigate(ROUTES.LOGIN, { replace: true });
    },
    onError: error => {
      console.error('Logout failed', error);
    },
  });
};
