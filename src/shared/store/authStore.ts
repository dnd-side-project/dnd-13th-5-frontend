import type { AxiosResponseHeaders } from 'axios';
import { create } from 'zustand';

import apiClient from '@/shared/api/apiClient';
import { extractAccessFromHeaders, setAccessToken } from '@/shared/api/tokenManager';

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  checkAuth: () => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>(set => ({
  isAuthenticated: false,
  isLoading: true, // 앱 최초 로딩 시에는 항상 로딩 상태

  /** 앱 부팅 시 실행될 인증 체크 로직 */
  checkAuth: async () => {
    try {
      const res = await apiClient.get('/auth/reissue', {
        withCredentials: true,
        // 이 요청은 인터셉터에서 토큰을 자동으로 주입하면 안 되므로 skipAuth 플래그 추가
        // (authInterceptors.ts의 requestInterceptor가 이 플래그를 인식하도록 설정 필요)
        // @ts-expect-error - 사용자 정의 속성 추가
        skipAuth: true,
      });

      const newAccessToken = extractAccessFromHeaders(res.headers as AxiosResponseHeaders);
      if (newAccessToken) {
        setAccessToken(newAccessToken);
        set({ isAuthenticated: true });
      } else {
        throw new Error('No access token received');
      }
    } catch (error) {
      set({ isAuthenticated: false });
      setAccessToken(null);
    } finally {
      set({ isLoading: false });
    }
  },

  /** 로그아웃 처리 */
  logout: () => {
    setAccessToken(null);
    set({ isAuthenticated: false });
  },
}));
