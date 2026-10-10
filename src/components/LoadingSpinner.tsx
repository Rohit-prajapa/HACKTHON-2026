import { LoaderCircle } from "lucide-react";

interface LoadingSpinnerProps {
  label?: string;
  size?: number;
}

export default function LoadingSpinner({
  label = "Loading...",
  size = 24,
}: LoadingSpinnerProps) {
  return (
    <div className="loading-state" role="status" aria-live="polite">
      <LoaderCircle className="loading-spinner-icon" size={size} />
      <span>{label}</span>
    </div>
  );
}
