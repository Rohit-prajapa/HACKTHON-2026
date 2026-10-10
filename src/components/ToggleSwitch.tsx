interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  disabled?: boolean;
  className?: string;
}

export default function ToggleSwitch({
  checked,
  onChange,
  label,
  disabled = false,
  className = "",
}: ToggleSwitchProps) {
  return (
    <label className={`toggle-switch-wrapper ${className}`}>
      <span className="toggle-switch-label">{label}</span>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        className={`toggle-switch ${checked ? "checked" : ""}`}
        disabled={disabled}
        onClick={() => onChange(!checked)}
      >
        <span className="toggle-switch-thumb" />
      </button>
    </label>
  );
}
