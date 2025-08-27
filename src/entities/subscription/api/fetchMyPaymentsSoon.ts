import apiClient from '@/shared/api/apiClient';

// 서비스 정보에 대한 타입
type Service = {
  id: number;
  name: string;
  price: number;
  nextDueDate: string;
};

// API 응답 전체에 대한 타입 (업데이트됨)
type MyPaymentsSoonResponse = {
  status: number;
  code: string;
  message: string;
  data: {
    services: Service[];
  };
};

// 실제 사용자 정보 데이터에 대한 타입
export type MyPaymentsSoon = {
  services: Service[];
};

/**
 * 현재 로그인된 사용자의 정보를 조회하는 API 함수입니다.
 * 이 함수는 오직 API 호출과 핵심 데이터 반환에만 집중합니다.
 * 토큰 주입, 로딩/에러 상태 관리는 각각 apiClient 인터셉터와 React Query가 담당합니다.
 */
export const fetchMyPaymentsSoon = async (): Promise<MyPaymentsSoon> => {
  const response = await apiClient.get<MyPaymentsSoonResponse>('/subscriptions/my/payment-soon');
  return response.data.data; // 서버 응답의 data 객체 안의 data를 반환합니다.
};
