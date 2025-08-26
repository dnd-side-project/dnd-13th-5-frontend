import { useQuery } from '@tanstack/react-query';

import { fetchMyPaymentsSoon } from '../api/fetchMyPaymentsSoon';

export const useMyPaymentsSoon = () =>
  useQuery({
    queryKey: ['my-payments-soon'],
    queryFn: () => fetchMyPaymentsSoon(),
    retry: 1, // 토큰 갱신 실패 시 1번만 재시도
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
    refetchOnWindowFocus: false,
  });
