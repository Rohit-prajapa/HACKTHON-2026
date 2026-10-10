import type { ReactNode } from "react";
import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  change?: number;
  description?: string;
  icon?: ReactNode;
}

export default function MetricCard({
  title,
  value,
  change,
  description,
  icon,
}: MetricCardProps) {
  const trendClass =
    change === undefined || change === 0
      ? "neutral"
      : change > 0
        ? "positive"
        : "negative";

  return (
    <article className="metric-card">
      <div className="metric-card-top">
        <span className="metric-card-title">{title}</span>
        {icon && <span className="metric-card-icon">{icon}</span>}
      </div>

      <div className="metric-card-value">{value}</div>

      {change !== undefined && (
        <div className={`metric-card-change ${trendClass}`}>
          {change > 0 ? (
            <ArrowUpRight size={16} />
          ) : change < 0 ? (
            <ArrowDownRight size={16} />
          ) : (
            <Minus size={16} />
          )}
          <span>{Math.abs(change).toFixed(1)}%</span>
        </div>
      )}

      {description && <p className="metric-card-description">{description}</p>}
    </article>
  );
}
