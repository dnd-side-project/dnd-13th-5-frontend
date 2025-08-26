export type PayUnit = 'MONTH' | 'YEAR' | 'WEEK';
export type MethodKind = 'CARD' | 'ACCOUNT' | 'EASY';

export type ServiceOption = { id: number; name: string; iconUrl: string };

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
  categoryId?: number;
  productId?: number; // Step2 선택. 0이면 "직접입력" 의미
  planId?: number;
  participantCount: number;
  payCycleNum: number;
  payCycleUnit: 'MONTH';
  startDay?: string | null;
  methodKind: 'CARD' | 'ACCOUNT' | 'EASY';
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
  payCycleNum: f.payCycleNum,
  payCycleUnit: f.payCycleUnit, // 'MONTH'
  startDay: f.startDay ? f.startDay.replaceAll('-', '.') : undefined, // 'YYYY.MM.DD'
  paymentMethodId: f.paymentMethodId!,
  memo: f.memo ?? '',
  participantCount: f.participantCount,
});
