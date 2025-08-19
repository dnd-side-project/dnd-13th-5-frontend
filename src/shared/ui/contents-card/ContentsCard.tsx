import { forwardRef, type KeyboardEvent, type ReactNode } from 'react';

import { cn } from '@/lib/utils'; // clsx + tailwind-merge 유틸 가정

export interface ContentsCardProps {
  /** 왼쪽 영역(태그, 타이틀 등 복합 레이아웃 자유) */
  left: ReactNode;
  /** 오른쪽 영역(금액, 액션 등) */
  right: ReactNode;
  /** 클릭 가능한 카드로 만들지 여부 (true면 role/키보드 핸들링 추가) */
  interactive?: boolean;
  onClick?: () => void;
  className?: string;
  /** 스크린리더용 카드 라벨 (interactive일 때 권장) */
  ariaLabel?: string;
}

export const ContentsCard = forwardRef<HTMLDivElement, ContentsCardProps>(
  ({ left, right, interactive, onClick, className, ariaLabel }, ref) => {
    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
      if (!interactive || !onClick) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClick();
      }
    };

    return (
      <div
        ref={ref}
        role={interactive ? 'button' : undefined}
        tabIndex={interactive ? 0 : undefined}
        aria-label={interactive ? ariaLabel : undefined}
        onClick={onClick}
        onKeyDown={handleKeyDown}
        className={cn(
          'w-full rounded-xl px-5 py-4',
          'flex items-center justify-between',
          interactive &&
            'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black/10',
          className,
        )}
      >
        <div className="min-w-0 flex items-center gap-2">{left}</div>
        <div className="shrink-0 flex items-center gap-2">{right}</div>
      </div>
    );
  },
);
ContentsCard.displayName = 'ContentsCard';
