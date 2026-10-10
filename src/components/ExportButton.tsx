import { Download } from "lucide-react";
import type { Transaction } from "../services/types";
import { exportTransactionsToCSV } from "../services/csv";

interface ExportButtonProps {
  transactions: Transaction[];
  filename?: string;
  disabled?: boolean;
}

export default function ExportButton({
  transactions,
  filename = "treasury-transactions.csv",
  disabled = false,
}: ExportButtonProps) {
  const handleExport = () => {
    if (transactions.length === 0) return;

    exportTransactionsToCSV(transactions, filename);
  };

  return (
    <button
      type="button"
      className="export-button"
      onClick={handleExport}
      disabled={disabled || transactions.length === 0}
      title="Export transactions to CSV"
    >
      <Download size={16} />
      <span>Export CSV</span>
    </button>
  );
}
