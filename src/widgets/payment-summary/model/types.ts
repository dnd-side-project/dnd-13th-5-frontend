import type { ReactNode } from 'react';

export type PaymentSummaryCardProps = {
  title?: string | ReactNode;
  dateText: string;
  iconUrl?: string;
  serviceNam?: string;
  monthUsed: number;
  monthLimit: number;
  progressPercent?: number; // 0~100 범위의 퍼센트 값, 기본값은 0
};
