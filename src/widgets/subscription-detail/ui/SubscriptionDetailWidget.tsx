import { Icons } from '@/shared/assets/icons';
import { formatCycleUnit, formatKRW } from '@/shared/lib/format';
import { Button } from '@/shared/ui/button';
import { ContentsCard } from '@/shared/ui/contents-card';
import { ContentsCardStacked } from '@/shared/ui/contents-card-stacked';
import { ServiceIdentity } from '@/shared/ui/service-identity';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tab';
import { Tag } from '@/shared/ui/tag';

type Props = { subscriptionId: number };

const DUMMY_DATA = {
  statusCode: 200,
  code: 'SIS-201',
  message: '구독 상세 조회 성공',
  data: {
    id: 1,
    serviceName: '쿠팡 와우',
    category: '쇼핑',
    imageUrl: 'https://example.com/coupang-logo.png',
    cycleUnit: 'MONTH',
    cycleNum: 1,
    payCount: 5,
    price: 14900,
    paymentMethod: 'KB국민은행',
    isFavorite: true,
    memos: [
      {
        id: 1,
        content:
          '가족끼리 공동 사용 중. 다음 달부터 요금 인상 예정이라 변경 여부 검토 후 알림 설정 필요.',
      },
    ],
    planName: '광고형 스탠다드',
    planPrice: 70000,
    totalPeople: 4,
    benefit: '무료배송, 쿠팡플레이 무료 이용, 로켓배송 우선권',
  },
};

export const SubscriptionDetailWidget = ({ subscriptionId }: Props) => {
  const { data } = DUMMY_DATA;
  const benefit = data.benefit.split(', ').map(item => item.trim());
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
    <section className="mb-4">
      {/* 상단 아이덴티티 */}
      <ServiceIdentity
        serviceName={data.serviceName}
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
        <TabsContent value="info" className="bg-gray-50 gap-4 flex flex-col">
          {/* 상단 강조 문구 + 누적 횟수 */}
          <ContentsCardStacked>
            {/* 강조 헤더 라인 (필요하면) */}
            <ContentsCardStacked.Header
              title={
                <div className="flex gap-2">
                  <div className="flex typo-title-m-bold">
                    <span
                      className={data.cycleUnit === 'MONTH' ? 'text-secondary-200' : 'text-[#FA0]'}
                    >
                      {formatCycleUnit(data.cycleUnit)}
                      {data.cycleNum && data.cycleUnit === 'MONTH' && `${data.cycleNum}일`}
                    </span>
                    <span className="ml-1">결제하고 있어요</span>
                  </div>
                  <Tag appearance="soft" color="gray">
                    누적 {data.payCount}회
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
          {data.paymentMethod && (
            <ContentsCard
              className="bg-white"
              left={<span className="typo-body-s-medium text-gray-800">결제수단</span>}
              right={<span className="typo-body-s-medium text-gray-500">{data.paymentMethod}</span>}
            />
          )}

          {/* 메모 */}
          <ContentsCardStacked>
            <ContentsCardStacked.Header
              title="메모"
              right={<img src={Icons.Right2} alt="메모 수정하기" className="w-6 h-[21px]" />}
            />
            <ContentsCardStacked.Divider />
            <ContentsCardStacked.Note>
              {data.memos.length === 0
                ? '메모가 없습니다. 구독에 대한 메모를 남겨보세요.'
                : data.memos[0].content}
            </ContentsCardStacked.Note>
          </ContentsCardStacked>

          {/* 하단 액션 버튼 */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <Button variant="primary-fill" className="w-full" title="삭제하기" />
            <Button variant="primary-stroke" className="w-full" title="해지하기" />
          </div>
        </TabsContent>

        {/* 혜택 패널, TODO: 추후 api 나오면 맞게 수정 */}
        <TabsContent value="benefit" className="bg-gray-50 min-h-[60vh]">
          {benefit.map((group, items) => (
            <div key={group} className="px-5 py-4">
              <p className="typo-title-s-bold mb-2">{group}</p>
              {/* <ul className="list-disc pl-4 space-y-1 text-gray-700 typo-body-s-medium">
                {items.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul> */}
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </section>
  );
};
