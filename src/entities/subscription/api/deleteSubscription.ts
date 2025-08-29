import apiClient from '@/shared/api/apiClient';

// API 응답 타입
export type DeleteSubscriptionResponse = {
  status: number;
  code: string;
  message: string;
  data: string;
};

/**
 * 구독을 삭제하는 API 함수입니다.
 * @param subscriptionId - 삭제할 구독 ID
 */
export const deleteSubscription = async (
  subscriptionId: number,
): Promise<DeleteSubscriptionResponse> => {
  const response = await apiClient.delete<DeleteSubscriptionResponse>(
    `/subscriptions/${subscriptionId}`,
  );
  return response.data;
};
