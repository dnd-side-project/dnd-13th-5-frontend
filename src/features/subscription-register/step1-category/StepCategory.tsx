// src/features/subscription-register/step1-category/StepCategory.tsx
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { CATEGORY_META } from '@/entities/subscription/model/category.meta';
import type { RegisterForm } from '@/entities/subscription/model/register.types';
import { SelectableCard } from '@/shared/ui/selectable-card';

type Option = { id: number; label: string; iconUrl: string };

type StepCategoryProps = {
  onNext: () => void;
  /** 필요시 다른 배열 순서가 있다면 주입(없으면 CATEGORY_META 선언 순서) */
};

export const StepCategory = ({ onNext }: StepCategoryProps) => {
  const { setValue, watch } = useFormContext<RegisterForm>();
  const selected = watch('categoryId');

  const [options, setOptions] = useState<Option[]>([]);

  useEffect(() => {
    // 1) 로컬 메타만 사용 (현재)
    const keys = Object.keys(CATEGORY_META) as Array<keyof typeof CATEGORY_META>;
    const local = keys.map(k => {
      const m = CATEGORY_META[k];
      return { id: m.id, label: m.label, iconUrl: m.iconUrl };
    });
    setOptions(local);

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
            key={c.id}
            selected={selected === c.id}
            onSelect={() => setValue('categoryId', c.id, { shouldDirty: true })}
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
