export type PayUnit = 'WEEK' | 'MONTH' | 'YEAR';
export type MethodKind = 'CARD' | 'ACCOUNT' | 'EASY';

export type MethodOption = { id: number; label: string };
export type MethodOptionsByKind = {
  CARD: MethodOption[];
  ACCOUNT: MethodOption[];
  EASY: MethodOption[];
};

export type SelectedPlanMeta = {
  id: number;
  name: string;
  price?: number; // 숫자 가격(선택)
  priceLabel?: string; // "7,000원" 같은 표시용 라벨
  benefit?: string; // 선택(있으면 함께 저장)
};

export type PlanOption = {
  id: number;
  name: string;
  priceLabel: string; // 기존
  price?: number; // 추가: 숫자 가격
  benefit?: string; // 추가
};

export type RegisterForm = {
  categoryName?: string; // API에 필요한 카테고리 이름 (ex. "OTT", "SHOPPING")
  productId?: number; // Step2 선택. 0이면 "직접입력" 의미
  planId?: number;
  participantCount: number;
  payCycleUnit: PayUnit;
  startedAt?: string | null; // API 스펙에 맞게 수정: "YYYY-MM-DD" 형식
  methodKind: MethodKind;
  paymentMethodId?: number;
  memo?: string;
  selectedPlan?: SelectedPlanMeta | null; // 👈 추가
  /** Step2에서 "없어요"를 선택했을 때 입력할 서비스명 */
  customProductName?: string | null;
  customPrice?: number;
};

// 서버 요청 스펙으로 변환
export const toRegisterPayload = (f: RegisterForm) => ({
  productId: f.productId!,
  planId: f.planId!,
  payCycleUnit: f.payCycleUnit,
  startedAt: f.startedAt || '', // 'YYYY-MM-DD' 형식
  paymentMethodId: f.paymentMethodId!,
  memo: f.memo ?? '',
  participantCount: f.participantCount,
});
