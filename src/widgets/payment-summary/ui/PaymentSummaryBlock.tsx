import { useEffect, useState } from 'react';

import { formatKoreanDate } from '@/shared/lib/foramt';

import { PaymentSummaryCard } from './PaymentSummaryCard';

// 임시 아이콘/서비스명(실제 API 나오면 대체)
const FALLBACK_ICON = '/assets/netflix.png';
const FALLBACK_SERVICE = 'Netflix';

// 임시 인터페이스
interface PaymentSummaryData {
  userName: string;
  totalAmount: number;
  remainingRate: number;
  progressPercent: number;
  subCount: number;
  passCount: number;
}

export const PaymentSummaryBlock = () => {
  const [data, setData] = useState<PaymentSummaryData | null>(null);

  useEffect(() => {
    fetch('/mock/member/total-payments.json')
      .then(response => response.json())
      .then(mockData => setData(mockData.data))
      .catch(error => console.error('Error loading mock data:', error));
  }, []);

  //   추후 위 목 api 콜 제거하고 아래 훅 추가
  //   const { data, loading, error } = useMemberPaymentsSummary();
  //   if (loading) return <PaymentSummarySkeleton />;
  //   if (error || !data) return null; // TODO: empty/error UI

  if (!data) return null; // 데이터 로딩 중

  const title = (
    <div className="typo-title-l-bold">
      <span>{data.userName}님은 </span>
      <span className="text-primary-700">{data.subCount}개</span>
      <span>의</span>
      <br />
      <span>서비스를 구독 중이에요 :)</span>
    </div>
  );

  return (
    <PaymentSummaryCard
      title={title}
      dateText={formatKoreanDate()} // 임시: 오늘 날짜. API 연결되면 변경
      iconUrl={FALLBACK_ICON}
      serviceName={FALLBACK_SERVICE}
      // NOTE: remainingRate 네이밍 모호 — 현재 UI 문구가 "이번달 남은 결제"라 그대로 표기
      monthUsed={data.remainingRate}
      monthLimit={data.totalAmount}
      progressPercent={data.progressPercent}
    />
  );
};
