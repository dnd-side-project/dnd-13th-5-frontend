import { Link } from 'react-router-dom';

import { Icons } from '@/shared/assets/icons';
import { cn } from '@/shared/lib/utils';

interface FloatingButtonProps {
  href: string;
  className?: string;
}

const FloatingButton = ({ href, className }: FloatingButtonProps) => (
  <Link
    to={href}
    className={cn(
      'absolute bottom-[100px] right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary-700 text-white shadow-lg transition-colors',
      className,
    )}
  >
    <Icons.Plus className="h-[30px] w-[30px] stroke-white stroke-[2]" />
    <span className="sr-only">구독 추가하기</span>
  </Link>
);

export default FloatingButton;
