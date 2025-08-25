// src/features/subscription-register/step2-service/StepService.tsx
import { useEffect, useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { CATEGORY_META } from '@/entities/subscription/model/category.meta';
import type { RegisterForm, ServiceOption } from '@/entities/subscription/model/register.types';
import { Button } from '@/shared/ui/button';
import { SelectableCard } from '@/shared/ui/selectable-card';

const NONE_ID = 0; // 직접 입력 분기

type ApiResp = {
  status: number;
  code: string;
  message: string;
  data: {
    products: Array<{ id: number; name: string; imageUrl: string }>;
  };
};

/** 임시 더미: 카테고리별 서비스 목록 */
const DUMMY_BY_CATEGORY: Record<number, ServiceOption[]> = {
  1: [
    { id: 101, name: '넷플릭스', iconUrl: '/assets/netflix.png' },
    { id: 102, name: '디즈니+', iconUrl: '/assets/disney.png' },
    { id: 103, name: '웨이브', iconUrl: '/assets/wavve.png' },
    { id: 104, name: '티빙', iconUrl: '/assets/tving.png' },
  ],
  2: [
    { id: 201, name: '쿠팡 와우', iconUrl: '/assets/coupang.png' },
    { id: 202, name: '네이버플러스', iconUrl: '/assets/naverplus.png' },
  ],
  // ...필요시 추가
};

export const StepService = ({ onPrev, onNext }: { onPrev: () => void; onNext: () => void }) => {
  const { setValue, watch } = useFormContext<RegisterForm>();
  const categoryId = watch('categoryId');
  const productId = watch('productId');

  const [options, setOptions] = useState<ServiceOption[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  // 카테고리 변경 → 목록 로딩
  useEffect(() => {
    if (!categoryId) {
      setOptions([]);
      setLoading(false);
      return;
    }

    // 카테고리 바뀌면 이전 선택한 서비스 초기화
    setValue('productId', undefined, { shouldDirty: true });
    setValue('customProductName', null, { shouldDirty: true });

    // ---- (현재) 더미 데이터 사용 ----
    setLoading(true);
    setErr(null);
    setOptions(DUMMY_BY_CATEGORY[categoryId] ?? []);
    setLoading(false);

    // ---- (추후) 실제 API 호출 ----
  }, [categoryId, setValue]);

  // 헤더에 현재 카테고리명 표시(선택 사항)
  const categoryLabel = useMemo(
    () => Object.values(CATEGORY_META).find(m => m.id === categoryId)?.label ?? '',
    [categoryId],
  );

  if (loading) {
    return (
      <section className="space-y-4">
        <header>
          <p className="typo-title-m-bold">어떤 서비스를 구독 중이신가요?</p>
          <p className="typo-body-s-medium text-gray-500">{categoryLabel} 카테고리</p>
        </header>
        <div className="grid grid-cols-2 gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-28 rounded-2xl bg-gray-100 animate-pulse" />
          ))}
        </div>
      </section>
    );
  }

  if (err) {
    return (
      <section className="space-y-4">
        <header>
          <p className="typo-title-m-bold">어떤 서비스를 구독 중이신가요?</p>
          <p className="typo-body-s-medium text-gray-500">{categoryLabel} 카테고리</p>
        </header>
        <p className="text-red-600">{err}</p>
        <div className="mt-4">
          <button type="button" onClick={onPrev} className="rounded-2xl border py-3 px-4">
            이전
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-4">
      <header>
        <p className="typo-title-l-bold">어떤 서비스를 구독 중이신가요?</p>
        <p className="typo-title-l-bold">해당하는 서비스를 선택해주세요.</p>
      </header>

      <div role="radiogroup" className="grid grid-cols-2 gap-3">
        {(options ?? []).map(s => (
          <SelectableCard
            key={s.id}
            selected={productId === s.id}
            onSelect={() => {
              setValue('productId', s.id, { shouldDirty: true });
              setValue('customProductName', null, { shouldDirty: true });
            }}
          >
            <img src={s.iconUrl} alt="" aria-hidden className="mx-auto size-10 rounded-xl" />
            <span className="typo-body-s-bold">{s.name}</span>
          </SelectableCard>
        ))}

        {/* 직접 입력(없어요) 카드 */}
        <SelectableCard
          selected={productId === NONE_ID}
          onSelect={() => setValue('productId', NONE_ID, { shouldDirty: true })}
        >
          <div className="text-center typo-body-s-bold py-2.5">
            구독 중인 <br />
            서비스가 없어요.
          </div>
        </SelectableCard>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <Button variant="primary-stroke" onClick={onPrev} title="이전" />
        <Button
          variant="primary-fill"
          onClick={onNext}
          disabled={productId === undefined}
          title="다음"
        />
      </div>
    </section>
  );
};
