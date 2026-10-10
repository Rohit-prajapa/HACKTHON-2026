interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  showPercentage?: boolean;
  color?: "blue" | "green" | "yellow" | "red";
  className?: string;
}

export default function ProgressBar({
  value,
  max = 100,
  label,
  showPercentage = true,
  color = "blue",
  className = "",
}: ProgressBarProps) {
  const percentage =
    max > 0 ? Math.min(100, Math.max(0, (value / max) * 100)) : 0;

  return (
    <div className={`progress-bar-wrapper ${className}`}>
      {(label || showPercentage) && (
        <div className="progress-bar-header">
          {label && <span>{label}</span>}
          {showPercentage && <span>{Math.round(percentage)}%</span>}
        </div>
      )}

      <div
        className="progress-bar-track"
        role="progressbar"
        aria-label={label || "Progress"}
        aria-valuenow={Math.round(percentage)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={`progress-bar-fill progress-bar-${color}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
