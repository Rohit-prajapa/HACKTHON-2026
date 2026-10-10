interface ProgressRingProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  label?: string;
  showValue?: boolean;
  className?: string;
}

export default function ProgressRing({
  value,
  size = 100,
  strokeWidth = 8,
  color = "#38bdf8",
  label,
  showValue = true,
  className = "",
}: ProgressRingProps) {
  const percentage = Math.min(100, Math.max(0, value));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - percentage / 100);

  return (
    <div
      className={`progress-ring ${className}`}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.12"
          strokeWidth={strokeWidth}
        />

        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>

      {showValue && (
        <span className="progress-ring-value">{Math.round(percentage)}%</span>
      )}

      {label && <span className="progress-ring-label">{label}</span>}
    </div>
  );
}
