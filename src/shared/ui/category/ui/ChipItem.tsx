import { cn } from '@/shared/lib/utils';
import { useId } from 'react';
import type {
  ChipColor,
  ChipItemProps,
  ChipSize,
  _ChipInternalBridge,
} from '../model/types';

/* --------------------------- 스타일 토큰 (간단) --------------------------- */
/** 라벨은 시각만 담당, 포커스 링은 input 포커스(:focus-within)로 노출 */
const baseLabel =
  'inline-flex items-center justify-center rounded-[20px] border whitespace-nowrap select-none ' +
  'transition-colors focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-black/20';

const sizeClass: Record<ChipSize, string> = {
  sm: 'px-4 py-1 typo-body-s-medium',
  md: 'px-5 py-2 typo-body-s-medium',
};

const selectedClass: Record<ChipColor, string> = {
  red: 'bg-primary-700 text-white border-transparent',
  black: 'bg-gray-800 text-white border-transparent',
};

const unselectedClass = 'bg-transparent text-gray-500 border-transparent';

const disabledClass = 'pointer-events-none text-gray-300';

/**
 * ChipItem
 * - 숨겨진 <input type="radio">가 a11y/키보드/폼을 처리
 * - <label>은 peer 상태(checked/disabled)에 따라 칩 스타일만 담당
 */
export const ChipItem = ({
  value,
  children,
  color = 'red',
  size = 'md',
  disabled,
  id,
  inputClassName,
  labelClassName,
  // 내부 주입: ChipGroup에서 cloneElement로 넘김
  __group,
}: ChipItemProps & { __group?: _ChipInternalBridge }) => {
  if (!__group) {
    throw new Error('ChipItem must be used inside <ChipGroup>.');
  }
  const { radioName, current, setValue } = __group;

  const autoId = useId();
  const inputId = id ?? `chip-${autoId}-${value}`;
  const checked = current === value;

  return (
    <div className="relative inline-block">
      {/* 네이티브 라디오: a11y/키보드/폼 제공 */}
      <input
        id={inputId}
        className={cn('peer sr-only', inputClassName)}
        type="radio"
        name={radioName}
        value={value}
        checked={checked}
        onChange={() => setValue(value)}
        disabled={disabled}
      />

      {/* 시각 라벨: peer 상태로 스타일 토글 */}
      <label
        htmlFor={inputId}
        className={cn(
          baseLabel,
          sizeClass[size],
          checked ? selectedClass[color] : unselectedClass,
          disabled && disabledClass,
          labelClassName
        )}
      >
        {children}
      </label>
    </div>
  );
};
