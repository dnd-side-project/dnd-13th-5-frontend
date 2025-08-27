import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

import { cn } from '@/shared/lib';

export interface ButtonProps {
  variant: 'primary-stroke' | 'primary-fill';
  type?: 'button' | 'submit' | 'reset';
  title?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  isShaking?: boolean;
}

const baseClasses =
  'w-full px-5 py-4 h-12 flex items-center justify-center typo-body-m-medium rounded-xl transition-colors duration-200';

const buttonStyles = {
  'primary-stroke': {
    enabled: 'border border-primary-700 bg-white text-primary-700',
    disabled: 'border border-gray-100 bg-white text-gray-100',
  },
  'primary-fill': {
    enabled: 'bg-primary-700 text-white',
    disabled: 'bg-gray-300 text-white',
  },
};

const shakeVariants = {
  idle: {
    x: 0,
    transition: {
      duration: 0.4,
    },
  },
  shake: {
    x: [-5, 5, -5, 5, 0],
    transition: {
      duration: 0.4,
    },
  },
};

const Button = ({
  variant,
  type = 'button',
  title,
  onClick,
  disabled = false,
  className,
  isShaking = false,
}: ButtonProps) => {
  const currentVariant = buttonStyles[variant];
  const stateClasses = disabled ? currentVariant.disabled : currentVariant.enabled;

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(baseClasses, stateClasses, className)}
      // ✨ Framer Motion 속성 적용
      variants={shakeVariants}
      animate={isShaking ? 'shake' : 'idle'}
    >
      {title}
    </motion.button>
  );
};

export default Button;
