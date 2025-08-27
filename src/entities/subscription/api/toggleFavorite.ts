import apiClient from '@/shared/api/apiClient';

// API 응답 타입
export type ToggleFavoriteResponse = {
  status: number;
  code: string;
  message: string;
};

/**
 * 구독 서비스의 즐겨찾기 상태를 토글하는 API 함수입니다.
 * @param subscriptionId - 즐겨찾기를 토글할 구독 서비스 ID
 */
export const toggleFavorite = async (subscriptionId: number): Promise<ToggleFavoriteResponse> => {
  const response = await apiClient.patch<ToggleFavoriteResponse>(
    `/subscriptions/${subscriptionId}/favorite`,
  );
  return response.data;
};
