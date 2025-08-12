import { Icon, IconProps } from '@/shared/ui/icon';
import { Link, useNavigate } from 'react-router-dom';

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

  if (typeof href === 'string') {
    return (
      <Link
        to={href}
        onClick={onClick}
        aria-label={ariaLabel}
        className="inline-flex items-center justify-center"
      >
        <Icon {...icon} />
      </Link>
    );
  }

  const handleClick = () => {
    onClick?.();
    if (typeof href === 'number') {
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
