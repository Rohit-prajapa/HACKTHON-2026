interface AmountDisplayProps {
  amount: number;
  currency?: string;
  compact?: boolean;
  colorize?: boolean;
  className?: string;
}

export default function AmountDisplay({
  amount,
  currency = "INR",
  compact = false,
  colorize = false,
  className = "",
}: AmountDisplayProps) {
  const formattedAmount = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    notation: compact ? "compact" : "standard",
    maximumFractionDigits: compact ? 1 : 2,
  }).format(amount);

  const colorClass =
    colorize && amount > 0
      ? "amount-positive"
      : colorize && amount < 0
        ? "amount-negative"
        : "";

  return (
    <span className={`amount-display ${colorClass} ${className}`}>
      {formattedAmount}
    </span>
  );
}
