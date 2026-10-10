import type { ReactNode } from "react";

interface TooltipProps {
  content: string;
  children: ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  className?: string;
}

export default function Tooltip({
  content,
  children,
  position = "top",
  className = "",
}: TooltipProps) {
  return (
    <span className={`tooltip-wrapper ${className}`}>
      {children}
      <span className={`tooltip-content tooltip-${position}`} role="tooltip">
        {content}
      </span>
    </span>
  );
}
