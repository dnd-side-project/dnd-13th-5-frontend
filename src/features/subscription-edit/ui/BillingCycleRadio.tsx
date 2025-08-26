// features/subscription-edit/ui/BillingCycleRadio.tsx
import type { BillingCycleOption } from '@/entities/subscription/model/edit.types';
import { PayUnit } from '@/entities/subscription/model/register.types';
import { cn } from '@/shared/lib';

type Props = {
  name: string;
  value: PayUnit;
  onChange: (v: PayUnit) => void;
  options: BillingCycleOption[];
};

export const BillingCycleRadio = ({ name, value, onChange, options }: Props) => (
  <fieldset>
    <legend className="mb-2 typo-title-s-bold">결제 주기</legend>
    <div role="radiogroup" className="grid grid-cols-3 gap-2">
      {options.map(opt => (
        <label key={opt.value} className="inline-flex">
          <input
            type="radio"
            name={name}
            value={opt.value}
            checked={value === opt.value}
            onChange={() => onChange(opt.value)}
            className="sr-only"
          />
          <span
            className={cn(
              'w-full rounded-xl border px-4 py-2 text-center',
              value === opt.value
                ? 'border-primary-700 text-primary-700'
                : 'border-gray-100 text-gray-800',
            )}
          >
            {opt.label}
          </span>
        </label>
      ))}
    </div>
  </fieldset>
);
