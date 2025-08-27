import type { ReactNode } from 'react';

import { cn } from '@/shared/lib';

type colorVariant = 'white' | 'primary';

export interface HeaderProps {
  leftSlot?: ReactNode;
  centerSlot?: ReactNode;
  rightSlot?: ReactNode;
  colorVariant?: colorVariant;
  className?: string;
  centerExpanded?: boolean;
}

const Header = ({
  leftSlot,
  centerSlot,
  rightSlot,
  colorVariant = 'white',
  className,
  centerExpanded = false,
}: HeaderProps) => {
  const backgroundColor = colorVariant === 'white' ? 'bg-white' : 'bg-primary-700';
  const textColor = colorVariant === 'white' ? 'text-gray-800' : 'text-white';

  return (
    <header
      className={cn(
        // Flexbox 속성 적용
        `flex items-center justify-between px-5 py-[14px] typo-body-m-bold`,
        backgroundColor,
        textColor,
        className,
      )}
    >
      <div
        className={cn(
          'flex justify-start items-center min-w-0',
          centerExpanded ? 'flex-none w-16' : 'flex-1',
        )}
      >
        {leftSlot}
      </div>
      <div
        className={cn(
          'flex justify-center items-center min-w-0',
          centerExpanded ? 'flex-1' : 'flex-1',
        )}
      >
        {centerSlot}
      </div>
      <div
        className={cn(
          'flex justify-end items-center min-w-0',
          centerExpanded ? 'flex-none w-16' : 'flex-1',
        )}
      >
        {rightSlot}
      </div>
    </header>
  );
};

export default Header;
