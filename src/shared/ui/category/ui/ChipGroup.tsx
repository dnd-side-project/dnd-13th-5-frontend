import type { ReactElement } from 'react';
import { Children, cloneElement, isValidElement, useId, useMemo, useState } from 'react';

import { cn } from '@/shared/lib/utils';

import type { ChipGroupProps, _ChipInternalBridge } from '../model/types';

/**
 * - 네이티브 <input type="radio">가 a11y/키보드/폼 동작을 제공
 * - 자식 ChipItem에 내부 브리지(__group)를 주입하여 값 변경을 위임
 */
export const ChipGroup = ({
  value: controlled,
  defaultValue,
  onValueChange,
  name,
  className,
  children,
}: ChipGroupProps) => {
  const autoId = useId();
  const radioName = useMemo(() => name ?? `chip-${autoId}`, [name, autoId]);

  // 제어/비제어 모두 지원
  const isControlled = controlled !== undefined;
  const [uncontrolled, setUncontrolled] = useState<string | null>(defaultValue ?? null);
  const current = isControlled ? controlled : uncontrolled;

  const setValue = (v: string | null) => {
    if (!isControlled) setUncontrolled(v);
    onValueChange?.(v);
  };

  const bridge: _ChipInternalBridge = {
    radioName,
    current,
    setValue,
  };

  return (
    <div
      role="radiogroup"
      aria-orientation="horizontal"
      className={cn('flex gap-1 overflow-x-auto scrollbar-hide', className)}
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      {Children.map(children, child => {
        if (isValidElement(child)) {
          return cloneElement(child as ReactElement<{ __group?: _ChipInternalBridge }>, {
            __group: bridge,
          });
        }
        return child;
      })}
    </div>
  );
};
