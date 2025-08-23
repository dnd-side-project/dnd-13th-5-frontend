import React from 'react';

import { cn } from '@/shared/lib';
import type { IconProps } from '@/shared/ui/icon';
import { Icon } from '@/shared/ui/icon';

export interface IconButtonProps {
  icon: IconProps;
  ariaLabel: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

const IconButton = ({ icon, ariaLabel, onClick, className }: IconButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={ariaLabel}
    className={cn('inline-flex items-center justify-center', className)}
  >
    <Icon {...icon} />
  </button>
);

export default IconButton;
