import { cn } from '@/shared/lib';

interface ProgressBarProps {
  value: number; // 0~100
  className?: string;
  trackClassName?: string;
  barClassName?: string;
  /** 스크린리더 전용 레이블(예: '이번달 사용률') */
  srLabel?: string;
}

export const ProgressBar = ({
  value,
  className,
  trackClassName,
  barClassName,
  srLabel = '진행률',
}: ProgressBarProps) => {
  const v = Math.max(0, Math.min(100, Math.round(value)));
  return (
    <div
      role="progressbar"
      aria-label={srLabel}
      aria-valuenow={v}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn('h-2 w-full rounded-full bg-gray-200', className, trackClassName)}
    >
      <div
        className={cn(
          'h-full rounded-full bg-primary transition-[width] duration-300',
          barClassName,
        )}
        style={{ width: `${v}%` }}
      />
    </div>
  );
};
