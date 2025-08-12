import { Icon, IconProps } from '@/shared/ui/icon';
import { useNavigate } from 'react-router-dom';

export interface IconButtonProps {
  icon: IconProps;
  ariaLabel: string;
  href?: string | number;
  onClick?: () => void;
}

const IconButton = ({
  icon, ariaLabel, href, onClick,
}: IconButtonProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    onClick?.();
    if (href == null) return;

    if (typeof href === 'number') {
      navigate(href);
    } else {
      navigate(href);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={ariaLabel}
      className="inline-flex items-center justify-center"
    >
      <Icon {...icon} />
    </button>
  );
};

export default IconButton;
