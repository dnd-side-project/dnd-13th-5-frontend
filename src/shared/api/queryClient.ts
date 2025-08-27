// /shared/lib/queryClient.ts

import { QueryCache, QueryClient } from '@tanstack/react-query';

import { normalizeAxiosError } from '@/shared/api/error';
// import { toast } from 'your-toast-library';

export const queryClient = new QueryClient({
  // ✅ QueryCache를 통해 전역 onError 핸들러 설정
  queryCache: new QueryCache({
    onError: error => {
      const normalizedError = normalizeAxiosError(error);
      // eslint-disable-next-line no-console
      console.error('React Query Global Error:', normalizedError);
      // toast.error(normalizedError.message);
    },
  }),
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
      gcTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
      retry: (failureCount, error: unknown) => {
        const axiosError = error as { response?: { status?: number } };
        if (
          axiosError.response?.status &&
          axiosError.response.status >= 400 &&
          axiosError.response.status < 500
        ) {
          return false;
        }
        return failureCount < 2;
      },
    },
    mutations: {
      retry: false,
      // ✅ Mutation의 onError는 여기서 개별적으로 설정 가능 (또는 MutationCache 사용)
      onError: error => {
        const normalizedError = normalizeAxiosError(error);
        // eslint-disable-next-line no-console
        console.error('React Query Mutation Error:', normalizedError);
        // toast.error(normalizedError.message);
      },
    },
  },
});
