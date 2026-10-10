import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";

interface AmountChangeProps {
  current: number;
  previous: number;
  currency?: string;
  className?: string;
}

export default function AmountChange({
  current,
  previous,
  currency = "INR",
  className = "",
}: AmountChangeProps) {
  const difference = current - previous;
  const percentage =
    previous !== 0 ? (difference / Math.abs(previous)) * 100 : null;

  const formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  });

  const direction =
    difference > 0 ? "increase" : difference < 0 ? "decrease" : "unchanged";

  return (
    <div className={`amount-change ${direction} ${className}`}>
      {difference > 0 ? (
        <ArrowUpRight size={16} />
      ) : difference < 0 ? (
        <ArrowDownRight size={16} />
      ) : (
        <Minus size={16} />
      )}

      <span>{formatter.format(Math.abs(difference))}</span>

      {percentage !== null && (
        <span className="amount-change-percentage">
          ({Math.abs(percentage).toFixed(1)}%)
        </span>
      )}
    </div>
  );
}
