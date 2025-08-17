import { cn } from '@/shared/lib/utils';
import {
  Close as RadixClose,
  Content as RadixContent,
  Description as RadixDescription,
  Overlay as RadixOverlay,
  Portal as RadixPortal,
  Root as RadixRoot,
  Title as RadixTitle,
  Trigger as RadixTrigger,
  type EscapeKeyDownEvent,
  type PointerDownOutsideEvent,
} from '@radix-ui/react-dialog';
import { ComponentProps, forwardRef } from 'react';

/**
 * 공통 Dialog 컴포넌트
 * - cva/cn 일단 미사용: 경량 cx 유틸 + 매핑 객체
 * - 컴파운드 패턴 + 최소 프리셋을 염두
 * - 생성형 ai를 통한 a11y 보강: ESC/바깥클릭 차단 옵션, ariaLabel/aria-describedby 지원, motion-reduce 대응
 * - how to는 PR참고.
 */

/* ----------------------------------------------------------------------------
 * Root / Trigger / Portal / Close
 * -------------------------------------------------------------------------- */

export const Dialog = (props: ComponentProps<typeof RadixRoot>) => (
  <RadixRoot data-slot="dialog" {...props} />
);

export const DialogTrigger = (props: ComponentProps<typeof RadixTrigger>) => (
  <RadixTrigger data-slot="dialog-trigger" {...props} />
);

export const DialogPortal = (props: ComponentProps<typeof RadixPortal>) => (
  <RadixPortal data-slot="dialog-portal" {...props} />
);

export const DialogClose = (props: ComponentProps<typeof RadixClose>) => (
  <RadixClose data-slot="dialog-close" {...props} />
);

/* ----------------------------------------------------------------------------
 * Overlay
 * -------------------------------------------------------------------------- */

export const DialogOverlay = ({
  className,
  ...props
}: ComponentProps<typeof RadixOverlay>) => (
  <RadixOverlay
    data-slot="dialog-overlay"
    className={cn(
      'fixed inset-0 z-50 bg-black/50',
      'data-[state=open]:animate-in data-[state=closed]:animate-out',
      'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      // 모션 민감 사용자 배려
      'motion-reduce:transition-none',
      className,
    )}
    {...props}
  />
);

/* ----------------------------------------------------------------------------
 * Content (variants: size / align / intent / scroll)
 * -------------------------------------------------------------------------- */

type Size = 'sm' | 'md' | 'lg';
type Align = 'center' | 'top';
type Intent = 'default' | 'success' | 'danger';
type Scroll = 'auto' | 'none';

const sizeMap: Record<Size, string> = {
  sm: 'max-w-[calc(100%-2.5rem)] sm:max-w-sm',
  md: 'max-w-[calc(100%-2.5rem)] sm:max-w-md',
  lg: 'max-w-[calc(100%-2.5rem)] sm:max-w-lg',
};

const alignMap: Record<Align, string> = {
  center: 'top-1/2 -translate-y-1/2',
  top: 'top-24',
};

const intentMap: Record<Intent, string> = {
  default: '',
  success: 'border-green-100',
  danger: 'border-red-100',
};

const scrollMap: Record<Scroll, string> = {
  auto: 'max-h-[80dvh] overflow-auto',
  none: '',
};

export type DialogContentProps = ComponentProps<typeof RadixContent> & {
  size?: Size;
  align?: Align;
  intent?: Intent;
  scroll?: Scroll;
  /** 우상단 X 버튼 노출 */
  showCloseButton?: boolean;
  /** 바깥 클릭으로 닫힘 비활성화 */
  disableOutsideClose?: boolean;
  /** ESC로 닫힘 비활성화 */
  disableEscClose?: boolean;
  /**
   * Title/Description 없이 쓰는 경우, 접근성 보완용 라벨
   * - Title이 있으면 자동 aria-labelledby 연결됨 → 이 prop 불필요
   */
  ariaLabel?: string;
  /**
   * 커스텀 본문(DialogBody 등)에 id를 달고, 그 id를 여기에 주면
   * 스크린리더가 본문을 설명으로 읽음
   */
  describedById?: string;
};

export const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(
  (
    {
      className,
      children,
      size = 'md',
      align = 'center',
      intent = 'default',
      scroll = 'auto',
      showCloseButton = false,
      disableOutsideClose = true,
      disableEscClose = true,
      ariaLabel,
      describedById,
      ...props
    },
    ref,
  ) => (
    <DialogPortal>
      <DialogOverlay />
      <RadixContent
        ref={ref}
        data-slot="dialog-content"
        aria-label={ariaLabel}
        aria-describedby={describedById}
        onPointerDownOutside={(e: PointerDownOutsideEvent) => {
          if (disableOutsideClose) e.preventDefault();
          props.onPointerDownOutside?.(e);
        }}
        onEscapeKeyDown={(e: EscapeKeyDownEvent) => {
          if (disableEscClose) e.preventDefault();
          props.onEscapeKeyDown?.(e);
        }}
        className={cn(
          // 공통 레이아웃/애니메이션
          'fixed left-1/2 z-50 grid w-full -translate-x-1/2 rounded-xl p-5 duration-200 bg-white gap-3',
          'data-[state=open]:animate-in data-[state=closed]:animate-out',
          'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
          'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
          // variants
          sizeMap[size as Size],
          alignMap[align as Align],
          intentMap[intent as Intent],
          scrollMap[scroll as Scroll],
          // 모션 민감 사용자 배려
          'motion-reduce:transition-none',
          className,
        )}
        {...props}
      >
        {children}

        {showCloseButton && (
          <RadixClose
            data-slot="dialog-close"
            aria-label="Close"
            className={cn(
              'absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-xs',
              'opacity-70 transition-opacity hover:opacity-100',
              'focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2',
            )}
          >
            {/* 외부 아이콘 의존 없이 심플한 닫기 버튼 */}
            <span aria-hidden>×</span>
          </RadixClose>
        )}
      </RadixContent>
    </DialogPortal>
  ),
);
DialogContent.displayName = 'DialogContent';

/* ----------------------------------------------------------------------------
 * Header / Footer / Title / Description
 * -------------------------------------------------------------------------- */

export const DialogHeader = ({
  className,
  ...props
}: ComponentProps<'div'>) => (
  <div
    data-slot="dialog-header"
    className={cn('flex flex-col gap-2 text-center', className)}
    {...props}
  />
);

export const DialogFooter = ({
  className,
  ...props
}: ComponentProps<'div'>) => (
  <div
    data-slot="dialog-footer"
    className={cn('flex w-full gap-2', className)}
    {...props}
  />
);

export const DialogTitle = ({
  className,
  ...props
}: ComponentProps<typeof RadixTitle>) => (
  <RadixTitle
    data-slot="dialog-title"
    className={cn('typo-body-m-bold', className)}
    {...props}
  />
);

export const DialogDescription = ({
  className,
  ...props
}: ComponentProps<typeof RadixDescription>) => (
  <RadixDescription
    data-slot="dialog-description"
    className={cn('typo-body-m-medium', className)}
    {...props}
  />
);

/* ----------------------------------------------------------------------------
 * 추가 조합 블록: Body / Actions
 * -------------------------------------------------------------------------- */

export const DialogBody = ({
  className,
  ...props
}: ComponentProps<'div'> & { id?: string }) => (
  // id를 부여하고, Content의 describedById로 연결하면 스크린리더가 본문을 읽음
  <div
    data-slot="dialog-body"
    className={cn('mt-1 space-y-3 text-sm', className)}
    {...props}
  />
);

type ActionsAlign = 'start' | 'center' | 'end' | 'between';

export const DialogActions = ({
  className,
  children,
  align = 'center',
  ...props
}: ComponentProps<'div'> & { align?: ActionsAlign }) => {
  const map: Record<ActionsAlign, string> = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
  };
  return (
    <DialogFooter className={cn(map[align], className)} {...props}>
      {children}
    </DialogFooter>
  );
};
