type Status =
  | "completed"
  | "pending"
  | "scheduled"
  | "critical"
  | "warning"
  | "info"
  | "ready"
  | "processing"
  | "failed";

interface StatusBadgeProps {
  status: Status;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={`status-badge status-${status}`}>
      <span className="status-dot" aria-hidden="true" />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}
