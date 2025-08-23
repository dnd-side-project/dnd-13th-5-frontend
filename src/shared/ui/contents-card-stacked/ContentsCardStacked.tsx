import type { KeyboardEvent, ReactNode } from 'react';
import { forwardRef } from 'react';

import { cn } from '@/lib/utils';

/**
 * 여러 줄(Row)로 쌓아 쓰는 콘텐츠 카드
 * - Header(제목/우측 슬롯) + Row(라벨/값/체브론) + Note(문단형 본문) + Divider 구성
 * - onClick이 있으면 접근성/키보드 지원되는 버튼 시맨틱으로 렌더
 */

/* ------------------------------------------------------------- */
/* Stacked Container                                             */
/* ------------------------------------------------------------- */
export type StackedProps = {
  children: ReactNode;
  className?: string;
  /** 섀도우가 밖으로 자연스럽게 번져 보이게 하고 싶을 때 */
  bleedShadow?: boolean;
};

export const ContentsCardStacked = ({ children, className, bleedShadow }: StackedProps) => (
  <section
    className={cn(
      'relative rounded-2xl bg-white shadow-[0_4px_16px_rgba(0,0,0,0.06)]',
      bleedShadow &&
        "before:content-[''] before:absolute before:-inset-x-3 before:inset-y-1 before:rounded-[20px] before:shadow-[0_10px_28px_rgba(0,0,0,0.08)] before:-z-10",
      className,
    )}
  >
    {children}
  </section>
);

/* ------------------------------------------------------------- */
/* Header                                                        */
/* ------------------------------------------------------------- */
export type HeaderProps = {
  title: ReactNode;
  right?: ReactNode; // 예: 태그/배지/카운트/아이콘
  className?: string;
};

const Header = ({ title, right, className }: HeaderProps) => (
  <div className={cn('flex items-center justify-between px-5 py-4', className)}>
    <h3 className="typo-body-s-medium text-gray-800">{title}</h3>
    {right}
  </div>
);

/* ------------------------------------------------------------- */
/* Divider                                                       */
/* ------------------------------------------------------------- */
const Divider = ({ className }: { className?: string }) => (
  <div className={cn('h-px bg-gray-100', className)} />
);

/* ------------------------------------------------------------- */
/* Row (label / value / chevron)                                 */
/* ------------------------------------------------------------- */
export type RowProps = {
  /** 좌측 라벨 */
  label: ReactNode;
  /** 우측 값(텍스트/태그 등) */
  value?: ReactNode;
  /** 클릭 시 동작 (있으면 버튼 시맨틱으로 렌더) */
  onClick?: () => void;
  /** 비활성화(클릭 불가 + 흐림 처리) */
  disabled?: boolean;
  /** 수직 정렬 */
  align?: 'center' | 'start';
  className?: string;
};

const Row = forwardRef<HTMLDivElement, RowProps>(
  ({ label, value, onClick, disabled, align = 'center', className }, ref) => {
    const isButton = Boolean(onClick) && !disabled;

    const handleKey = (e: KeyboardEvent<HTMLDivElement>) => {
      if (!isButton) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClick?.();
      }
    };

    return (
      <div
        ref={ref}
        role={isButton ? 'button' : undefined}
        tabIndex={isButton ? 0 : undefined}
        aria-disabled={disabled || undefined}
        onClick={isButton ? onClick : undefined}
        onKeyDown={handleKey}
        className={cn(
          'flex items-center justify-between px-5 py-4',
          isButton &&
            'cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30 rounded-2xl',
          disabled && 'opacity-50 cursor-not-allowed',
          align === 'start' && 'items-start flex-col gap-3',
          className,
        )}
      >
        <span className="typo-body-s-medium text-gray-800">{label}</span>

        <span className="flex items-center typo-body-s-medium text-gray-500">{value}</span>
      </div>
    );
  },
);
Row.displayName = 'ContentsCardStacked.Row';

/* ------------------------------------------------------------- */
/* Note (문단형 본문)                                           */
/* ------------------------------------------------------------- */
export type NoteProps = {
  children?: ReactNode; // 멀티라인 텍스트/링크 등
  className?: string;
};

const Note = ({ children, className }: NoteProps) => (
  <div className={cn('px-5 py-4 text-gray-500 typo-body-s-medium', className)}>{children}</div>
);

ContentsCardStacked.Header = Header;
ContentsCardStacked.Row = Row;
ContentsCardStacked.Divider = Divider;
ContentsCardStacked.Note = Note;

export type ContentsCardStackedNamespace = typeof ContentsCardStacked & {
  Header: typeof Header;
  Row: typeof Row;
  Divider: typeof Divider;
  Note: typeof Note;
};

// 타입 추론 보강
export const Stacked = ContentsCardStacked as ContentsCardStackedNamespace;
