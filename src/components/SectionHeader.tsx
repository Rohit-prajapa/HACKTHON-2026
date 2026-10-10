import type { ReactNode } from "react";

interface SectionHeaderProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

export default function SectionHeader({
  title,
  description,
  action,
}: SectionHeaderProps) {
  return (
    <div className="section-header">
      <div className="section-header-content">
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>

      {action && <div className="section-header-action">{action}</div>}
    </div>
  );
}
