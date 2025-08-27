// src/entities/subscription/hook/useUpdateSubscription.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateSubscription } from '../api/updateSubscription';

export const useUpdateSubscription = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateSubscription,
    onSuccess: (data, variables) => {
      // 구독 목록과 구독 상세 쿼리를 무효화하여 최신 데이터를 다시 가져오도록 함
      queryClient.invalidateQueries({
        queryKey: ['subscriptions'],
      });
      queryClient.invalidateQueries({
        queryKey: ['subscription', variables.subscriptionId],
      });
      queryClient.invalidateQueries({
        queryKey: ['mySubscription'],
      });
    },
    onError: error => {
      console.error('구독 정보 수정 실패:', error);
    },
  });
};
