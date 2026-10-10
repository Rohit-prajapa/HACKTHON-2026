import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";

interface StatTrendProps {
  value: number;
  suffix?: string;
  invertColors?: boolean;
  label?: string;
  className?: string;
}

export default function StatTrend({
  value,
  suffix = "%",
  invertColors = false,
  label,
  className = "",
}: StatTrendProps) {
  const direction = value > 0 ? "up" : value < 0 ? "down" : "neutral";

  const isPositive = invertColors ? direction === "down" : direction === "up";

  const isNegative = invertColors ? direction === "up" : direction === "down";

  const formattedValue = `${Math.abs(value).toLocaleString(undefined, {
    maximumFractionDigits: 2,
  })}${suffix}`;

  return (
    <span
      className={`stat-trend ${
        isPositive ? "positive" : isNegative ? "negative" : "neutral"
      } ${className}`}
      aria-label={`${value > 0 ? "Increased" : value < 0 ? "Decreased" : "Unchanged"} by ${formattedValue}`}
    >
      {direction === "up" ? (
        <ArrowUpRight size={15} />
      ) : direction === "down" ? (
        <ArrowDownRight size={15} />
      ) : (
        <Minus size={15} />
      )}

      <span>{formattedValue}</span>
      {label && <span className="stat-trend-label">{label}</span>}
    </span>
  );
}
