import { useEffect, useState } from 'react';

import { useProductsInfo } from '@/entities/product/hooks/useProductsInfo';
import { useBenefitKeysFromProducts } from '@/shared/hooks/useBenefitKeys';
import { cn } from '@/shared/lib';
import { parseBenefit } from '@/shared/lib/parseBenefit';
import { ContentsCard } from '@/shared/ui/contents-card';
import { Filter } from '@/shared/ui/filter';
import type { ComparisonResultSectionProps } from '@/widgets/comparison-section/model/types';

const ComparisonResultSection = ({ selectedSubs, handleDetail }: ComparisonResultSectionProps) => {
  const { data: products, isLoading } = useProductsInfo(selectedSubs);
  const selectedProducts = products?.filter(p => selectedSubs.includes(p.id)) ?? [];

  const [selectedPlans, setSelectedPlans] = useState<Record<number, number>>(
    Object.fromEntries(
      (selectedProducts ?? [])
        .filter(p => p.plans && p.plans.length > 0)
        .map(p => [p.id, p.plans[0].planId]),
    ),
  );

  useEffect(() => {
    if (products) {
      const initialPlans = Object.fromEntries(
        products.filter(p => p.plans && p.plans.length > 0).map(p => [p.id, p.plans[0].planId]),
      );
      setSelectedPlans(initialPlans);
    }
  }, [products]); // products가 의존성 배열에 추가되어 데이터 로드 후 실행됩니다.

  // 모든 상품의 혜택 키를 수집합니다.
  const uniqueBenefitKeys = useBenefitKeysFromProducts(selectedProducts);

  const handleSelectFilter = (productId: number, planId: string) => {
    setSelectedPlans(prev => ({ ...prev, [productId]: Number(planId) }));
    // 선택한 요금제에 맞게 혜택 보여주기
  };

  const resultTitle =
    selectedProducts.length === 2 ? (
      <h2 className="typo-title-l-bold">
        {selectedProducts[0].name}
        <br />
        <span className="text-gray-500">VS </span>
        {selectedProducts[1].name}
      </h2>
    ) : (
      <h2 className="typo-title-l-bold flex gap-1 flex-wrap">
        {selectedProducts.map((p, index) => (
          <span key={p.id} className="flex items-center gap-1">
            {p.name}
            {index < selectedProducts.length - 1 && <span className="text-gray-500">VS</span>}
          </span>
        ))}
      </h2>
    );

  // TODO: 로딩 스켈레톤
  if (isLoading) {
    return (
      <section className="p-5 space-y-6 overflow-x-auto">
        <div className="space-y-4">
          <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse"></div>
          <div className="grid grid-flow-col gap-4 auto-cols-[minmax(150px,1fr)]">
            <div className="h-32 bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="h-32 bg-gray-200 rounded-lg animate-pulse"></div>
            {selectedProducts.length > 2 && (
              <>
                <div className="h-32 bg-gray-200 rounded-lg animate-pulse"></div>
                {selectedProducts.length > 3 && (
                  <div className="h-32 bg-gray-200 rounded-lg animate-pulse"></div>
                )}
              </>
            )}
          </div>
        </div>
        <div className="space-y-4">
          <div className="h-6 w-1/2 bg-gray-200 rounded animate-pulse"></div>
          <div className="grid grid-flow-col gap-4 auto-cols-[minmax(150px,1fr)]">
            <div className="h-16 bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="h-16 bg-gray-200 rounded-lg animate-pulse"></div>
            {selectedProducts.length > 2 && (
              <>
                <div className="h-16 bg-gray-200 rounded-lg animate-pulse"></div>
                {selectedProducts.length > 3 && (
                  <div className="h-16 bg-gray-200 rounded-lg animate-pulse"></div>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="p-5 space-y-6 overflow-x-auto">
      {resultTitle}

      <div className={cn('grid gap-4', 'grid-flow-col auto-cols-[minmax(150px,1fr)]')}>
        {selectedProducts?.map(p => {
          if (!p.plans || p.plans.length === 0) {
            return (
              <div key={p.id} className="flex flex-col gap-6">
                <ContentsCard
                  left={
                    <div className="flex flex-col items-start">
                      <img src={p.imageUrl} className="w-10 h-10 rounded-lg mb-3" />
                      <button
                        className="typo-body-m-bold text-gray-600 mb-2"
                        onClick={() => handleDetail(p.id)}
                      >
                        자세히보기
                      </button>
                      <span className="typo-body-m-bold">-</span>
                    </div>
                  }
                  className="bg-white p-4"
                />
              </div>
            );
          }

          const selectedPlan = p.plans?.find(plan => plan.planId === selectedPlans[p.id]);

          return (
            <div key={p.id} className="flex flex-col gap-6">
              {/* 비교 결과 */}
              <ContentsCard
                left={
                  <div className="flex flex-col items-start">
                    <img src={p.imageUrl} className="w-10 h-10 rounded-lg mb-3" />
                    <button
                      className="typo-body-m-bold text-gray-600 mb-2"
                      onClick={() => handleDetail(p.id)}
                    >
                      자세히보기
                    </button>
                    <Filter
                      label={selectedPlan?.planName ?? p.plans[0].planName}
                      items={p.plans.map(plan => ({
                        key: plan.planId.toString(),
                        label: plan.planName,
                      }))}
                      onSelect={planId => handleSelectFilter(p.id, planId)}
                      sideOffset={12}
                    />
                  </div>
                }
                className="bg-white p-4"
              />
            </div>
          );
        })}
      </div>

      {/* 혜택 키를 기준으로 순회하며 각 상품의 혜택 값을 표시 */}
      {uniqueBenefitKeys.map(key => (
        <div key={key} className="space-y-5">
          <h3 className="typo-title-m-bold">{key}</h3>
          <div className={cn('grid gap-4', 'grid-flow-col auto-cols-[minmax(150px,1fr)]')}>
            {selectedProducts.map(p => {
              const selectedPlan = p.plans.find(plan => plan.planId === selectedPlans[p.id]);
              const benefitsMap = parseBenefit(selectedPlan?.benefit ?? '');

              return (
                <ContentsCard
                  key={p.id}
                  left={
                    <span className="typo-body-m-bold break-keep">{benefitsMap[key] ?? '-'}</span>
                  }
                  className="bg-white p-4"
                />
              );
            })}
          </div>
        </div>
      ))}
    </section>
  );
};

export default ComparisonResultSection;
