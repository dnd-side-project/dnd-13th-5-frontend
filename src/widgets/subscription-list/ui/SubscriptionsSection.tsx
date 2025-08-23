import { useMemo, useState } from 'react';

import type { CategoryParam, SortParam, Subscription } from '@/entities/subscription/model/types';
import { Icons } from '@/shared/assets/icons';
import { formatKRW } from '@/shared/lib/format';
import { ChipGroup, ChipItem } from '@/shared/ui/category';
import { ContentsCard } from '@/shared/ui/contents-card';
import { Filter } from '@/shared/ui/filter';
import { Tag } from '@/shared/ui/tag';

// Filter 컴포넌트에 맞는 형식으로 변경
const SORT_FILTER_OPTIONS = [
  { key: 'NAME', label: '이름순' },
  { key: 'PRICE', label: '가격순' },
  { key: 'DUESOON', label: '결제임박순' },
  { key: 'OLDESTFIRST', label: '오래된순' },
];

const CAT_OPTIONS = [
  { key: 'all', label: '전체' },
  { key: 'OTT', label: 'OTT' },
  { key: 'SHOPPING', label: '쇼핑' },
  { key: 'MUSIC', label: '음악' },
  { key: 'CLOUD', label: '클라우드' },
  { key: 'AI', label: 'AI' },
  { key: 'PRODUCTIVITY', label: '생산성' },
  { key: 'EDUCATION', label: '교육' },
  { key: 'DELIVERY', label: '배달' },
];

const Row = ({ item }: { item: Subscription }) => {
  const left = (
    <div className="gap-3 flex">
      <img
        src={item.imageUrl}
        alt=""
        loading="lazy"
        aria-hidden
        className="size-[54px] rounded-xl object-cover"
      />
      <div className="min-w-0">
        <div className="flex flex-col items-start gap-1">
          <Tag appearance="outline" color="red" className="py-[2px]">
            {item.category}
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
          {item.paymentDate && <p className="text-secondary-300">매월</p>}
          <p className="">{item.paymentDate}</p>
        </div>
      </div>
      <button
        type="button"
        aria-label="즐겨찾기"
        aria-pressed={item.isFavorites}
        className="rounded-full flex h-full mt-1 align-top focus-visible:ring-2 focus-visible:ring-emerald-500/40"
        onClick={e => {
          e.stopPropagation();
          // TODO: optimistic toggleStar(item.id)
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
      // interactive onClick={() => navigate(`/subscriptions/${item.id}`)}
    />
  );
};

export const SubscriptionsSection = () => {
  // 탭/필터 로컬 상태 (URL은 변경하지 않음)
  const [tab, setTab] = useState<'ALL' | 'FAVORITES'>('ALL');
  const [category, setCategory] = useState<CategoryParam>('all');
  const [sort, setSort] = useState<SortParam>('NAME');

  // const { data, isLoading } = useMySubscriptions(category, sort);

  const handleCategoryChange = (value: string | null) => {
    setCategory((value ?? 'all') as CategoryParam);
  };

  const data = {
    userName: '예시',
    list: [
      {
        id: 1,
        name: '네이버 멤버쉽',
        category: '쇼핑', // categoryLabel → category
        paymentDate: 2, // paymentText → paymentDate
        price: 14900,
        isFavorites: true, // starred → isFavorites
        // iconUrl → imageUrl
        imageUrl:
          'https://play-lh.googleusercontent.com/Op4pmx0D5G5dhIc-nhkGp6aCSVfGowkbXmikOpaXasG81KWi-icLi9DvoOGItOL2agE',
      },
      {
        id: 1,
        name: '네이버 멤버쉽fas',
        category: '쇼핑', // categoryLabel → category
        // paymentDate: 2, // paymentText → paymentDate
        price: 14900,
        isFavorites: false, // starred → isFavorites
        // iconUrl → imageUrl
        imageUrl:
          'https://play-lh.googleusercontent.com/Op4pmx0D5G5dhIc-nhkGp6aCSVfGowkbXmikOpaXasG81KWi-icLi9DvoOGItOL2agE',
      },
      {
        id: 1,
        name: '네이버 멤버쉽',
        category: '쇼핑', // categoryLabel → category
        paymentDate: 2, // paymentText → paymentDate
        price: 14900,
        isFavorites: true, // starred → isFavorites
        // iconUrl → imageUrl
        imageUrl:
          'https://play-lh.googleusercontent.com/Op4pmx0D5G5dhIc-nhkGp6aCSVfGowkbXmikOpaXasG81KWi-icLi9DvoOGItOL2agE',
      },
    ],
  };
  const isLoading = false;

  const list: Subscription[] = useMemo(() => {
    if (!data) return [];
    return tab === 'ALL' ? data.list : data.list.filter(s => s.isFavorites);
  }, [data, tab]);

  return (
    <section aria-label="내 구독 목록">
      {/* 탭(전체/즐겨찾기) — radiogroup 시맨틱 */}
      <div role="radiogroup" aria-label="보기 선택" className="flex gap-3 py-3 px-5 bg-white">
        {(['ALL', 'FAVORITES'] as const).map(t => (
          <button
            key={t}
            role="radio"
            aria-checked={tab === t}
            onClick={() => setTab(t)}
            className={` ${tab === t ? 'text-gray-800' : 'text-gray-500'}`}
          >
            {t === 'ALL' ? '전체' : '즐겨찾기'}
          </button>
        ))}
      </div>
      <div className="flex flex-col py-5 gap-4 px-5 bg-gray-50">
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
              <ChipItem key={c.key ?? 'all'} value={c.key ?? 'all'} color="default">
                {c.label}
              </ChipItem>
            ))}
          </ChipGroup>
        </div>

        {/* 리스트 */}
        <div className="flex flex-col gap-3">
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
