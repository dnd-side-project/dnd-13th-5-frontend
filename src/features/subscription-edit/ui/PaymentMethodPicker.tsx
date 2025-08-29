// features/subscription-edit/ui/PaymentMethodPicker.tsx
import { useMemo } from 'react';

import type { MethodKind, PaymentMethodOptions } from '@/entities/subscription/model/edit.types';
import { Icons } from '@/shared/assets/icons';
import { cn } from '@/shared/lib';
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownSeparator,
  DropdownTrigger,
} from '@/shared/ui/dropdown';
import { Icon } from '@/shared/ui/icon';

type Props = {
  kind: MethodKind;
  methodId?: string;
  onChangeKind: (k: MethodKind) => void;
  onChangeMethod: (id: string) => void;
  options: PaymentMethodOptions;
};

export const PaymentMethodPicker = ({
  kind,
  methodId,
  onChangeKind,
  onChangeMethod,
  options,
}: Props) => {
  const curr = useMemo(() => options[kind] ?? [], [kind, options]);

  // 현재 선택된 결제수단의 라벨을 찾기
  const selectedMethodLabel = useMemo(() => {
    if (!methodId) return '결제수단을 선택해주세요';
    const found = curr.find(m => m.id.toString() === methodId);
    return found?.label || '결제수단을 선택해주세요';
  }, [methodId, curr]);

  return (
    <fieldset className="space-y-3">
      <legend className="typo-title-s-bold">결제 수단</legend>

      {/* 상위 라디오 (카드/계좌/간편결제) */}
      <div role="radiogroup" className="grid grid-cols-3 gap-2">
        {(['CARD', 'ACCOUNT', 'EASY'] as const).map(k => (
          <label key={k} className="inline-flex">
            <input
              type="radio"
              name="methodKind"
              value={k}
              checked={kind === k}
              onChange={() => onChangeKind(k)}
              className="sr-only"
            />
            <span
              className={cn(
                'w-full rounded-xl border px-4 py-2 text-center',
                kind === k
                  ? 'border-primary-700 text-primary-700'
                  : 'border-gray-100 text-gray-800',
              )}
            >
              {(() => {
                if (k === 'CARD') return '카드';
                if (k === 'ACCOUNT') return '계좌';
                return '간편결제';
              })()}
            </span>
          </label>
        ))}
      </div>

      {/* 하위 드롭다운 */}
      <Dropdown>
        <DropdownTrigger asChild>
          <button
            className={cn(
              'w-full flex items-center justify-between gap-2 rounded-xl border px-4 py-3 typo-body-m-medium text-left',
              curr.length === 0
                ? 'border-gray-100 text-gray-400 cursor-not-allowed'
                : 'border-gray-200 text-gray-800 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500/20',
            )}
            disabled={curr.length === 0}
          >
            <span className="truncate">
              {curr.length === 0 ? '먼저 결제수단 종류를 선택해주세요' : selectedMethodLabel}
            </span>
            <Icon
              component={Icons.Down}
              size="xs"
              className="transition-transform duration-200 data-[state=open]:rotate-180 shrink-0"
            />
          </button>
        </DropdownTrigger>

        {curr.length > 0 && (
          <DropdownContent className="w-[var(--radix-dropdown-menu-trigger-width)] bg-white rounded-xl border border-gray-200 shadow-lg">
            {curr.map((method, index) => (
              <div key={method.id}>
                <DropdownItem onSelect={() => onChangeMethod(method.id.toString())}>
                  <img
                    src={method.imageUrl}
                    alt={method.label}
                    className="w-6 h-6 mr-1 rounded-md"
                  />
                  <span className="truncate">{method.label}</span>
                </DropdownItem>
                {index < curr.length - 1 && <DropdownSeparator />}
              </div>
            ))}
          </DropdownContent>
        )}
      </Dropdown>
    </fieldset>
  );
};
