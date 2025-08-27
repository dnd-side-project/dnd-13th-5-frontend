// 서버 응답 DTO
export type GetTotalPaymentsDto = {
  statusCode: number;
  code: string;
  message: string;
  data: {
    userName: string;
    totalAmount: number; // 월 전체(분모)
    remainingRate: number; // 지불 금액
    progressPercent: number; // 0~100
    subCount: number;
    passCount: number;
  };
};

// 도메인 모델
export type MemberTotalPayments = {
  userName: string;
  totalAmount: number;
  remainingAmount: number; // remainingRate를 금액으로 해석
  progressPercent: number; // 바로 사용(0~100)
  activeCount: number; // subCount + passCount
};
