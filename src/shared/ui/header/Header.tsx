import type { ReactNode } from 'react';

import { cn } from '@/shared/lib';

type colorVariant = 'white' | 'primary';

export interface HeaderProps {
  leftSlot?: ReactNode;
  centerSlot?: ReactNode;
  rightSlot?: ReactNode;
  colorVariant?: colorVariant;
}

const Header = ({ leftSlot, centerSlot, rightSlot, colorVariant = 'white' }: HeaderProps) => {
  const backgroundColor = colorVariant === 'white' ? 'bg-white' : 'bg-primary-700';
  const textColor = colorVariant === 'white' ? 'text-gray-800' : 'text-white';

  return (
    <header
      className={cn(
        // Flexbox 속성 적용
        `flex items-center justify-between px-5 py-[14px] typo-body-m-bold`,
        backgroundColor,
        textColor,
      )}
    >
      <div className="flex-1 flex justify-start items-center min-w-0">{leftSlot}</div>
      <div className="flex-1 flex justify-center items-center min-w-0">{centerSlot}</div>
      <div className="flex-1 flex justify-end items-center min-w-0">{rightSlot}</div>
    </header>
  );
};

export default Header;
