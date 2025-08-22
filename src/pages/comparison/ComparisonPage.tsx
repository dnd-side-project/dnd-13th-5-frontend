import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import type { Product } from '@/entities/comparison/model/types';
import type { CategoryParam, Subscription } from '@/entities/subscription/model/types';
import { Icons } from '@/shared/assets/icons';
import { ROUTES } from '@/shared/config/routes';
import { cn } from '@/shared/lib';
import { scrollToTop } from '@/shared/lib/scroll';
import { Button } from '@/shared/ui/button';
import AlarmButton from '@/shared/ui/button/AlarmButton';
import { ChipGroup, ChipItem } from '@/shared/ui/category';
import { Icon } from '@/shared/ui/icon';
import { MobileLayout } from '@/shared/ui/layout';
import ComparisonAddSection from '@/widgets/comparison-section/ui/ComparisonAddSection';
import { ComparisonMySubSection } from '@/widgets/comparison-section/ui/ComparisonMySubSection';
import ComparisonResultSection from '@/widgets/comparison-section/ui/ComparisonResultSection';
import RecommendSubSection from '@/widgets/comparison-section/ui/RecommendSubSection';

const CAT_OPTIONS = [
  { key: 'OTT', label: 'OTT' },
  { key: 'SHOPPING', label: '쇼핑' },
  { key: 'MUSIC', label: '음악' },
  { key: 'CLOUD', label: '클라우드' },
  { key: 'AI', label: 'AI' },
  { key: 'PRODUCTIVITY', label: '생산성' },
  { key: 'EDUCATION', label: '교육' },
  { key: 'DELIVERY', label: '배달' },
];

// 전체 서비스 더미 데이터
export const ALL_SERVICES: Product[] = [
  {
    id: 1,
    name: '넷플릭스',
    category: 'OTT',
    imageUrl:
      'https://images.ctfassets.net/4cd45et68cgf/Rx83JoRDMkYNlMC9MKzcB/2b14d5a59fc3937afd3f03191e19502d/Netflix-Symbol.png?w=700&h=456',
    minPrice: 15500,
    maxPrice: 24900,
  },
  {
    id: 2,
    name: '쿠팡',
    category: 'SHOPPING',
    imageUrl:
      'https://play-lh.googleusercontent.com/X5-X2S0t7G9dTGrPftk-5hXijqRDhwWKxGDs2gBm_kNPcAlO3re4exC_8nekvDhz-H0',
    minPrice: 15500,
    maxPrice: null,
  },
  {
    id: 3,
    name: '웨이브',
    category: 'OTT',
    imageUrl:
      'https://play-lh.googleusercontent.com/7cuI7bdCeZbmc9anRXqpmxZPH92t5NEEbhTnj5by6skhZK_dlUg9kx--gqtLf-8c2K12',
    minPrice: 15500,
    maxPrice: 24900,
  },
  {
    id: 4,
    name: '디즈니+',
    category: 'OTT',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Disney_plus_icon.png',
    minPrice: 15500,
    maxPrice: null,
  },
];

const mySubs: Omit<Subscription, 'isFavorites'>[] = [
  {
    id: 5,
    name: '넷플릭스',
    category: 'OTT',
    imageUrl:
      'https://images.ctfassets.net/4cd45et68cgf/Rx83JoRDMkYNlMC9MKzcB/2b14d5a59fc3937afd3f03191e19502d/Netflix-Symbol.png?w=700&h=456',
    price: 15500,
  },
  {
    id: 6,
    name: '네이버 멤버십',
    category: 'SHOPPING',
    imageUrl:
      'https://i.namu.wiki/i/cGNgd9SXcSZZWhnspHt9K4phfEYUwAxXbYGKU4Urx0w34JHgWwhvZquwEWGvOb430zg-eCohFyC6we2URt4DMA.svg',
    price: 15500,
  },
];

export const ComparisonPage = () => {
  // 내가 구독 중인 서비스 & 모든 서비스 가져오기
  // const mySubs = getMySubscriptions();
  // const allSubs = getSubscriptions();

  const navigate = useNavigate();
  const location = useLocation();
  const [category, setCategory] = useState<CategoryParam>('OTT');
  const [selectedSubs, setSelectedSubs] = useState<number[]>([]);
  const [addedSubs, setAddedSubs] = useState<typeof ALL_SERVICES>([]);
  const [showResult, setShowResult] = useState<boolean>(false);

  const currentCategoryLabel = CAT_OPTIONS.find(opt => opt.key === category)?.label || null;

  // 내가 구독 중인 서비스
  const filteredMySubsByCategory = mySubs.filter(service => service.category === category);
  // 추가한 서비스
  const filteredAddedSubsByCategory = addedSubs.filter(service => service.category === category);

  const totalSelectedSubs = selectedSubs.length;
  const disabledCompareButton = totalSelectedSubs > 4 || totalSelectedSubs < 2;
  const compareButtonTitle = `${totalSelectedSubs < 1 ? '서비스 비교하기 (2개 이상 선택하기)' : `서비스 비교하기 (${totalSelectedSubs}/4)`}`;

  // 추가한 구독 서비스 업데이트
  useEffect(() => {
    const { newSubs, category: categoryFromstate } = location.state || {};

    if (newSubs) {
      const newAddedServices = ALL_SERVICES.filter(service => newSubs.includes(service.id));
      setAddedSubs(newAddedServices);
    }

    if (categoryFromstate) {
      setCategory(categoryFromstate as CategoryParam);
    }

    if (newSubs || categoryFromstate) {
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleCategoryChange = (value: string | null) => {
    setCategory(value as CategoryParam);
    setSelectedSubs([]);
  };

  const handleSelectSub = (id: number) => {
    setSelectedSubs(prev =>
      prev.includes(id) ? prev.filter(subId => subId !== id) : [...prev, id],
    );
  };

  // 구독 자세히 보기 버튼
  // TODO: 서비스 혜택 페이지로 이동 수정 필요
  const handleShowSubBenefitDetailPage = (id: number) => {
    navigate(`/subscriptions/${id}`);
  };

  //  카테고리에 해당하는 서비스 목록 페이지로 이동
  const handleAddComparisonPage = () => {
    if (category) {
      navigate(`${ROUTES.COMPARISON_ADD}?category=${category}`);
    }
  };

  const handleDeleteSubs = () => {
    const selectedIdsInCurrentCategory = filteredAddedSubsByCategory
      .filter(service => selectedSubs.includes(service.id))
      .map(service => service.id);

    const updatedAddedSubs = addedSubs.filter(
      service => !selectedIdsInCurrentCategory.includes(service.id),
    );

    setAddedSubs(updatedAddedSubs);
    setSelectedSubs([]);
  };

  const handleShowResultButton = () => {
    setShowResult(true);
  };

  return (
    <MobileLayout
      headerProps={{
        centerSlot: '비교하기',
        rightSlot: <AlarmButton />,
      }}
    >
      <nav aria-label="카테고리 선택" className="mb-2">
        {/* 카테고리 */}
        <ChipGroup value={category} onValueChange={handleCategoryChange} className="gap-3 py-2">
          {CAT_OPTIONS.map(option => (
            <ChipItem key={option.key} value={option.key} color="red">
              {option.label}
            </ChipItem>
          ))}
        </ChipGroup>
      </nav>

      <main className="mb-8">
        <header className="flex items-center gap-4 py-[10px] mb-[18px]">
          <h1 className="typo-title-l-bold">비교하기</h1>
          <span className="typo-body-m-medium">최대 4개까지 선택 가능해요</span>
        </header>

        {/* 내가 구독 중인 서비스 섹션 */}
        <section aria-labelledby="my-subs">
          {filteredMySubsByCategory.length > 0 && (
            <ComparisonMySubSection
              category={currentCategoryLabel}
              mySubs={filteredMySubsByCategory}
              selectedSubs={selectedSubs}
              handleSelect={handleSelectSub}
              handleDetail={handleShowSubBenefitDetailPage}
            />
          )}
        </section>

        {/* 비교할 서비스 추가하기 섹션 */}
        <section aria-labelledby="added-subs">
          <ComparisonAddSection
            category={currentCategoryLabel}
            addedSubs={filteredAddedSubsByCategory}
            selectedSubs={selectedSubs}
            handleSelect={handleSelectSub}
            handleDetail={handleShowSubBenefitDetailPage}
            handleAdd={handleAddComparisonPage}
            handleDelete={handleDeleteSubs}
          />
        </section>

        {/* 비교하기 버튼 */}
        <div className="pt-2">
          <Button
            variant="primary-fill"
            title={compareButtonTitle}
            disabled={disabledCompareButton}
            onClick={handleShowResultButton}
          ></Button>
        </div>
      </main>

      {/* 비교하기 결과 섹션 */}
      {showResult && (
        <section
          aria-labelledby="comparison-result"
          className={cn('bg-gray-50 mb-10 h-[600px]', '-mx-5')}
        >
          <ComparisonResultSection />
        </section>
      )}

      {/* 맨 위로 스크롤되는 버튼 */}
      {showResult && (
        <button
          onClick={scrollToTop}
          className="mb-10 typo-body-m-bold flex items-center justify-center w-full gap-[10px] hover:-translate-y-1 transition-transform duration-300 ease-out"
        >
          <Icon component={Icons.DoubleUp} />
          위로 가기
        </button>
      )}

      {/* 추천 서비스 섹션 */}
      <section aria-labelledby="recommend-subs" className="mb-14">
        <RecommendSubSection />
      </section>
    </MobileLayout>
  );
};
