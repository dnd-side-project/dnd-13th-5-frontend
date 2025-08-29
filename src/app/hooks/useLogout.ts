import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import apiClient from '@/shared/api/apiClient';
import { ROUTES } from '@/shared/config/routes';
import { useAuthStore } from '@/shared/store/authStore';

export const logout = async (): Promise<void> => {
  await apiClient.post(`/auth/logout`, {}, { withCredentials: true });
};

export const useLogout = () => {
  const logoutLocal = useAuthStore(state => state.logout);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      logoutLocal();
      navigate(ROUTES.HOME, { replace: true });
    },
    onError: () => {
      // 로그아웃 실패 시에도 로컬 상태는 정리
      logoutLocal();
      navigate(ROUTES.HOME, { replace: true });
    },
  });
};
