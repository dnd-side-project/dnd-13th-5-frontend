import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useProducts } from '@/entities/product/hooks/useProducts';
import ComparisonAddCard from '@/features/comparison-add/ComparisonAddCard';
import type { CategoryParam } from '@/shared/types/category.types';
import { Button } from '@/shared/ui/button';
import BackButton from '@/shared/ui/button/BackButton';
import { MobileLayout } from '@/shared/ui/layout';

export const ComparisonAddPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get('category') as CategoryParam;
  const [selectedSubs, setSelectedSubs] = useState<number[]>([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const { data: products, isLoading, isError } = useProducts(category);
  // const { data: mySubs = { services: [] } } = useMySubscription({ category, sort: 'NAME' });

  // const filteredMySubsName = mySubs.services?.map(service => service.name);
  // const filteredProducts = products?.filter(product => !filteredMySubsName.includes(product.name));

  const totalSelectedSubs = selectedSubs.length;
  const disabledButton = selectedSubs.length > 4 || selectedSubs.length < 1;

  const handleSelectService = (id: number) => {
    // 4개 초과 선택 시 흔들림 상태를 true로 설정
    if (selectedSubs.length >= 4 && !selectedSubs.includes(id)) {
      setIsDisabled(true);
      return;
    }

    // 흔들림 상태 초기화
    setIsDisabled(false);

    setSelectedSubs(prev =>
      prev.includes(id) ? prev.filter(subId => subId !== id) : [...prev, id],
    );
  };

  const handleAddService = () => {
    navigate(`/comparison?category=${category}`, {
      replace: true,
      state: { newSubs: selectedSubs, category },
    });
  };

  if (isLoading) {
    return (
      <MobileLayout
        headerProps={{ leftSlot: <BackButton />, centerSlot: '서비스 선택' }}
        bodyVariant="gray"
        showBottom={false}
      >
        <div className="flex flex-col items-center justify-center h-[calc(100vh-60px-80px)] space-y-2">
          <p className="typo-body-m-medium text-gray-500">불러오는 중…</p>
        </div>
      </MobileLayout>
    );
  }

  // 에러
  if (isError) {
    return (
      <MobileLayout
        headerProps={{ leftSlot: <BackButton />, centerSlot: '서비스 선택' }}
        bodyVariant="gray"
        showBottom={false}
      >
        <div className="flex flex-col items-center justify-center h-[calc(100vh-60px-80px)] space-y-2">
          <p className="typo-body-m-bold text-gray-700">문제가 발생했어요</p>
          <p className="typo-body-m-medium text-gray-500">잠시 후 다시 시도해주세요.</p>
        </div>
      </MobileLayout>
    );
  }

  // 데이터가 없을 경우 (products가 null이거나 빈 배열일 때)
  if (products?.length === 0) {
    return (
      <MobileLayout
        headerProps={{ leftSlot: <BackButton />, centerSlot: '서비스 선택' }}
        bodyVariant="gray"
        showBottom={false}
      >
        <div className="flex flex-col items-center justify-center h-[calc(100vh-60px-80px)] space-y-2">
          <p className="typo-body-m-bold text-gray-700">등록된 서비스가 없어요</p>
          <p className="typo-body-m-medium text-gray-500">나중에 다시 방문해주세요!</p>
        </div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout
      headerProps={{ leftSlot: <BackButton />, centerSlot: '서비스 선택' }}
      bodyVariant="gray"
      showBottom={false}
    >
      {products && (
        <>
          <main className="py-8 space-y-4 pb-[100px]">
            {products.map(p => (
              <ComparisonAddCard
                key={p.productId}
                serviceName={p.name}
                imageUrl={p.imageUrl}
                minPrice={p.minPrice}
                maxPrice={p.maxPrice}
                isSelected={selectedSubs.includes(p.productId)}
                setIsSelected={() => handleSelectService(p.productId)}
              />
            ))}
          </main>

          <footer className="w-full m-auto max-w-md fixed-bottom-safe fixed bottom-0 left-0 right-0 px-5">
            <Button
              variant="primary-fill"
              title={
                <>
                  {totalSelectedSubs < 1 ? (
                    '서비스를 선택하세요 (최대 4개 가능)'
                  ) : (
                    <span>
                      비교할 서비스 추가 (
                      <strong className="typo-body-m-bold">{totalSelectedSubs}/4</strong>)
                    </span>
                  )}
                </>
              }
              // title={selectButtonTitle}
              disabled={disabledButton}
              onClick={handleAddService}
              isShaking={isDisabled}
            />
          </footer>
        </>
      )}
    </MobileLayout>
  );
};
