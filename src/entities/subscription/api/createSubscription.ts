import apiClient from '@/shared/api/apiClient';

// 구독 등록 요청 바디 타입
export type CreateSubscriptionRequest = {
  productId: number;
  planId: number;
  payCycleUnit: 'WEEK' | 'MONTH' | 'YEAR';
  startedAt: string | null; // ISO 날짜 형식 또는 null
  paymentMethodId: number;
  memo?: string;
  participantCount: number;
};

// API 응답 타입
type CreateSubscriptionResponse = {
  status: number;
  code: string;
  message: string;
};

/**
 * 새로운 구독을 등록하는 API 함수입니다.
 */
export const createSubscription = async (
  payload: CreateSubscriptionRequest,
): Promise<CreateSubscriptionResponse> => {
  const response = await apiClient.post<CreateSubscriptionResponse>('/subscriptions', payload);
  return response.data;
};
