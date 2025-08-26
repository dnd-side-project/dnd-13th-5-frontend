import apiClient from '@/shared/api/apiClient';

import type { CategoryOption } from './fetchProducts';

// 개별 구독 서비스에 대한 타입
export type SubscriptionService = {
  id: number;
  name: string;
  category: CategoryOption; // 'OTT' 외 다른 카테고리도 올 수 있으므로 string으로 지정
  payCycleUnit: 'WEEK' | 'MONTH' | 'YEAR'; // 정해진 값만 오도록 제한
  planName: string;
  price: number;
  isFavorites: boolean;
  imageUrl: string;
  startedAt?: string; // 날짜 형식이므로 string
};

// API 응답의 data 객체에 대한 타입
export type MySubscriptionData = {
  services: SubscriptionService[];
};

// API 응답 전체에 대한 타입
type MySubscriptionResponse = {
  data: MySubscriptionData;
};

// fetchMySubscription 함수의 인자 타입
export type FetchMySubscriptionParams = {
  category?: CategoryOption;
  sort: string;
};

/**
 * 현재 로그인된 사용자의 구독 목록을 조회하는 API 함수입니다.
 * @param category - 필터링할 카테고리
 * @param sort - 정렬 기준
 */
export const fetchMySubscription = async ({
  category,
  sort,
}: FetchMySubscriptionParams): Promise<MySubscriptionData> => {
  const response = await apiClient.get<MySubscriptionResponse>('/subscriptions', {
    params: {
      category,
      sort,
    },
  });
  return response.data.data; // 서버 응답의 data 객체 안의 data를 반환합니다.
};
