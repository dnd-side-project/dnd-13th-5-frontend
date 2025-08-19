import { cn } from '@/lib/utils';

interface PaginationDotsProps {
  total: number; // 총 개수
  active: number; // 0-based
  onChange?: (index: number) => void;
  className?: string;
}

export const PaginationDots = ({ total, active, onChange, className }: PaginationDotsProps) => {
  if (total <= 1) return null;

  return (
    <div className={cn('flex items-center justify-center gap-2', className)}>
      {Array.from({ length: total }).map((_, i) => {
        const isActive = i === active;
        return (
          <button
            key={i}
            type="button"
            aria-label={`${i + 1}번째로 이동`}
            aria-current={isActive || undefined}
            onClick={onChange ? () => onChange(i) : undefined}
            className={cn(
              'h-2 w-2 rounded-full transition-transform',
              isActive ? 'bg-secondary-200 scale-100' : 'bg-gray-100',
              onChange && 'focus-visible:ring-2 focus-visible:ring-secondary-500/40 outline-none',
            )}
          />
        );
      })}
    </div>
  );
};
