// src/features/subscription-register/step2-service/StepService.tsx
import { useEffect, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

import { useProducts } from '@/entities/product/hooks/useProducts';
import { CATEGORY_META } from '@/entities/subscription/model/category.meta';
import type { RegisterForm } from '@/entities/subscription/model/register.types';
import type { CategoryOption } from '@/shared/types/category.types';
import { Button } from '@/shared/ui/button';
import { SelectableCard } from '@/shared/ui/selectable-card';

const NONE_ID = 0; // 직접 입력 분기

type _ApiResp = {
  status: number;
  code: string;
  message: string;
  data: {
    products: Array<{ id: number; name: string; imageUrl: string }>;
  };
};

export const StepService = ({ onPrev, onNext }: { onPrev: () => void; onNext: () => void }) => {
  const { setValue, watch } = useFormContext<RegisterForm>();
  const categoryName = watch('categoryName') as CategoryOption;

  const {
    data: productData,
    isLoading: productLoading,
    isError: productError,
  } = useProducts(categoryName || null);

  const productId = watch('productId');

  // 카테고리 변경 → 목록 로딩
  useEffect(() => {
    if (!categoryName) {
      return;
    }

    // 카테고리 바뀌면 이전 선택한 서비스 초기화
    setValue('productId', undefined, { shouldDirty: true });
    setValue('customProductName', null, { shouldDirty: true });
    setValue('productName', null, { shouldDirty: true });
    setValue('productImgUrl', null, { shouldDirty: true });
  }, [categoryName, setValue]);

  // 헤더에 현재 카테고리명 표시(선택 사항)
  const categoryLabel = useMemo(
    () => (categoryName ? (CATEGORY_META[categoryName]?.label ?? '') : ''),
    [categoryName],
  );

  if (productLoading) {
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

  if (productError) {
    return (
      <section className="space-y-4">
        <header>
          <p className="typo-title-m-bold">어떤 서비스를 구독 중이신가요?</p>
          <p className="typo-body-s-medium text-gray-500">{categoryLabel} 카테고리</p>
        </header>
        <p className="text-red-600">서비스를 불러오는 중 오류가 발생했습니다.</p>
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
        {productData?.map(s => (
          <SelectableCard
            key={s.productId}
            selected={productId === s.productId}
            onSelect={() => {
              setValue('productId', s.productId, { shouldDirty: true });
              setValue('customProductName', null, { shouldDirty: true });
              setValue('productName', s.name, { shouldDirty: true });
              setValue('productImgUrl', s.imageUrl, { shouldDirty: true });
            }}
          >
            <img src={s.imageUrl} alt="" aria-hidden className="mx-auto size-10 rounded-xl" />
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
