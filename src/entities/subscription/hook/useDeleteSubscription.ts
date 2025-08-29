import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteSubscription } from '../api/deleteSubscription';

export const useDeleteSubscription = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteSubscription,
    onSuccess: (data, subscriptionId) => {
      // 구독 목록과 관련된 모든 쿼리를 무효화하여 최신 데이터를 다시 가져오도록 함
      queryClient.invalidateQueries({
        queryKey: ['my-subscriptions'],
      });
      queryClient.invalidateQueries({
        queryKey: ['my-payments'],
      });
      queryClient.invalidateQueries({
        queryKey: ['my-payments-soon'],
      });

      // 삭제된 구독의 상세 정보 쿼리도 제거
      queryClient.removeQueries({
        queryKey: ['subscription-detail', subscriptionId],
      });
    },
    onError: error => {
      console.error('구독 삭제 실패:', error);
    },
  });
};
