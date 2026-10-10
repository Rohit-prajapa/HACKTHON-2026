import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "success" | "warning" | "danger" | "info";
  size?: "small" | "medium";
  className?: string;
}

export default function Badge({
  children,
  variant = "default",
  size = "medium",
  className = "",
}: BadgeProps) {
  return (
    <span className={`badge badge-${variant} badge-${size} ${className}`}>
      {children}
    </span>
  );
}
