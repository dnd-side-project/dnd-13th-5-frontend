import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useSubscriptionDetail } from '@/entities/subscription/hook/useSubscriptionDetail';
import { useUpdateSubscription } from '@/entities/subscription/hook/useUpdateSubscription';
import type { PayUnit } from '@/entities/subscription/model/register.types';
import { Icons } from '@/shared/assets/icons';
import { ROUTES } from '@/shared/config/routes';
import { IconButton } from '@/shared/ui/button';
import { MobileLayout } from '@/shared/ui/layout';
import { SubscriptionEditWidget } from '@/widgets/payment-edit';

type SubscriptionEditForm = {
  planId: number;
  productName: string;
  price: number;
  participantCount: number;
  payCycleUnit: PayUnit;
  startedAt: string | null;
  paymentMethodId: number;
  memo: string;
};

// 서버 업데이트 요청 스펙
type UpdateSubscriptionPayload = {
  planId: number;
  productName: string;
  price: number;
  participantCount: number;
  payCycleUnit: PayUnit;
  startedAt: string | null;
  paymentMethodId: number;
  memo: string;
};

// 폼 데이터를 서버 요청 스펙으로 변환
const toUpdatePayload = (formData: SubscriptionEditForm): UpdateSubscriptionPayload => ({
  planId: formData.planId,
  productName: formData.productName,
  price: formData.price,
  participantCount: formData.participantCount,
  payCycleUnit: formData.payCycleUnit,
  startedAt: formData.startedAt,
  paymentMethodId: formData.paymentMethodId,
  memo: formData.memo,
});

export const SubscriptionEditPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const updateSubscriptionMutation = useUpdateSubscription();

  const subscriptionId = Number(id);
  const {
    data: subscriptionDetail,
    isLoading: isSubscriptionLoading,
    error: subscriptionError,
  } = useSubscriptionDetail(subscriptionId);

  useEffect(() => {
    if (!id || Number.isNaN(subscriptionId)) {
      // 잘못된 ID인 경우 이전 페이지로 이동
      navigate(ROUTES.SUBSCRIPTIONS);
    }
  }, [id, subscriptionId, navigate]);

  const handleSave = async (data: SubscriptionEditForm) => {
    if (!subscriptionId) return;

    try {
      setIsLoading(true);

      // 폼 데이터를 서버 요청 스펙으로 변환
      const payload = toUpdatePayload(data);

      await updateSubscriptionMutation.mutateAsync({
        subscriptionId,
        ...payload,
      });

      // 관련 쿼리들을 무효화하여 최신 데이터 반영 -> 훅 안에서 처리중
      // await queryClient.invalidateQueries({
      //   queryKey: ['subscription-detail', subscriptionId],
      // });
      // await queryClient.invalidateQueries({
      //   queryKey: ['my-subscriptions'],
      // });

      // 성공 후 상세 페이지로 이동
      navigate(`/subscriptions/${subscriptionId}`);
    } catch (error) {
      console.error('구독 정보 수정 실패:', error);
      // TODO: 에러 토스트 표시
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  // 구독 상세 정보에서 defaultValues 추출
  const getDefaultValues = (): Partial<SubscriptionEditForm> => {
    if (!subscriptionDetail) {
      return {
        planId: 0,
        productName: '',
        price: 0,
        participantCount: 1,
        payCycleUnit: 'MONTH',
        startedAt: null,
        paymentMethodId: 0,
        memo: '',
      };
    }

    return {
      productName: subscriptionDetail.productName,
      price: subscriptionDetail.price,
      participantCount: subscriptionDetail.participantCount,
      payCycleUnit: subscriptionDetail.payCycleUnit as PayUnit,
      startedAt: subscriptionDetail.startedAt,
      paymentMethodId: subscriptionDetail.paymentMethodId,
      memo: subscriptionDetail.memo || '',
    };
  };

  return (
    <MobileLayout
      showBottom={false}
      headerProps={{
        leftSlot: (
          <IconButton
            icon={{ component: Icons.Left }}
            ariaLabel="뒤로가기"
            onClick={() => navigate(ROUTES.SUBSCRIPTION_DETAIL(`${subscriptionId}`))}
          />
        ),
        centerSlot: '정보 수정하기',
      }}
    >
      <div>
        {isSubscriptionLoading && (
          <div className="flex items-center justify-center h-64">
            <p>로딩 중...</p>
          </div>
        )}
        {subscriptionError && (
          <div className="flex items-center justify-center h-64">
            <p>구독 정보를 불러올 수 없습니다.</p>
          </div>
        )}
        {!isSubscriptionLoading && !subscriptionError && subscriptionDetail && (
          <SubscriptionEditWidget
            onSave={handleSave}
            onCancel={handleCancel}
            isLoading={isLoading || updateSubscriptionMutation.isPending}
            defaultValues={getDefaultValues()}
            productId={subscriptionDetail.productId}
            isCustom={subscriptionDetail.isCustom}
            planName={subscriptionDetail.planName}
          />
        )}
      </div>
    </MobileLayout>
  );
};
