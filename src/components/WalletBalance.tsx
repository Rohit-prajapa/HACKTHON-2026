import { Eye, EyeOff, Wallet } from "lucide-react";
import { useState } from "react";

interface WalletBalanceProps {
  title?: string;
  balance: number;
  currency?: string;
  className?: string;
}

export default function WalletBalance({
  title = "Available Liquidity",
  balance,
  currency = "INR",
  className = "",
}: WalletBalanceProps) {
  const [visible, setVisible] = useState(true);

  const formattedBalance = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(balance);

  return (
    <section className={`wallet-balance ${className}`}>
      <div className="wallet-balance-header">
        <span className="wallet-balance-icon">
          <Wallet size={19} />
        </span>

        <span className="wallet-balance-title">{title}</span>

        <button
          type="button"
          className="wallet-balance-visibility"
          onClick={() => setVisible((previous) => !previous)}
          aria-label={visible ? "Hide balance" : "Show balance"}
        >
          {visible ? <EyeOff size={17} /> : <Eye size={17} />}
        </button>
      </div>

      <div className="wallet-balance-amount">
        {visible ? formattedBalance : "••••••••"}
      </div>
    </section>
  );
}
