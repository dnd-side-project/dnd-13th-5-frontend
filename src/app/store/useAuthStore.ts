import type { AxiosResponseHeaders } from 'axios';
import { create } from 'zustand';

import apiClient from '@/shared/api/apiClient';
import {
  clearAccessToken,
  extractAccessFromHeaders,
  setAccessToken,
} from '@/shared/api/tokenManager';

interface AuthState {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  clearAccessToken: () => void;
  bootstrap: () => Promise<void>; // 앱 시작 시 토큰 초기화
  ready: boolean; // 초기화 완료 여부
  logoutLocal: () => void;
}

export const useAuthStore = create<AuthState>(set => ({
  accessToken: null,
  setAccessToken: token => {
    setAccessToken(token); // tokenManager에도 반영
    set({ accessToken: token });
  },
  clearAccessToken: () => {
    clearAccessToken();
    set({ accessToken: null });
  },

  bootstrap: async () => {
    try {
      const res = await apiClient.get('/auth/reissue', {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
      });

      const token = extractAccessFromHeaders(res.headers as AxiosResponseHeaders);
      if (token) {
        set({ accessToken: token });
        setAccessToken(token);
      } else {
        set({ accessToken: null });
        clearAccessToken();
      }
    } catch (error) {
      console.error('Auth bootstrap error:', error);
      set({ accessToken: null });
    } finally {
      set({ ready: true });
    }
  },
  logoutLocal: () => {
    clearAccessToken();
    set({ accessToken: null });
  },
  ready: true,
}));
