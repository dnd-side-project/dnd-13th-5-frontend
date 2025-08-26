// src/entities/subscription/model/types.ts
export type SortParam = 'NAME' | 'PRICE' | 'DUESOON' | 'OLDESTFIRST';

// 서버 DTO
// TODO: 매월/매주/매년 이런 옵션 없어서 문의해야함
export type SubscriptionDto = {
  id: number;
  name: string;
  category: string; // 서버 문자열 (예: "쇼핑" or "OTT")
  paymentDate: number; // 매월 날짜 (1~31)
  price: number;
  isFavorites: boolean;
  imageUrl: string;
};

export type MySubscriptionsDto = {
  statusCode: number;
  code: string;
  message: string;
  data: {
    userName: string;
    subscriptions: SubscriptionDto[];
  };
};

// 프론트 도메인 모델
export type Subscription = {
  id: number;
  name: string;
  category: string;
  paymentDate?: number;
  price: number;
  isFavorites: boolean;
  imageUrl: string;
};

export type MySubscriptions = {
  userName: string;
  list: Subscription[];
};
