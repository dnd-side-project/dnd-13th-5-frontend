import apiClient from '@/shared/api/apiClient';
import type { ApiResponse } from '@/shared/types';

export interface UnsubscriptionUrlResponse {
  unsubscribeUrl: string;
}

/**
 * 구독 해지 링크를 조회합니다.
 * @param subscriptionId 구독 ID
 * @returns 해지 링크 정보
 */
export const fetchUnsubscriptionUrl = async (
  subscriptionId: number,
): Promise<UnsubscriptionUrlResponse> => {
  const response = await apiClient.get<ApiResponse<UnsubscriptionUrlResponse>>(
    `/subscriptions/${subscriptionId}/unsubscription`,
  );

  return response.data.data;
};
