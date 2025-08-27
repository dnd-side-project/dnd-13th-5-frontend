import type { PayUnit } from './register.types';

// entities/subscription/model/edit.types.ts
export type PlanOption = { id: string; name: string; priceLabel: string }; // "월 7,000원" 같은 표시용
export type BillingCycleOption = { value: PayUnit; label: string }; // 1/3/6/12달 등

export type MethodKind = 'CARD' | 'ACCOUNT' | 'EASY';
export type MethodOption = { id: number; label: string };

export type PaymentMethodOptions = {
  CARD: MethodOption[];
  ACCOUNT: MethodOption[];
  EASY: MethodOption[];
};

export type EditFormValue = {
  planId: string;
  members: number;
  cycleMonths: number; // 1 | 3 | 6 | 12 ...
  paymentDate?: string | null; // 'YYYY-MM-DD' | null(모름)
  methodKind: MethodKind; // 상위(카드/계좌/간편)
  methodId?: string; // 하위 선택 옵션
};
