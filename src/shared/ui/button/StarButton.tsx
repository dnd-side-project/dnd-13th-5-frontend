import { Icons } from '@/shared/assets/icons';
import IconButton from '@/shared/ui/button/IconButton';

interface StarButtonProps {
  onClick: () => void;
  isStarred?: boolean;
}

const StarButton = ({ onClick, isStarred = false }: StarButtonProps) => (
    <IconButton
      icon={{
        component: isStarred ? Icons.StarFilled : Icons.Star,
        variant: 'fill',
        colorClass: isStarred ? 'text-gray-800' : 'text-gray-800',
        size: 'sm',
      }}
      ariaLabel="즐겨찾기"
      onClick={onClick}
    />
);

export default StarButton;
