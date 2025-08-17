import { cn } from '@/shared/lib/utils';
import type { ComponentProps, ReactNode } from 'react';
import { forwardRef, useId } from 'react';

/**
 * Input primitive + InputBox preset (React + Tailwind)
 * - Primitive(Input): shadcn 기반, forwardRef
 * - Preset(InputBox): label/suffix/error/helper + a11y 연결
 * - Next 종속 없음. 디자인 토큰은 className으로 오버라이드
 */

/* -------------------------------------------------------------------------- */
/* Primitive: Input (얇게 유지)                                               */
/* -------------------------------------------------------------------------- */
export type InputProps = ComponentProps<'input'>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      data-slot="input"
      className={cn(
        // base
        'flex w-full min-w-0 rounded-xl border bg-white px-5 py-3 typo-body-s-medium outline-none transition-[color,box-shadow,border-color]',
        'placeholder:text-gray-500',
        // disabled
        'disabled:cursor-not-allowed disabled:bg-gray-100 disabled:border-gray-200 disabled:text-gray-500',
        // invalid (aria-invalid=true 일 때)
        'aria-invalid:border-primary-700',
        className
      )}
      {...props}
    />
  )
);
Input.displayName = 'Input';

/* -------------------------------------------------------------------------- */
/* Preset: InputBox (label/suffix/error/helper 포함 컨테이너)                 */
/* -------------------------------------------------------------------------- */
export type InputBoxProps = Omit<InputProps, 'id' | 'className'> & {
  /** 외부에서 id 지정 가능(접근성/테스트), 없으면 자동 생성 */
  id?: string;
  /** 라벨(위쪽) — 시맨틱 <label htmlFor> 연결 */
  label?: ReactNode;
  /** 라벨 스타일 오버라이드 */
  labelClassName?: string;
  /** 입력 도움말(회색 작은 텍스트) */
  helperText?: ReactNode;
  /** 에러 상태: true(스타일만) | string(스타일+메시지) */
  error?: boolean | string;
  /** 우측 슬롯(아이콘/텍스트) */
  suffix?: ReactNode;
  /** 컨테이너 className */
  className?: string;
  /** 인풋 자체 className */
  inputClassName?: string;
};

export const InputBox = forwardRef<HTMLInputElement, InputBoxProps>(
  (
    {
      id,
      label,
      labelClassName,
      helperText,
      error,
      suffix,
      className,
      inputClassName,
      disabled,
      readOnly,
      required, // Input의 표준 prop(별표 표시에 사용)
      ...inputProps
    },
    ref
  ) => {
    const autoId = useId();
    const inputId = id ?? `inp-${autoId}`;

    const helperId = helperText ? `${inputId}-help` : undefined;
    const hasErrorText = typeof error === 'string' && error.trim().length > 0;
    const errorId = hasErrorText ? `${inputId}-err` : undefined;
    const describedBy =
      [helperId, errorId].filter(Boolean).join(' ') || undefined;

    const invalid = error === true || hasErrorText;

    return (
      <div className={cn('w-full', className)}>
        {/* label */}
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              'mb-2 ml-2 block typo-body-s-medium text-gray-700',
              disabled && 'text-gray-400',
              labelClassName
            )}
          >
            {label}
            {required && (
              <span className="ml-1 text-primary-700" aria-hidden>
                *
              </span>
            )}
          </label>
        )}

        <div className="relative">
          {/* input */}
          <Input
            id={inputId}
            ref={ref}
            aria-invalid={invalid || undefined}
            aria-describedby={describedBy}
            disabled={disabled}
            readOnly={readOnly}
            required={required}
            className={cn(
              inputClassName,
              suffix ? 'pr-10' : '',
              invalid && 'border-primary-700'
            )}
            {...inputProps}
          />

          {/* suffix */}
          {suffix && (
            <div
              className={cn(
                'absolute inset-y-0 right-5 flex items-center',
                disabled ? 'text-gray-300' : 'text-gray-500'
              )}
            >
              {suffix}
            </div>
          )}
        </div>

        {/* helper / error */}
        {typeof error === 'string' && (
          <p
            id={errorId}
            className="mt-2 ml-2 typo-body-s-medium text-primary-600"
          >
            {error}
          </p>
        )}
        {!error && helperText && (
          <p
            id={helperId}
            className="mt-2 ml-2 typo-body-s-medium text-gray-500"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);
InputBox.displayName = 'InputBox';
