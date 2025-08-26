import apiClient from '@/shared/api/apiClient';

// API 응답 전체에 대한 타입 (선택적)
type MyPaymentsResponse = {
  data: MyPayments; // 실제 데이터는 data 객체 안에 있습니다.
};

// 실제 사용자 정보 데이터에 대한 타입
export type MyPayments = {
  userName: string;
  totalAmount: number;
  remainingAmount: number;
  progressPercent: number;
  subCount: number;
};

/**
 * 현재 로그인된 사용자의 정보를 조회하는 API 함수입니다.
 * 이 함수는 오직 API 호출과 핵심 데이터 반환에만 집중합니다.
 * 토큰 주입, 로딩/에러 상태 관리는 각각 apiClient 인터셉터와 React Query가 담당합니다.
 */
export const fetchMyPayments = async (): Promise<MyPayments> => {
  const response = await apiClient.get<MyPaymentsResponse>('/subscriptions/my/total-payments');
  return response.data.data; // 서버 응답의 data 객체 안의 data를 반환합니다.
};
