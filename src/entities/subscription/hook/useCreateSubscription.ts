import type { UseMutationResult } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import type {
  CreateSubscriptionRequest,
  CreateSubscriptionResponse,
} from '../api/createSubscription';
import { createSubscription } from '../api/createSubscription';

/**
 * 구독 등록을 위한 React Query mutation 훅입니다.
 * 성공 시 관련 쿼리들을 무효화하여 최신 데이터를 다시 가져옵니다.
 */
export const useCreateSubscription = (): UseMutationResult<
  CreateSubscriptionResponse,
  Error,
  CreateSubscriptionRequest
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSubscription,
    onSuccess: () => {
      // 구독 등록 성공 시 관련 쿼리들을 무효화하여 최신 데이터 갱신
      queryClient.invalidateQueries({ queryKey: ['my-subscriptions'] });
      queryClient.invalidateQueries({ queryKey: ['my-payments'] });
      queryClient.invalidateQueries({ queryKey: ['my-payments-soon'] });
    },
    onError: error => {
      console.error('구독 등록 실패:', error);
    },
  });
};
