import type { UseMutationResult } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { CreateSubscriptionRequest } from '../api/createSubscription';
import { createSubscription } from '../api/createSubscription';

// API 응답 타입 (createSubscription.ts에서 import하지 않고 여기서 정의)
type CreateSubscriptionResponse = {
  status: number;
  code: string;
  message: string;
};

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
      queryClient.invalidateQueries({ queryKey: ['subscriptions'] });
      queryClient.invalidateQueries({ queryKey: ['my-subscription'] });
      queryClient.invalidateQueries({ queryKey: ['my-payments'] });
    },
    onError: error => {
      console.error('구독 등록 실패:', error);
    },
  });
};
