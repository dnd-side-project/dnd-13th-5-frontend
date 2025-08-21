import { useState } from 'react';

import { Icons } from '@/shared/assets/icons';
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
}

export const Filter = ({
  label,
  items,
  initialValue,
  onSelect,
}: FilterProps) => {
  const [selectedValue, setSelectedValue] = useState(
    initialValue || items[0]?.key,
  );

  const selectedLabel = items.find((item) => item.key === selectedValue)?.label || label;

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    onSelect(value);
  };

  return (
    <Dropdown>
      <DropdownTrigger asChild>
        <button className="group flex items-center justify-center gap-1 w-[100px] border border-gray-100 rounded-3xl px-3 py-2 typo-body-s-medium text-gray-800 bg-white data-[state=open]:rounded-b-none data-[state=open]:border-b-0 hover:bg-gray-50 focus:outline-none  focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-300">
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
        className="rounded-t-0 rounded-b-3xl w-[100px] bg-white"
        sideOffset={0}
      >
        {items.map((item, index) => (
          <div key={item.key}>
            <DropdownItem onSelect={() => handleSelect(item.key)}>
              <span className="max-w-[calc(100%)] whitespace-nowrap overflow-hidden text-ellipsis">
                {item.label}
              </span>
            </DropdownItem>
            {index < items.length - 1 && <DropdownSeparator />}
          </div>
        ))}
      </DropdownContent>
    </Dropdown>
  );
};
