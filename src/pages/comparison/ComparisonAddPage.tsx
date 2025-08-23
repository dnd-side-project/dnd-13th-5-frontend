import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { ALL_SERVICES } from '@/pages/comparison/ComparisonPage';
import { Button } from '@/shared/ui/button';
import BackButton from '@/shared/ui/button/BackButton';
import { MobileLayout } from '@/shared/ui/layout';
import ComparisonAddCard from '@/widgets/comparison-card/ui/ComparisonAddCard';

export const ComparisonAddPage = () => {
  // 모든 서비스 가져오기
  // const mySubs = getMySubscriptions();
  // const allSub = getSubscriptions();

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get('category');
  const [selectedSubs, setSelectedSubs] = useState<number[]>([]);

  const totalSelectedSubs = selectedSubs.length;
  const disabledButton = selectedSubs.length > 4 || selectedSubs.length < 1;
  const selectButtonTitle = `${totalSelectedSubs < 1 ? '서비스를 선택하세요 (최대 4개 가능)' : `비교할 서비스 추가 (${totalSelectedSubs}/4)`}`;

  const filteredServicesByCategory = ALL_SERVICES.filter(service => service.category === category);

  const handleSelectService = (id: number) => {
    setSelectedSubs(prev =>
      prev.includes(id) ? prev.filter(subId => subId !== id) : [...prev, id],
    );
  };

  const handleAddService = () => {
    navigate('/comparison', { state: { newSubs: selectedSubs, category } });
  };

  return (
    <MobileLayout
      // TODO: 뒤로 가기 버튼 수정 필요
      headerProps={{ leftSlot: <BackButton />, centerSlot: '서비스 선택' }}
      bodyVariant="gray"
      showBottom={false}
    >
      <main className="py-8 space-y-4">
        {filteredServicesByCategory.map(service => (
          <ComparisonAddCard
            key={service.id}
            serviceName={service.name}
            imageUrl={service.imageUrl}
            minPrice={service.minPrice}
            maxPrice={service.maxPrice}
            isSelected={selectedSubs.includes(service.id)}
            setIsSelected={() => handleSelectService(service.id)}
          />
        ))}
      </main>

      <footer className="px-4 w-full m-auto max-w-md pb-[calc(56px+env(safe-area-inset-bottom))]">
        <Button
          variant="primary-fill"
          title={selectButtonTitle}
          disabled={disabledButton}
          onClick={handleAddService}
        />
      </footer>
    </MobileLayout>
  );
};
