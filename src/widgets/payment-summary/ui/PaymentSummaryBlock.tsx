import { useMyPayments } from '@/entities/subscription/hook/useMyPayments';
import { useMyPaymentsSoon } from '@/entities/subscription/hook/useMyPaymentsSoon';
import { formatDDay, formatKoreanDate, formatKRW } from '@/shared/lib/format';
import { Carousel } from '@/shared/ui/carousel/Carousel';
import { ContentsCard } from '@/shared/ui/contents-card';
import { Tag } from '@/shared/ui/tag';

import { PaymentSummaryCard } from './PaymentSummaryCard';

export const PaymentSummaryBlock = () => {
  const { data, isLoading, isError } = useMyPayments();
  const { data: soonData, isLoading: soonLoading, isError: soonError } = useMyPaymentsSoon();

  if (isLoading || soonLoading) return <div>스켈레톤</div>;
  if (isError || soonError || !data) return <div>에러 발생</div>; // TODO: empty/error UI

  const title =
    data.subCount > 0 ? (
      <div className="typo-title-l-bold">
        <span>{data.userName}님은 </span>
        <span className="text-primary-700">{data.subCount}개</span>
        <span>의</span>
        <br />
        <span>서비스를 구독 중이에요 :)</span>
      </div>
    ) : (
      <div className="typo-title-l-bold">
        <span>{data.userName}님, 반가워요 👋</span>
        <br />
        <span>새로운 구독을 추가해볼까요?</span>
      </div>
    );

  return (
    <div className="py-3 -m-5 px-5 bg-white">
      {data && (
        <>
          <PaymentSummaryCard
            title={title}
            subCount={data.subCount}
            dateText={formatKoreanDate()} // 임시: 오늘 날짜. API 연결되면 변경
            monthUsed={data.remainingAmount}
            monthLimit={data.totalAmount}
            progressPercent={data.progressPercent}
          />
          <div className="mt-3 px-3 w-full mb-5">
            <Carousel ariaLabel="다가오는 결제 목록 캐러셀">
              {soonData?.services.map(it => (
                <ContentsCard
                  // TODO: 추후 api 명세에 따라 key 수정
                  key={it.id}
                  left={
                    <>
                      <Tag>{formatDDay(it.nextDueDate)}</Tag>
                      <p className="typo-body-m-bold text-gray-800">{it.name}</p>
                    </>
                  }
                  right={<p className="typo-body-m-bold text-gray-800">{formatKRW(it.price)}</p>}
                  className="max-w-[640px] " // 필요 시 폭 제한
                />
              ))}
            </Carousel>
          </div>
        </>
      )}
    </div>
  );
};
