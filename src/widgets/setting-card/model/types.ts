import type { ReactNode } from 'react';

export interface SettingCardProps {
  children: ReactNode;
  borderStyle?: string;
  radiusStyle?: string;
  className?: string;
  onClick?: () => void;
}

export interface UserInfoCardProps {
  userName: string;
}
