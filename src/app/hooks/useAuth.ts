import { useAuthStore } from '@/app/store/useAuthStore';

// store 이용해 인증 상태 확인 및 토큰 관리
export const useAuth = () => {
  const accessToken = useAuthStore(state => state.accessToken);
  const setAccessToken = useAuthStore(state => state.setAccessToken);
  const clearAccessToken = useAuthStore(state => state.clearAccessToken);

  const isAuthenticated = !!accessToken;

  return { accessToken, setAccessToken, clearAccessToken, isAuthenticated };
};
