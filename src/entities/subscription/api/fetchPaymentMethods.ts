import apiClient from '@/shared/api/apiClient';

import type { MethodOptionsByKind } from '../model/register.types';

// API 응답 전체에 대한 타입
type PaymentMethodsResponse = {
  status: number;
  code: string;
  message: string;
  data: {
    card: PaymentMethod[];
    account: PaymentMethod[];
    easyPay: PaymentMethod[];
  };
};

// 결제수단 데이터 타입
export type PaymentMethod = {
  id: number;
  type: 'CARD' | 'ACCOUNT' | 'EASY_PAY';
  name: string;
  imageUrl: string;
};

// 결제수단 종류별 그룹 타입
export type PaymentMethodsByType = {
  card: PaymentMethod[];
  account: PaymentMethod[];
  easyPay: PaymentMethod[];
};

/**
 * API 응답을 기존 폼 구조에 맞는 형태로 변환합니다.
 */
export const transformToMethodOptions = (data: PaymentMethodsByType): MethodOptionsByKind => ({
  CARD: data.card.map(method => ({ id: method.id, label: method.name, imageUrl: method.imageUrl })),
  ACCOUNT: data.account.map(method => ({
    id: method.id,
    label: method.name,
    imageUrl: method.imageUrl,
  })),
  EASY: data.easyPay.map(method => ({
    id: method.id,
    label: method.name,
    imageUrl: method.imageUrl,
  })),
});

/**
 * 사용자의 결제수단 목록을 조회하는 API 함수입니다.
 * 카드, 계좌, 간편결제로 분류된 결제수단 정보를 반환합니다.
 */
export const fetchPaymentMethods = async (): Promise<PaymentMethodsByType> => {
  const response = await apiClient.get<PaymentMethodsResponse>('/payment-methods');
  return response.data.data;
};
