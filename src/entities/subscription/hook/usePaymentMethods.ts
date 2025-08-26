import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import type { PaymentMethodsByType } from '../api/fetchPaymentMethods';
import { fetchPaymentMethods } from '../api/fetchPaymentMethods';

/**
 * 사용자의 결제수단 목록을 조회하는 React Query 훅입니다.
 * 카드, 계좌, 간편결제로 분류된 결제수단 정보를 반환합니다.
 */
export const usePaymentMethods = (): UseQueryResult<PaymentMethodsByType, Error> =>
  useQuery({
    queryKey: ['payment-methods'],
    queryFn: fetchPaymentMethods,
    retry: 1, // 토큰 갱신 실패 시 1번만 재시도
    staleTime: 10 * 60 * 1000, // 10분간 캐시 유지 (결제수단은 자주 변경되지 않음)
    refetchOnWindowFocus: false,
  });
