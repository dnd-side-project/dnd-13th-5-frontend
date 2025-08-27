import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import type { SubscriptionDetail } from '../api/fetchSubscriptionDetail';
import { fetchSubscriptionDetail } from '../api/fetchSubscriptionDetail';

/**
 * 구독 상세 정보를 조회하는 React Query 훅입니다.
 * @param subscriptionId - 조회할 구독 ID
 */
export const useSubscriptionDetail = (
  subscriptionId: number,
): UseQueryResult<SubscriptionDetail, Error> =>
  useQuery({
    queryKey: ['subscription-detail', subscriptionId],
    queryFn: () => fetchSubscriptionDetail(subscriptionId),
    enabled: subscriptionId > 0, // subscriptionId가 유효할 때만 쿼리 실행
    retry: 1, // 토큰 갱신 실패 시 1번만 재시도
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
    refetchOnWindowFocus: false,
  });
