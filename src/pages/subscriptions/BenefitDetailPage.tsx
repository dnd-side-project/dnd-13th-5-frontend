import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { usePlans } from '@/entities/product/hooks/usePlans';
import { useProducts } from '@/entities/product/hooks/useProducts';
import { Icons } from '@/shared/assets/icons';
import { useBenefitKeysFromPlans } from '@/shared/hooks/useBenefitKeys';
import { cn } from '@/shared/lib';
import { parseBenefit } from '@/shared/lib/parseBenefit';
import { IconButton } from '@/shared/ui/button';
import { MobileLayout } from '@/shared/ui/layout';
import { ServiceIdentity } from '@/shared/ui/service-identity';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tab';
import { BenefitList } from '@/widgets/subscription-detail/ui/BenefitList';

export const BenefitDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  const { data: plans, isLoading: isPlansLoading, isError: isPlansError } = usePlans(Number(id));
  const {
    data: products,
    isLoading: isProductsLoading,
    isError: isProductsError,
  } = useProducts(location.state.category);

  const filteredProduct = products?.find(p => p.productId === Number(id));
  const uniqueBenefitKeys = useBenefitKeysFromPlans(plans ?? null);

  const handleBack = () => {
    if (location.state?.returnTo) {
      navigate(location.state.returnTo, { state: { ...location.state } });
    } else {
      navigate(-1); // 일반 브라우저 뒤로가기
    }
  };

  // 로딩 상태 처리: 두 훅 중 하나라도 로딩 중이면 로딩 UI를 표시합니다.
  if (isProductsLoading || isPlansLoading) {
    return (
      <MobileLayout
        headerProps={{
          leftSlot: (
            <IconButton
              icon={{ component: Icons.Left }}
              ariaLabel="뒤로가기"
              onClick={handleBack}
            />
          ),
        }}
      >
        <section className="py-10 flex flex-col items-center">
          <p className="typo-body-l-bold text-gray-400 animate-pulse">데이터를 불러오는 중...</p>
        </section>
      </MobileLayout>
    );
  }

  // 에러 상태 처리: 두 훅 중 하나라도 에러가 발생하면 에러 메시지를 표시합니다.
  if (isProductsError || isPlansError || !products || !plans) {
    return (
      <MobileLayout
        headerProps={{
          leftSlot: (
            <IconButton
              icon={{ component: Icons.Left }}
              ariaLabel="뒤로가기"
              onClick={handleBack}
            />
          ),
        }}
      >
        <section className="py-10 flex flex-col items-center">
          <p className="typo-body-m-bold text-red-500">
            데이터를 찾을 수 없거나 오류가 발생했습니다.
          </p>
        </section>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout
      showBottom={false}
      headerProps={{
        leftSlot: (
          <IconButton icon={{ component: Icons.Left }} ariaLabel="뒤로가기" onClick={handleBack} />
        ),
      }}
    >
      <section className="py-3 flex flex-col items-center gap-2">
        <ServiceIdentity
          serviceName={filteredProduct?.name ?? ''}
          category={filteredProduct?.category ?? ''}
          imageUrl={filteredProduct?.imageUrl ?? ''}
          size="xl"
          tagClassName="py-1"
        />
      </section>

      <section className="-mx-5 -mb-5">
        <Tabs defaultValue={`plan-${plans[0].id}`}>
          <TabsList className={cn('grid w-full', `grid-cols-${plans.length}`)}>
            {plans.map(plan => (
              <TabsTrigger key={plan.id} value={`plan-${plan.id}`}>
                {plan.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {plans.map(plan => {
            const benefitsMap = parseBenefit(plan.benefit ?? '');
            return (
              <TabsContent key={plan.id} value={`plan-${plan.id}`} className="bg-gray-50 p-5">
                <BenefitList benefitsMap={benefitsMap} uniqueBenefitKeys={uniqueBenefitKeys} />
              </TabsContent>
            );
          })}
        </Tabs>
      </section>
    </MobileLayout>
  );
};
