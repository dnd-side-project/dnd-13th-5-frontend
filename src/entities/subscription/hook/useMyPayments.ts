import { useQuery } from '@tanstack/react-query';

import { fetchMyPayments } from '../api/fetchMyPayments';

export const useMyPayments = () =>
  useQuery({
    queryKey: ['my-payments'],
    queryFn: () => fetchMyPayments(),
    retry: 1, // 토큰 갱신 실패 시 1번만 재시도
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
    refetchOnWindowFocus: false,
  });
