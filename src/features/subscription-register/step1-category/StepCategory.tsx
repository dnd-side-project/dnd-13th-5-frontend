// src/features/subscription-register/step1-category/StepCategory.tsx
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { CATEGORY_LIST, CATEGORY_META } from '@/entities/subscription/model/category.meta';
import type { RegisterForm } from '@/entities/subscription/model/register.types';
import { SelectableCard } from '@/shared/ui/selectable-card';

type Option = { name: string; label: string; iconUrl: string };

type StepCategoryProps = {
  onNext: () => void;
};

export const StepCategory = ({ onNext }: StepCategoryProps) => {
  const { setValue, watch } = useFormContext<RegisterForm>();
  const selected = watch('categoryName');

  const [options, setOptions] = useState<Option[]>([]);

  useEffect(() => {
    // 카테고리 메타데이터를 옵션으로 변환
    const categoryOptions = CATEGORY_LIST.map(categoryName => ({
      name: categoryName,
      label: CATEGORY_META[categoryName].label,
      iconUrl: CATEGORY_META[categoryName].iconUrl,
    }));
    setOptions(categoryOptions);

    // 추후 API 붙일 자리 (참고용, 지금은 주석)
  }, []);

  return (
    <section className="space-y-4">
      <header className="typo-title-l-bold">
        구독하시는 서비스의
        <br />
        카테고리를 선택해주세요.
      </header>

      <div role="radiogroup" className="grid grid-cols-2 gap-4">
        {options.map(c => (
          <SelectableCard
            key={c.name}
            selected={selected === c.name}
            onSelect={() => setValue('categoryName', c.name, { shouldDirty: true })}
          >
            <img src={c.iconUrl} alt={c.label} aria-hidden className="mx-auto mb-1 size-10" />
            <span className="typo-body-s-bold">{c.label}</span>
          </SelectableCard>
        ))}
      </div>

      <button
        type="button"
        onClick={onNext}
        disabled={!selected}
        className="mt-6 w-full rounded-2xl bg-primary-600 py-3 text-white disabled:opacity-40"
      >
        다음
      </button>
      <div className="h-10" />
    </section>
  );
};
