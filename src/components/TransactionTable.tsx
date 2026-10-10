import { ArrowDownLeft, ArrowUpRight, Search } from "lucide-react";
import { useMemo, useState } from "react";
import type { Transaction } from "../services/types";

interface TransactionTableProps {
  transactions: Transaction[];
  onSelect?: (transaction: Transaction) => void;
}

export default function TransactionTable({
  transactions,
  onSelect,
}: TransactionTableProps) {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredTransactions = useMemo(() => {
    const query = search.trim().toLowerCase();

    return transactions.filter((transaction) => {
      const description = transaction.description ?? "";
      const entity = transaction.entity ?? "";
      const id = transaction.id ?? "";

      const matchesSearch =
        !query ||
        description.toLowerCase().includes(query) ||
        entity.toLowerCase().includes(query) ||
        id.toLowerCase().includes(query);

      const matchesType =
        typeFilter === "all" || transaction.type === typeFilter;

      const matchesStatus =
        statusFilter === "all" || transaction.status === statusFilter;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [transactions, search, typeFilter, statusFilter]);

  const formatAmount = (transaction: Transaction) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: transaction.currency,
      maximumFractionDigits: 0,
    }).format(transaction.amount);

  return (
    <section className="transaction-table-card">
      <div className="transaction-table-toolbar">
        <label className="transaction-search">
          <Search size={18} />
          <input
            type="search"
            placeholder="Search transactions..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            aria-label="Search transactions"
          />
        </label>

        <select
          value={typeFilter}
          onChange={(event) => setTypeFilter(event.target.value)}
          aria-label="Filter by transaction type"
        >
          <option value="all">All types</option>
          <option value="inflow">Inflows</option>
          <option value="outflow">Outflows</option>
        </select>

        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
          aria-label="Filter by transaction status"
        >
          <option value="all">All statuses</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
          <option value="scheduled">Scheduled</option>
        </select>
      </div>

      <div className="transaction-table-scroll">
        <table className="transaction-table">
          <thead>
            <tr>
              <th>Transaction</th>
              <th>Date</th>
              <th>Entity</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredTransactions.map((transaction) => (
              <tr
                key={transaction.id}
                onClick={() => onSelect?.(transaction)}
                className={onSelect ? "transaction-row-clickable" : ""}
              >
                <td>
                  <div className="transaction-description">
                    <strong>
                      {transaction.description || "Untitled transaction"}
                    </strong>
                    <span>{transaction.id}</span>
                  </div>
                </td>

                <td>{transaction.date}</td>
                <td>{transaction.entity}</td>

                <td>
                  <span className={`transaction-type ${transaction.type}`}>
                    {transaction.type === "inflow" ? (
                      <ArrowDownLeft size={15} />
                    ) : (
                      <ArrowUpRight size={15} />
                    )}
                    {transaction.type}
                  </span>
                </td>

                <td className="transaction-amount">
                  {formatAmount(transaction)}
                </td>

                <td>
                  <span className={`status-badge status-${transaction.status}`}>
                    {transaction.status}
                  </span>
                </td>
              </tr>
            ))}

            {filteredTransactions.length === 0 && (
              <tr>
                <td colSpan={6} className="transaction-no-results">
                  No transactions match your search or filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="transaction-table-footer">
        Showing {filteredTransactions.length} of {transactions.length}{" "}
        transactions
      </div>
    </section>
  );
}
