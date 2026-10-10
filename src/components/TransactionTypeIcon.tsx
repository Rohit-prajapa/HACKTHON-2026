import { ArrowDownLeft, ArrowUpRight, RefreshCw } from "lucide-react";

interface TransactionTypeIconProps {
  type: "inflow" | "outflow" | "transfer";
  size?: number;
  className?: string;
}

export default function TransactionTypeIcon({
  type,
  size = 18,
  className = "",
}: TransactionTypeIconProps) {
  const Icon =
    type === "inflow"
      ? ArrowDownLeft
      : type === "outflow"
        ? ArrowUpRight
        : RefreshCw;

  const label =
    type === "inflow"
      ? "Cash inflow"
      : type === "outflow"
        ? "Cash outflow"
        : "Transfer";

  return (
    <span
      className={`transaction-type-icon transaction-type-${type} ${className}`}
      role="img"
      aria-label={label}
      title={label}
    >
      <Icon size={size} />
    </span>
  );
}
