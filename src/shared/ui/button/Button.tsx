export interface ButtonProps {
  variant: 'primary-stroke' | 'primary-fill';
  title: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const baseClasses =
  'w-full px-5 py-4 h-12 flex items-center justify-center rounded-xl typo-body-m-medium transition-colors duration-200';

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

const Button = ({ variant, title, onClick, disabled = false, className }: ButtonProps) => {
  const currentVariant = buttonStyles[variant];
  const stateClasses = disabled ? currentVariant.disabled : currentVariant.enabled;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${stateClasses} ${className}`}
    >
      <span>{title}</span>
    </button>
  );
};

export default Button;
