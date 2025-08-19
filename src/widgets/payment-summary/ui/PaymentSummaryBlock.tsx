import { useEffect, useState } from 'react';

import { formatDDay, formatKoreanDate, formatKRW } from '@/shared/lib/foramt';
import { Carousel } from '@/shared/ui/carousel/Carousel';
import { ContentsCard } from '@/shared/ui/contents-card';
import { Tag } from '@/shared/ui/tag';

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
  //   const { paymentsData, paymentsLoading, paymentsError } = useMemberPaymentsSummary();
  //   const { soonData, soonLoading, soonError } = useSoonPaymentSummary();
  //   if (paymentsLoading || soonLoading) return <PaymentSummarySkeleton />;
  //   if (paymentsError || soonError || !data) return null; // TODO: empty/error UI

  if (!data) return null; // 데이터 로딩 중
  const items = [
    { dueDate: '2025-08-25', serviceName: '넷플릭스', price: 7000 },
    { dueDate: '2025-08-12', serviceName: '유튜브 프리미엄', price: 11500 },
    { dueDate: '2025-08-20', serviceName: '디즈니+', price: 9900 },
    { dueDate: '2025-08-28', serviceName: '멜론', price: 10900 },
  ];
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
    <div className="px-5 py-3">
      <PaymentSummaryCard
        title={title}
        dateText={formatKoreanDate()} // 임시: 오늘 날짜. API 연결되면 변경
        iconUrl={FALLBACK_ICON}
        serviceName={FALLBACK_SERVICE}
        // 네이밍 모호 — 현재 UI 문구가 "이번달 남은 결제"라 그대로 표기
        monthUsed={data.remainingRate}
        monthLimit={data.totalAmount}
        progressPercent={data.progressPercent}
      />
      <div className="mt-3">
        <Carousel ariaLabel="다가오는 결제 목록 캐러셀">
          {items.map(it => (
            <ContentsCard
              key={it.serviceName}
              left={
                <>
                  <Tag>{formatDDay(it.dueDate)}</Tag>
                  <p className="typo-body-m-bold text-gray-800">{it.serviceName}</p>
                </>
              }
              right={<p className="typo-body-m-bold text-gray-800">{formatKRW(it.price)}</p>}
              className="mx-3 max-w-[640px] shadow-[2px_2px_20px_0px_rgba(0,0,0,0.08)] " // 필요 시 폭 제한
            />
          ))}
        </Carousel>
      </div>
    </div>
  );
};
