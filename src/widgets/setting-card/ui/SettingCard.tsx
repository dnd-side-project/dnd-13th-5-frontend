import { cn } from '@/shared/lib';
import type { SettingCardProps } from '@/widgets/setting-card/model/types';

const SettingCard = ({
  children,
  borderStyle,
  radiusStyle,
  className,
  onClick,
}: SettingCardProps) => (
  <div
    className={cn(
      `flex justify-between items-center px-5 py-4 border border-gray-100 bg-white text-gray-800 rounded-xl`,
      borderStyle,
      radiusStyle,
      className,
    )}
    onClick={onClick}
    role={onClick ? 'button' : undefined}
    tabIndex={onClick ? 0 : undefined}
    onKeyDown={e => {
      if (onClick && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        onClick();
      }
    }}
  >
    {children}
  </div>
);

export default SettingCard;
