import apiClient from '@/shared/api/apiClient';

import type { PayUnit } from '../model/register.types';

// 커스텀 구독 등록 요청 바디 타입
export type CreateCustomSubscriptionRequest = {
  productName: string;
  category: string;
  price: number;
  participantCount: number;
  payCycleUnit: PayUnit;
  startedAt: string | null; // ISO 날짜 형식 또는 null
  paymentMethodId: number;
  memo?: string;
};

// API 응답 타입
type CreateCustomSubscriptionResponse = {
  status: number;
  code: string;
  message: string;
};

/**
 * 새로운 커스텀 구독을 등록하는 API 함수입니다.
 */
export const createCustomSubscription = async (
  payload: CreateCustomSubscriptionRequest,
): Promise<CreateCustomSubscriptionResponse> => {
  const response = await apiClient.post<CreateCustomSubscriptionResponse>(
    '/subscriptions/custom',
    payload,
  );
  return response.data;
};
