import type { UseMutationResult } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { SubscriptionDetail } from '../api/fetchSubscriptionDetail';
import type { ToggleFavoriteResponse } from '../api/toggleFavorite';
import { toggleFavorite } from '../api/toggleFavorite';

/**
 * 구독 서비스의 즐겨찾기 상태를 토글하는 React Query mutation 훅입니다.
 * 낙관적 업데이트를 통해 즉시 UI가 반영되며, 실패 시 이전 상태로 롤백됩니다.
 */
export const useToggleFavorite = (): UseMutationResult<
  ToggleFavoriteResponse,
  Error,
  number,
  { previousDetailData?: SubscriptionDetail }
> => {
  const queryClient = useQueryClient();

  return useMutation<
    ToggleFavoriteResponse,
    Error,
    number,
    { previousDetailData?: SubscriptionDetail }
  >({
    mutationFn: toggleFavorite,
    onMutate: async (subscriptionId: number) => {
      // 진행 중인 쿼리들을 취소하여 낙관적 업데이트가 덮어씌워지지 않도록 함
      await queryClient.cancelQueries({ queryKey: ['subscription-detail', subscriptionId] });
      await queryClient.cancelQueries({ queryKey: ['my-subscriptions'] });

      // 이전 데이터를 백업 (롤백용)
      const previousDetailData = queryClient.getQueryData<SubscriptionDetail>([
        'subscription-detail',
        subscriptionId,
      ]);

      // 낙관적 업데이트: 즐겨찾기 상태를 즉시 토글
      if (previousDetailData) {
        queryClient.setQueryData<SubscriptionDetail>(['subscription-detail', subscriptionId], {
          ...previousDetailData,
          isFavorite: !previousDetailData.isFavorite,
        });
      }

      // 롤백을 위해 이전 데이터 반환
      return { previousDetailData };
    },
    onError: (error, subscriptionId, context) => {
      // 에러 발생 시 이전 상태로 롤백
      if (context?.previousDetailData) {
        queryClient.setQueryData(
          ['subscription-detail', subscriptionId],
          context.previousDetailData,
        );
      }
      console.error('즐겨찾기 상태 변경 실패:', error);
    },
    onSettled: (data, error, subscriptionId) => {
      // 성공/실패 여부와 상관없이 최종적으로 서버 데이터로 동기화
      queryClient.invalidateQueries({ queryKey: ['subscription-detail', subscriptionId] });
      queryClient.invalidateQueries({ queryKey: ['my-subscriptions'] });
    },
  });
};
