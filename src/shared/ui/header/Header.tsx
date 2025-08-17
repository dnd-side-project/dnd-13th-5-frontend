import { ReactNode } from 'react';

type colorVariant = 'white' | 'primary';

export interface HeaderProps {
  leftSlot?: ReactNode;
  centerSlot?: ReactNode;
  rightSlot?: ReactNode;
  colorVariant?: colorVariant;
}

const Header = ({
  leftSlot,
  centerSlot,
  rightSlot,
  colorVariant = 'white',
}: HeaderProps) => {
  const backgroundColor = colorVariant === 'white' ? 'bg-white' : 'bg-primary-700';
  const textColor = colorVariant === 'white' ? 'text-gray-800' : 'text-white';

  return (
    <header
      className={`grid grid-cols-3 px-5 py-[14px] typo-body-m-bold ${backgroundColor} ${textColor}`}
    >
      <div className="flex items-center justify-start">{leftSlot}</div>
      <div className="flex-grow flex items-center justify-center">
        {centerSlot}
      </div>
      <div className="flex items-center justify-end">{rightSlot}</div>
    </header>
  );
};

export default Header;
