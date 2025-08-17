import type * as React from 'react';

export type SvgIconComponent = React.ComponentType<
  React.SVGProps<SVGSVGElement>
>;

export type IconSize = number | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type IconCommonProps = {
  colorClass?: string;
  bgClass?: string;
  className?: string;
  'aria-label'?: string;
  variant?: 'stroke' | 'fill';
  size?: IconSize;
  strokeWidth?: number;
  nonScalingStroke?: boolean;
};

export type IconSvgProps = IconCommonProps & {
  component: SvgIconComponent;
  src?: never;
  alt?: never;
};

export type IconImgProps = IconCommonProps & {
  src: string;
  alt?: string;
  component?: never;
};

export type IconProps = IconSvgProps | IconImgProps;
