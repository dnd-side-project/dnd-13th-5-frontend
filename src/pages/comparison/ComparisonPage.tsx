import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// import { MY_SUBS } from '@/entities/comparison/constants/Products';
import type { Products } from '@/entities/product/api/fetchProducts';
import { useProducts } from '@/entities/product/hooks/useProducts';
import { CATEGORY_META } from '@/entities/subscription/model/category.meta';
import { Icons } from '@/shared/assets/icons';
import { ROUTES } from '@/shared/config/routes';
import { cn } from '@/shared/lib';
import { scrollToTop } from '@/shared/lib/scroll';
import type { CategoryParam } from '@/shared/types/category.types';
import { Button } from '@/shared/ui/button';
import AlarmButton from '@/shared/ui/button/AlarmButton';
import { ChipGroup, ChipItem } from '@/shared/ui/category';
import { Icon } from '@/shared/ui/icon';
import { MobileLayout } from '@/shared/ui/layout';
import ComparisonAddedSection from '@/widgets/comparison-section/ui/ComparisonAddedSection';
import ComparisonResultSection from '@/widgets/comparison-section/ui/ComparisonResultSection';
import RecommendSubSection from '@/widgets/comparison-section/ui/RecommendSubSection';

const CAT_KEYS = Object.keys(CATEGORY_META) as (keyof typeof CATEGORY_META)[];

export const ComparisonPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state || {};
  const queryParams = useMemo(() => new URLSearchParams(location.search), [location.search]);

  const initialCategory = (queryParams.get('category') as CategoryParam) || CAT_KEYS[0];
  const [category, setCategory] = useState<CategoryParam>(initialCategory);
  const [selectedSubs, setSelectedSubs] = useState<number[]>(state.selectedSubs || []);
  const [addedSubs, setAddedSubs] = useState<Products[]>(state.addedSubs || []);
  const [resultSubs, setResultSubs] = useState<number[]>(state.resultSubs || []);

  const resultRef = useRef<HTMLDivElement | null>(null);
  const currentCategoryLabel = CATEGORY_META[category]?.label ?? null;

  const { data: products } = useProducts(category);

  /** --- 쿼리 파라미터 없는 경우 초기 카테고리 적용 --- * */
  useEffect(() => {
    if (!queryParams.get('category')) {
      navigate(`${location.pathname}?category=${CAT_KEYS[0]}`, { replace: true });
    }
  }, [location.pathname, navigate, queryParams]);

  /** --- category 동기화 --- */
  useEffect(() => {
    const newCategory = queryParams.get('category') as CategoryParam;
    if (newCategory && newCategory !== category) {
      setCategory(newCategory);
      setAddedSubs([]);
      setSelectedSubs([]);
      setResultSubs([]);
    }
  }, [queryParams, category]);

  /** --- 뒤로가기/상세 페이지 복귀 시 상태 복원 --- */
  useEffect(() => {
    if (state.newSubs && products) {
      const newAdded = products.filter(p => state.newSubs?.includes(p.productId));
      setAddedSubs(prev => Array.from(new Set([...prev, ...newAdded])));
      window.history.replaceState({}, document.title, location.pathname);
    }
    if (state.detailAddedSubs) {
      setAddedSubs(state.detailAddedSubs);
      window.history.replaceState({}, document.title, location.pathname);
    }
  }, [state, products, location.pathname]);

  const handleCategoryChange = (value: string | null) => {
    setCategory(value as CategoryParam);
    setAddedSubs([]);
    setResultSubs([]);
    navigate(`${location.pathname}?category=${value}`, { replace: true });
  };

  const handleSelectSub = (id: number) => {
    setSelectedSubs(prev =>
      prev.includes(id) ? prev.filter(subId => subId !== id) : [...prev, id],
    );
  };
  const handleAddPage = () => category && navigate(`${ROUTES.COMPARISON_ADD}?category=${category}`);

  const handleDeleteSubs = () => {
    const filteredIds = addedSubs
      .filter(s => selectedSubs.includes(s.productId))
      .map(s => s.productId);
    setAddedSubs(prev => prev.filter(s => !filteredIds.includes(s.productId)));
    setSelectedSubs([]);
  };

  const handleCompare = () => setResultSubs(selectedSubs);

  const handleShowDetail = (id: number) =>
    navigate(ROUTES.SUBSCRIPTION_BENEFIT_DETAIL(id.toString()), {
      state: {
        returnTo: location.pathname + location.search,
        addedSubs,
        selectedSubs,
        category,
        resultSubs,
      },
    });

  // 비교 결과 스크롤 이동
  useEffect(() => {
    if (resultSubs.length > 0) {
      resultRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [resultSubs]);

  /** --- 버튼 상태 --- */
  const totalSelectedSubs = selectedSubs.length;
  const disabledCompareButton = totalSelectedSubs < 2 || totalSelectedSubs > 4;

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
          {CAT_KEYS.map(key => {
            const meta = CATEGORY_META[key];
            return (
              <ChipItem
                key={key}
                value={key}
                labelClassName={category === key ? 'bg-primary-700 text-white' : ''}
              >
                {meta.label}
              </ChipItem>
            );
          })}
        </ChipGroup>
      </nav>

      <main className="mb-8">
        <header className="flex items-center gap-4 py-[10px] mb-[18px]">
          <h1 className="typo-title-l-bold">비교하기</h1>
          <span className="typo-body-m-medium">최대 4개까지 선택 가능해요</span>
        </header>

        {/* 내가 구독 중인 서비스 섹션 */}
        <section aria-labelledby="my-subs">
          {/* {filteredMySubs.length > 0 && (
            <ComparisonMySubSection
              category={currentCategoryLabel}
              mySubs={filteredMySubs}
              selectedSubs={selectedSubs}
              handleSelect={handleSelectSub}
              handleDetail={handleShowDetail}
            />
          )} */}
        </section>

        {/* 비교할 서비스 추가하기 섹션 */}
        <section aria-labelledby="added-subs">
          <ComparisonAddedSection
            category={currentCategoryLabel}
            addedSubs={addedSubs}
            selectedSubs={selectedSubs}
            handleSelect={handleSelectSub}
            handleAdd={handleAddPage}
            handleDetail={handleShowDetail}
            handleDelete={handleDeleteSubs}
          />
        </section>

        {/* 비교하기 버튼 */}
        <div className="pt-2">
          <Button
            variant="primary-fill"
            title={
              <>
                {totalSelectedSubs < 1 ? (
                  '서비스 비교하기 (2개 이상 선택)'
                ) : (
                  <span>
                    서비스 비교하기 (
                    <strong className="typo-body-m-bold">{totalSelectedSubs}/4</strong>)
                  </span>
                )}
              </>
            }
            disabled={disabledCompareButton}
            onClick={handleCompare}
          ></Button>
        </div>
      </main>

      {/* 비교하기 결과 섹션 */}
      <div ref={resultRef}>
        {resultSubs.length > 1 && (
          <>
            <section
              aria-labelledby="comparison-result"
              className={cn('bg-gray-50 mb-10', '-mx-5')}
            >
              <ComparisonResultSection selectedSubs={resultSubs} handleDetail={handleShowDetail} />
            </section>
            <button
              onClick={scrollToTop}
              className="mb-10 typo-body-m-bold flex items-center justify-center w-full gap-[10px] hover:-translate-y-1 transition-transform duration-300 ease-out"
            >
              <Icon component={Icons.DoubleUp} />
              위로 가기
            </button>
          </>
        )}
      </div>

      {/* 추천 서비스 섹션 */}
      <section aria-labelledby="recommend-subs" className="mb-14">
        <RecommendSubSection category={category} handleDetail={handleShowDetail} />
      </section>
    </MobileLayout>
  );
};
