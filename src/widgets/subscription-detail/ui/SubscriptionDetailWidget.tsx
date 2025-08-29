import type { SubscriptionDetail } from '@/entities/subscription/api/fetchSubscriptionDetail';
import { formatCycleUnit, formatKRW } from '@/shared/lib/format';
import { parseBenefit } from '@/shared/lib/parseBenefit';
import { getPaymentMethodName } from '@/shared/lib/paymentMethod';
import { Button } from '@/shared/ui/button';
import { ContentsCard } from '@/shared/ui/contents-card';
import { ContentsCardStacked } from '@/shared/ui/contents-card-stacked';
import { ServiceIdentity } from '@/shared/ui/service-identity';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tab';
import { Tag } from '@/shared/ui/tag';

export const SubscriptionDetailWidget = ({
  subscriptionDetail,
}: {
  subscriptionDetail: SubscriptionDetail;
}) => {
  const data = subscriptionDetail;
  const { benefit } = data;
  const parsedBenefit = parseBenefit(benefit);

  if (!data) {
    return (
      <section className="px-5 py-6 space-y-6">
        <div className="h-28 rounded-3xl bg-gray-100" />
        <div className="h-10 rounded-full bg-gray-100" />
        <div className="h-20 rounded-2xl bg-gray-100" />
      </section>
    );
  }

  return (
    <section className="">
      {/* 상단 아이덴티티 */}
      <ServiceIdentity
        serviceName={data.productName}
        category={data.category}
        imageUrl={data.imageUrl}
        size="xl"
      />
      <div className="h-3" />

      {/* 탭 */}
      <Tabs defaultValue="info">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="info">상세정보</TabsTrigger>
          <TabsTrigger value="benefit">혜택</TabsTrigger>
        </TabsList>

        {/* 상세정보 패널 */}
        <TabsContent
          value="info"
          className="bg-gray-50 gap-4 flex flex-col pb-10 data-[state=inactive]:!hidden"
        >
          {/* 상단 강조 문구 + 누적 횟수 */}
          <ContentsCardStacked>
            {/* 강조 헤더 라인 (필요하면) */}
            <ContentsCardStacked.Header
              title={
                <div className="flex gap-2">
                  <div className="flex typo-title-m-bold">
                    <span
                      className={
                        data.payCycleUnit === 'MONTH' ? 'text-secondary-200' : 'text-[#FA0]'
                      }
                    >
                      {formatCycleUnit(data.payCycleUnit)}{' '}
                      {(() => {
                        const date = new Date(data.startedAt);
                        const month = date.getMonth() + 1;
                        const day = date.getDate();

                        if (data.payCycleUnit === 'MONTH') {
                          return `${day}일`;
                        }
                        if (data.payCycleUnit === 'YEAR') {
                          return `${month}월 ${day}일`;
                        }
                        return ''; // WEEK는 날짜 표시 안함
                      })()}
                    </span>
                    <span className="ml-1">결제하고 있어요</span>
                  </div>
                  <Tag appearance="soft" color="gray">
                    누적 {data.totalPaymentCount}회
                  </Tag>
                </div>
              }
              className="pb-2"
            />

            <ContentsCardStacked.Row label="결제금액" value={formatKRW(data.price)} />
          </ContentsCardStacked>

          {/* 항목들: 공통 ContentsCard 재사용 */}
          {data.planName && (
            <ContentsCard
              className="bg-white"
              left={<span className="typo-body-s-medium text-gray-800">요금제</span>}
              right={<span className="typo-body-s-medium text-gray-500">{data.planName}</span>}
            />
          )}
          {data.paymentMethodId && (
            <ContentsCard
              className="bg-white"
              left={<span className="typo-body-s-medium text-gray-800">결제수단</span>}
              right={
                <span className="typo-body-s-medium text-gray-500">
                  {getPaymentMethodName(data.paymentMethodId)}
                </span>
              }
            />
          )}

          {/* 메모 */}
          <ContentsCardStacked>
            <ContentsCardStacked.Header title="메모" />
            <ContentsCardStacked.Divider />
            <ContentsCardStacked.Note>
              {data.memo.length > 0 ? data.memo : '메모가 없습니다. 구독에 대한 메모를 남겨보세요.'}
            </ContentsCardStacked.Note>
          </ContentsCardStacked>

          {/* 하단 액션 버튼 */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <Button
              variant="primary-fill"
              title="삭제하기"
              className="bg-white border-gray-100 text-gray-500"
            />
            <Button variant="primary-stroke" title="해지하기" />
          </div>
        </TabsContent>

        {/* 혜택 패널 */}
        <TabsContent
          value="benefit"
          className="bg-gray-50 min-h-[60vh] pb-10 data-[state=inactive]:!hidden"
        >
          <div className="flex flex-col gap-4">
            {parsedBenefit && Object.keys(parsedBenefit).length > 0 ? (
              Object.entries(parsedBenefit).map(([category, benefits]) => (
                <div key={category}>
                  <ContentsCard
                    className="bg-white rounded-xl"
                    left={
                      <div className="flex flex-col gap-3 w-full">
                        <span className="typo-body-s-medium text-gray-800">{category}</span>
                        {benefits.map(content => (
                          <span key={content} className="typo-body-s-medium text-gray-500 flex-1">
                            · {content}
                          </span>
                        ))}
                      </div>
                    }
                  />
                </div>
              ))
            ) : (
              <div className="flex justify-center items-center h-40">
                <p className="typo-body-m-medium text-gray-500">등록된 혜택 정보가 없습니다.</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
};
