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
  const { data } = useProducts(category);

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

  return (
    <MobileLayout
      headerProps={{ leftSlot: <BackButton />, centerSlot: '서비스 선택' }}
      bodyVariant="gray"
      showBottom={false}
    >
      {data && (
        <>
          <main className="py-8 space-y-4 pb-[100px]">
            {data.map(p => (
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
