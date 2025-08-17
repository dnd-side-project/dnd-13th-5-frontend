import { Icon, IconProps } from '@/shared/ui/icon';

export interface IconButtonProps {
  icon: IconProps;
  ariaLabel: string;
  onClick?: () => void;
}

const IconButton = ({ icon, ariaLabel, onClick }: IconButtonProps) => (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className="inline-flex items-center justify-center"
    >
      <Icon {...icon} />
    </button>
);

export default IconButton;
