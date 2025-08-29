import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import type { SubscriptionService } from '@/entities/subscription/api/fetchMySubscription';
import { useMySubscription } from '@/entities/subscription/hook/useMySubscription';
import { useToggleFavorite } from '@/entities/subscription/hook/useToggleFavorite';
import { CATEGORY_FALLBACK, CATEGORY_META } from '@/entities/subscription/model/category.meta';
import type { SortParam } from '@/entities/subscription/model/types';
import { Icons } from '@/shared/assets/icons';
import { CategoryImages } from '@/shared/assets/images';
import { formatKRW } from '@/shared/lib/format';
import type { CategoryOption } from '@/shared/types/category.types';
import { ChipGroup, ChipItem } from '@/shared/ui/category';
import { ContentsCard } from '@/shared/ui/contents-card';
import { Filter } from '@/shared/ui/filter';
import { Tag } from '@/shared/ui/tag';

// Filter 컴포넌트에 맞는 형식으로 변경
const SORT_FILTER_OPTIONS = [
  { key: 'NAME', label: '이름순' },
  { key: 'CHEAPEST', label: '가격순' },
  { key: 'DUESOON', label: '결제임박순' },
  { key: 'OLDESTFIRST', label: '오래된순' },
];

const CAT_OPTIONS = [
  { key: 'ALL', label: '전체' },
  { key: 'OTT', label: 'OTT' },
  { key: 'SHOPPING', label: '쇼핑' },
  { key: 'MUSIC', label: '음악' },
  { key: 'CLOUD', label: '클라우드' },
  { key: 'AI', label: 'AI' },
  // { key: 'PRODUCTIVITY', label: '생산성' },
  // { key: 'EDUCATION', label: '교육' },
  { key: 'DELIVERY', label: '배달' },
];

const Row = ({ item }: { item: SubscriptionService }) => {
  const toggleFavoriteMutation = useToggleFavorite();
  const [imageError, setImageError] = useState(false);

  const navigate = useNavigate();

  // 카테고리별 fallback 이미지 결정
  const getFallbackImage = () => {
    if (item.category && CATEGORY_META[item.category]) {
      return CATEGORY_META[item.category].iconUrl;
    }
    return CategoryImages.Default;
  };

  const shouldShowFallback = !item.imageUrl || imageError;
  const fallbackImageUrl = getFallbackImage();

  const left = (
    <div className="gap-3 flex">
      {shouldShowFallback ? (
        <img
          src={fallbackImageUrl}
          alt={`${item.category ? CATEGORY_META[item.category]?.label || item.category : '기타'} 카테고리 아이콘`}
          loading="lazy"
          className="size-[54px] rounded-xl object-cover"
        />
      ) : (
        <img
          src={item.imageUrl}
          alt=""
          loading="lazy"
          aria-hidden
          className="size-[54px] rounded-xl object-cover"
          onError={() => setImageError(true)}
        />
      )}
      <div className="min-w-0">
        <div className="flex flex-col items-start gap-1">
          <Tag appearance="outline" color="red" className="py-[2px]">
            {item.category
              ? CATEGORY_META[item.category]?.label || CATEGORY_FALLBACK(item.category).label
              : '기타'}
          </Tag>
          <p className="typo-body-m-bold truncate">{item.name}</p>
        </div>
      </div>
    </div>
  );

  const right = (
    <div className="flex items-stretch gap-3">
      <div className="flex flex-col items-end">
        <p className="typo-title-m-bold">{formatKRW(item.price)}</p>
        <div className="flex items-center gap-1 typo-body-s-medium">
          <p className="text-secondary-300">
            {{
              WEEK: '매주',
              MONTH: '매월',
              YEAR: '매년',
            }[item.payCycleUnit] ?? ''}
          </p>
          {item.startedAt && (
            <p>
              {(() => {
                const date = new Date(item.startedAt);
                const month = date.getMonth() + 1;
                const day = date.getDate();

                if (item.payCycleUnit === 'MONTH') {
                  return `${day}일`;
                }
                if (item.payCycleUnit === 'YEAR') {
                  return `${month}월 ${day}일`;
                }
                return ''; // WEEK는 날짜 표시 안함
              })()}
            </p>
          )}
        </div>
      </div>
      <button
        type="button"
        aria-label="즐겨찾기"
        aria-pressed={item.isFavorites}
        className="rounded-full flex h-full mt-1 align-top focus-visible:ring-2 focus-visible:ring-emerald-500/40"
        onClick={e => {
          e.stopPropagation();
          toggleFavoriteMutation.mutate(item.id, {
            onSuccess: () => {
              if (!item.isFavorites) {
                toast.message('즐겨찾기에 추가되었습니다');
              }
            },
          });
        }}
        title="즐겨찾기"
      >
        {item.isFavorites ? (
          <Icons.FilledStar className="h-[18px] w-[18px]" />
        ) : (
          <Icons.Star className="h-[18px] w-[18px]" />
        )}
      </button>
    </div>
  );

  return (
    <ContentsCard
      left={left}
      right={right}
      className="rounded-xl bg-white"
      interactive
      onClick={() => navigate(`/subscriptions/${item.id}`)}
    />
  );
};

export const SubscriptionsSection = () => {
  // 탭/필터 로컬 상태 (URL은 변경하지 않음)
  const [tab, setTab] = useState<'ALL' | 'FAVORITES'>('ALL');
  const [category, setCategory] = useState<'ALL' | CategoryOption>('ALL');
  const [sort, setSort] = useState<SortParam>('NAME');

  // 'ALL'을 null로 변환하여 API 호출
  const apiCategory = category === 'ALL' ? null : category;

  const { data, isLoading } = useMySubscription({
    category: apiCategory,
    sort,
  });

  const handleCategoryChange = (value: string | null) => {
    setCategory((value ?? 'ALL') as 'ALL' | CategoryOption);
  };

  const list: SubscriptionService[] = useMemo(() => {
    if (!data?.services) return [];
    return tab === 'ALL' ? data.services : data.services.filter(s => s.isFavorites);
  }, [data, tab]);

  return (
    <section aria-label="내 구독 목록" className="h-full">
      {/* 탭(전체/즐겨찾기) — radiogroup 시맨틱 */}
      <div
        role="radiogroup"
        aria-label="보기 선택"
        className="flex gap-3 py-3 bg-white rounded-b-3xl -mx-5 px-5"
      >
        {(['ALL', 'FAVORITES'] as const).map(t => (
          <button
            key={t}
            role="radio"
            aria-checked={tab === t}
            onClick={() => setTab(t)}
            className={tab === t ? 'text-gray-800' : 'text-gray-500'}
          >
            {t === 'ALL' ? '전체' : '즐겨찾기'}
          </button>
        ))}
      </div>
      <div className="flex flex-col py-5 gap-4 bg-gray-50 h-full -mx-5 px-5">
        {/* 정렬 + 카테고리 (Filter 컴포넌트 적용) */}
        <div className="flex items-center gap-2">
          <Filter
            label="정렬"
            items={SORT_FILTER_OPTIONS}
            initialValue={sort}
            onSelect={v => setSort(v as SortParam)}
          />
          <ChipGroup value={category} onValueChange={handleCategoryChange}>
            {CAT_OPTIONS.map(c => (
              <ChipItem key={c.key} value={c.key} color="default">
                {c.label}
              </ChipItem>
            ))}
          </ChipGroup>
        </div>

        {/* 리스트 */}
        <div className="flex flex-col gap-3 pb-10">
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-[88px] rounded-2xl bg-gray-100" />
              ))
            : list.map(item => <Row key={item.id} item={item} />)}
          {!isLoading && list.length === 0 && (
            <p className="py-8 text-center text-gray-500">조건에 맞는 구독이 없어요.</p>
          )}
        </div>
      </div>
    </section>
  );
};
