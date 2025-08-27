import type { MouseEvent } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useToggleFavorite } from '@/entities/subscription';
import { useSubscriptionDetail } from '@/entities/subscription/hook/useSubscriptionDetail';
import { Icons } from '@/shared/assets/icons';
import { ROUTES } from '@/shared/config/routes';
import BackButton from '@/shared/ui/button/BackButton';
import { MobileLayout } from '@/shared/ui/layout';
import { SubscriptionDetailWidget } from '@/widgets/subscription-detail/ui/SubscriptionDetailWidget';

const SubscriptionRightSlot = ({ id, isFavorite }: { id: string; isFavorite?: boolean }) => {
  const navigate = useNavigate();
  const toggleFavoriteMutation = useToggleFavorite();

  const handleEdit = () => {
    navigate(ROUTES.SUBSCRIPTION_EDIT(id));
  };

  const handleToggleFavorite = (e: MouseEvent) => {
    e.stopPropagation();
    toggleFavoriteMutation.mutate(Number(id));
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        type="button"
        aria-label="즐겨찾기"
        aria-pressed={isFavorite}
        className="rounded-full flex h-full align-top focus-visible:ring-2 focus-visible:ring-emerald-500/40"
        onClick={handleToggleFavorite}
        title="즐겨찾기"
        disabled={toggleFavoriteMutation.isPending}
      >
        {isFavorite ? (
          <Icons.FilledStar className="h-[18px] w-[18px]" />
        ) : (
          <Icons.Star className="h-[18px] w-[18px]" />
        )}
      </button>
      <button onClick={handleEdit} className="typo-body-m-medium">
        편집
      </button>
    </div>
  );
};

export const SubscriptionDetailPage = () => {
  const { id } = useParams();
  const subscriptionId = Number(id);

  // 페이지 로드 시 스크롤을 맨 위로 이동
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 구독 상세 정보 조회
  const { data: subscriptionDetail, isLoading, error } = useSubscriptionDetail(subscriptionId);

  if (isLoading) {
    return (
      <MobileLayout
        showBottom={false}
        headerProps={{
          leftSlot: <BackButton />,
        }}
      >
        <div className="flex justify-center items-center h-32">
          <div>로딩 중...</div>
        </div>
      </MobileLayout>
    );
  }

  if (error) {
    return (
      <MobileLayout
        showBottom={false}
        headerProps={{
          leftSlot: <BackButton />,
        }}
      >
        <div className="flex justify-center items-center h-32">
          <div>오류가 발생했습니다.</div>
        </div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout
      showBottom={false}
      headerProps={{
        leftSlot: <BackButton />,
        rightSlot: (
          <SubscriptionRightSlot id={id ?? '0'} isFavorite={subscriptionDetail?.isFavorite} />
        ),
      }}
      bodyClassName="pb-0"
    >
      <div className="-mx-5 -mt-5">
        {subscriptionDetail && <SubscriptionDetailWidget subscriptionDetail={subscriptionDetail} />}
      </div>
    </MobileLayout>
  );
};
