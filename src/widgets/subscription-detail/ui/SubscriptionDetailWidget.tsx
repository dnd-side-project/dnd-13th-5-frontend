import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import type { SubscriptionDetail } from '@/entities/subscription/api/fetchSubscriptionDetail';
import { useDeleteSubscription } from '@/entities/subscription/hook/useDeleteSubscription';
import { useUnsubscriptionUrl } from '@/entities/subscription/hook/useUnsubscriptionUrl';
import { Icons } from '@/shared/assets/icons';
import { formatCycleUnit, formatKRW } from '@/shared/lib/format';
import { parseBenefit } from '@/shared/lib/parseBenefit';
import { getPaymentMethodName } from '@/shared/lib/paymentMethod';
import { Button } from '@/shared/ui/button';
import { ContentsCard } from '@/shared/ui/contents-card';
import { ContentsCardStacked } from '@/shared/ui/contents-card-stacked';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog';
import { ServiceIdentity } from '@/shared/ui/service-identity';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tab';
import { Tag } from '@/shared/ui/tag';

export const SubscriptionDetailWidget = ({
  subscriptionDetail,
}: {
  subscriptionDetail: SubscriptionDetail;
}) => {
  const navigate = useNavigate();
  const data = subscriptionDetail;
  const { benefit } = data;
  const parsedBenefit = parseBenefit(benefit);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const deleteSubscriptionMutation = useDeleteSubscription();
  const { data: unsubscriptionData } = useUnsubscriptionUrl(data.id);

  const handleDelete = async () => {
    try {
      await deleteSubscriptionMutation.mutateAsync(data.id);
      setIsDeleteDialogOpen(false);
      navigate('/subscriptions');
      // 삭제 후 이전 페이지로 이동하거나 리다이렉트하는 로직 추가 가능
    } catch (error) {
      console.error('구독 삭제 실패:', error);
      // 에러 처리 로직 추가 가능 (토스트 메시지 등)
    }
  };

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
    <section>
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
          className="bg-gray-50 gap-4 flex flex-col pb-10 data-[state=inactive]:!hidden
          min-h-[70vh]"
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
          <div className="pt-1">
            <Button
              variant="primary-fill"
              title="삭제하기"
              // className="bg-white"
              onClick={() => setIsDeleteDialogOpen(true)}
            />
            {/* <Button
              variant="primary-stroke"
              title="해지하기"
              onClick={() => setIsCancelDialogOpen(true)}
            /> */}
          </div>

          {/* 삭제 확인 다이얼로그 */}
          <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <DialogContent className="bg-white rounded-xl p-0 max-w-[90vw]">
              <DialogHeader className="px-5 pt-5">
                <DialogTitle className="typo-body-m-bold text-center">
                  정말 삭제하시겠어요?
                </DialogTitle>
              </DialogHeader>

              <div className="px-5 text-center">
                <p className="typo-body-m-medium text-gray-800">삭제하면 외구와구에 저장된</p>
                <p className="typo-body-m-medium text-gray-800">
                  결제 이력과 메모가 모두 사라져요.
                </p>
                {unsubscriptionData?.unsubscribeUrl && (
                  <a
                    href={unsubscriptionData.unsubscribeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="typo-body-m-medium text-primary-700 flex text-center justify-center items-center mt-1"
                  >
                    해지 사이트로 이동하기
                    <Icons.Link className="text-primary-700 fill-primary-700" />
                  </a>
                )}
              </div>

              <DialogFooter className="flex border-t border-gray-100 p-0">
                <DialogClose asChild>
                  <button type="button" className="flex-1 py-4 typo-body-m-medium text-gray-800">
                    취소
                  </button>
                </DialogClose>
                <div className="w-px bg-gray-100" />
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={deleteSubscriptionMutation.isPending}
                  className="flex-1 py-4 typo-body-m-medium text-primary-700 disabled:opacity-50"
                >
                  {deleteSubscriptionMutation.isPending ? '삭제 중...' : '삭제하기'}
                </button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </TabsContent>

        {/* 혜택 패널 */}
        <TabsContent value="benefit" className="bg-gray-50 pb-10 data-[state=inactive]:!hidden">
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
