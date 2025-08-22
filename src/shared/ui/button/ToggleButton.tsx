interface ToggleButtonProps {
  enabled: boolean;
  onToggle: () => void;
  ariaLabel: string;
}

const ToggleButton = ({ enabled, onToggle, ariaLabel }: ToggleButtonProps) => (
  <button
    type="button"
    onClick={onToggle}
    className={`w-10 h-5 flex items-center rounded-full transition-colors ${
      enabled ? 'bg-primary-500' : 'bg-gray-300'
    }`}
    aria-label={ariaLabel}
  >
    <div
      className={`w-4 h-4 rounded-full bg-white transform transition-transform m-[2px] ${
        enabled ? 'translate-x-5 ' : 'translate-x-0'
      }`}
    />
  </button>
);

export default ToggleButton;
