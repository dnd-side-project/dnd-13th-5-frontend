import type { UseMutationResult } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import type {
  CreateCustomSubscriptionRequest,
  CreateCustomSubscriptionResponse,
} from '../api/createCustomSubscription';
import { createCustomSubscription } from '../api/createCustomSubscription';

/**
 * 커스텀 구독 등록을 위한 React Query mutation 훅입니다.
 * 성공 시 관련 쿼리들을 무효화하여 최신 데이터를 다시 가져옵니다.
 */
export const useCreateCustomSubscription = (): UseMutationResult<
  CreateCustomSubscriptionResponse,
  Error,
  CreateCustomSubscriptionRequest
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCustomSubscription,
    onSuccess: () => {
      // 커스텀 구독 등록 성공 시 관련 쿼리들을 무효화하여 최신 데이터 갱신
      queryClient.invalidateQueries({ queryKey: ['my-subscriptions'] });
      queryClient.invalidateQueries({ queryKey: ['my-payments'] });
      queryClient.invalidateQueries({ queryKey: ['my-payments-soon'] });
    },
    onError: error => {
      console.error('커스텀 구독 등록 실패:', error);
    },
  });
};
