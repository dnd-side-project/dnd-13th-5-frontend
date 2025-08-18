import { Slot } from '@radix-ui/react-slot';
import * as React from 'react';

import { cn } from '@/shared/lib/utils';

/** 디자인 토큰 타입 */
export type TagAppearance = 'soft' | 'outline';
export type TagColor = 'red' | 'gray' | 'black';
export type TagSize = 'sm' | 'md';

/** 공통 베이스 */
const base =
  'inline-flex w-fit shrink-0 items-center justify-center rounded-[20px] border whitespace-nowrap overflow-hidden ' +
  '[&>svg]:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black/30';

/** 사이즈 */
const sizeClass: Record<TagSize, string> = {
  sm: 'py-1 px-2 typo-label-s-small [&>svg]:size-3',
  md: 'py-1 px-3 typo-label-s-medium [&>svg]:size-4',
};

/** appearance × color 매핑 (필요 시 여기만 토큰 교체) */
const toneClass: Record<TagAppearance, Record<TagColor, string>> = {
  soft: {
    red: 'border-transparent bg-primary-50 text-primary-700',
    gray: 'border-transparent bg-gray-100 text-gray-500',
    // black은 추후 활용
    black: 'border-transparent bg-black/10 text-black',
  },
  outline: {
    red: 'bg-transparent border-primary-700 text-primary-700',
    // gray는 추후 활용
    gray: 'bg-transparent border-gray-400 text-gray-600',
    black: 'bg-transparent border-gray-800 text-gray-800',
  },
};

export type TagProps = React.ComponentProps<'span'> & {
  asChild?: boolean;
  appearance?: TagAppearance;
  color?: TagColor;
  size?: TagSize;
  disabled?: boolean;
};

export const Tag = ({ asChild, appearance = 'soft', color = 'red', size = 'md', disabled, className, ...props }: TagProps) => {
  const Comp = asChild ? Slot : 'span';
  return (
    <Comp
      data-slot="tag"
      aria-disabled={disabled ? true : undefined}
      className={cn(base, sizeClass[size], toneClass[appearance][color], disabled && 'pointer-events-none opacity-60', className)}
      {...props}
    />
  );
};
