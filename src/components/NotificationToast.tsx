import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import { useEffect } from "react";

export type ToastType = "success" | "error" | "info";

interface NotificationToastProps {
  type: ToastType;
  title: string;
  message: string;
  onClose: () => void;
  duration?: number;
}

export default function NotificationToast({
  type,
  title,
  message,
  onClose,
  duration = 4000,
}: NotificationToastProps) {
  useEffect(() => {
    if (duration <= 0) return;

    const timer = window.setTimeout(onClose, duration);
    return () => window.clearTimeout(timer);
  }, [duration, onClose]);

  const Icon =
    type === "success" ? CheckCircle2 : type === "error" ? AlertCircle : Info;

  return (
    <div
      className={`notification-toast toast-${type}`}
      role={type === "error" ? "alert" : "status"}
      aria-live={type === "error" ? "assertive" : "polite"}
    >
      <Icon size={22} className="notification-toast-icon" />

      <div className="notification-toast-content">
        <strong>{title}</strong>
        <p>{message}</p>
      </div>

      <button
        type="button"
        className="notification-toast-close"
        onClick={onClose}
        aria-label="Dismiss notification"
      >
        <X size={18} />
      </button>
    </div>
  );
}
