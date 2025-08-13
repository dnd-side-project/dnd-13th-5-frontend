import { cn } from '@/lib/utils';
import { IconProps, IconSize } from '@/shared/ui/icon/types';

const sizeToWH = (size: IconSize) => {
  if (typeof size === 'number') return { width: size, height: size };
  switch (size) {
    case 'xs':
      return { width: 16, height: 16 };
    case 'sm':
      return { width: 20, height: 20 };
    case 'md':
      return { width: 24, height: 24 };
    case 'lg':
      return { width: 30, height: 30 };
    case 'xl':
      return { width: 40, height: 40 };
    default:
      return { width: 24, height: 24 };
  }
};

const Icon = (props: IconProps) => {
  const {
    colorClass,
    bgClass,
    className = '',
    variant = 'stroke',
    size = 'md',
    nonScalingStroke = true,
    strokeWidth = 2,
    'aria-label': ariaLabel,
  } = props;

  const { width, height } = sizeToWH(size);
  const wrapper = `inline-flex items-center justify-center  ${bgClass ?? ''}`.trim();

  if ('component' in props && props.component) {
    const SvgCmp = props.component;

    return (
      <span className={wrapper} aria-label={ariaLabel}>
        <SvgCmp
          style={{ width, height }}
          className={cn(
            colorClass,
            className,
            nonScalingStroke ? '[vector-effect:non-scaling-stroke]' : '',
          )}
          stroke={variant === 'stroke' ? 'currentColor' : 'none'}
          fill={variant === 'fill' ? 'currentColor' : 'none'}
          strokeWidth={variant === 'stroke' ? strokeWidth : undefined}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden={ariaLabel ? undefined : true}
        />
      </span>
    );
  }

  if ('src' in props) {
    return (
      <span className={wrapper} aria-label={ariaLabel}>
        <img
          src={props.src}
          alt={props.alt ?? ''}
          style={{ width, height }}
          className="block"
        />
      </span>
    );
  }

  return null;
};

export default Icon;
