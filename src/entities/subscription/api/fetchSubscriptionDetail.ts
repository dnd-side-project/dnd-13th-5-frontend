import apiClient from '@/shared/api/apiClient';

// 구독 상세 정보 타입
export type SubscriptionDetail = {
  id: number;
  productName: string;
  category: string;
  imageUrl: string;
  payCycleUnit: string;
  startedAt: string;
  totalPaymentCount: number;
  price: number;
  planName: string;
  paymentMethodId: number;
  memo: string;
  participantCount: number;
  benefit: string;
  isFavorite: boolean;
};

// API 응답 타입
type SubscriptionDetailResponse = {
  status: number;
  code: string;
  message: string;
  data: SubscriptionDetail;
};

/**
 * 구독 상세 정보를 조회하는 API 함수입니다.
 * @param subscriptionId - 조회할 구독 ID
 */
export const fetchSubscriptionDetail = async (
  subscriptionId: number,
): Promise<SubscriptionDetail> => {
  const response = await apiClient.get<SubscriptionDetailResponse>(
    `/subscriptions/${subscriptionId}`,
  );
  return response.data.data;
};
