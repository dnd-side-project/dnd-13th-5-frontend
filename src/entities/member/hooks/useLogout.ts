import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { logout } from '@/entities/member/api/logout';
import { queryClient } from '@/shared/api/queryClient';
import { ROUTES } from '@/shared/config/routes';
import { useAuthStore } from '@/shared/store/authStore';

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
      queryClient.clear();
      navigate(ROUTES.HOME, { replace: true });
    },
  });
};
