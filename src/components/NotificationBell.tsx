import { Bell } from "lucide-react";

interface NotificationBellProps {
  count?: number;
  onClick: () => void;
  className?: string;
}

export default function NotificationBell({
  count = 0,
  onClick,
  className = "",
}: NotificationBellProps) {
  const safeCount = Math.max(0, count);

  return (
    <button
      type="button"
      className={`notification-bell ${className}`}
      onClick={onClick}
      aria-label={
        safeCount > 0 ? `Notifications, ${safeCount} unread` : "Notifications"
      }
      title="Notifications"
    >
      <Bell size={19} />

      {safeCount > 0 && (
        <span className="notification-bell-count">
          {safeCount > 99 ? "99+" : safeCount}
        </span>
      )}
    </button>
  );
}
