import type { ReactNode } from 'react';

import { cn } from '@/shared/lib/utils';

type Props = {
  selected?: boolean;
  onSelect?: () => void;
  children: ReactNode;
  className?: string;
};
export const SelectableCard = ({ selected, onSelect, children, className }: Props) => (
  <button
    type="button"
    role="radio"
    aria-checked={selected}
    onClick={onSelect}
    className={cn(
      'w-full rounded-2xl border bg-white px-5 py-4 text-center transition-colors',
      selected ? 'border-primary-700 ring-1 ring-primary-700' : 'border-gray-100',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/30',
      className,
    )}
  >
    {children}
  </button>
);
