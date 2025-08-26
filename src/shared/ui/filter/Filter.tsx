import { useState } from 'react';

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

interface FilterOption {
  key: string;
  label: string;
}

interface FilterProps {
  label: string; // 드롭다운 버튼에 표시될 텍스트
  items: FilterOption[]; // 드롭다운 항목 리스트
  initialValue?: string; // 선택된 항목의 초기값
  onSelect: (value: string) => void; // 항목 선택 시 호출될 콜백 함수
  className?: string;
  sideOffset?: number; // 드롭다운 컨텐츠와 트리거의 간격
}

export const Filter = ({
  label,
  items,
  initialValue,
  onSelect,
  sideOffset = 0,
  className,
}: FilterProps) => {
  const [selectedValue, setSelectedValue] = useState(initialValue || items[0]?.key);

  const selectedLabel = items.find(item => item.key === selectedValue)?.label || label;

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    onSelect(value);
  };

  return (
    <Dropdown>
      <DropdownTrigger asChild>
        <button
          className={cn(
            'group flex items-center justify-center gap-1 w-[90px] border border-gray-100 rounded-[20px] px-3 py-2 typo-body-s-medium text-gray-800 bg-white hover:bg-gray-50 focus:outline-none  focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-300',
            sideOffset === 0 && '[state=open]:rounded-b-none data-[state=open]:border-b-0',
          )}
        >
          <span className="max-w-[calc(100%-1rem)] whitespace-nowrap overflow-hidden text-ellipsis">
            {selectedLabel}
          </span>
          <Icon
            component={Icons.Down}
            size="xs"
            className="transition-transform duration-200 group-data-[state=open]:rotate-180"
          />
        </button>
      </DropdownTrigger>

      <DropdownContent
        className={cn(
          'rounded-[20px] min-w-[90px] w-full bg-white',
          sideOffset === 0 && 'rounded-t-0 w-[90px]',
        )}
        sideOffset={sideOffset}
      >
        {items.map((item, index) => (
          <div key={item.key}>
            <DropdownItem
              onSelect={() => handleSelect(item.key)}
              className={cn(
                'whitespace-nowrap overflow-hidden text-ellipsis',
                sideOffset === 0 && 'max-w-[calc(100%)]',
              )}
            >
              {item.label}
            </DropdownItem>
            {index < items.length - 1 && <DropdownSeparator />}
          </div>
        ))}
      </DropdownContent>
    </Dropdown>
  );
};
