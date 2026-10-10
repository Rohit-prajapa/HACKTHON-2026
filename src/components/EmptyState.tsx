import { Inbox } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function EmptyState({
  title = "No data found",
  description = "There is nothing to display here yet.",
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">
        <Inbox size={32} />
      </div>

      <h3>{title}</h3>
      <p>{description}</p>

      {actionLabel && onAction && (
        <button type="button" className="btn btn-primary" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}
