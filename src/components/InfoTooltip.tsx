import { Info } from "lucide-react";

interface InfoTooltipProps {
  text: string;
  className?: string;
}

export default function InfoTooltip({
  text,
  className = "",
}: InfoTooltipProps) {
  return (
    <span className={`info-tooltip ${className}`}>
      <button
        type="button"
        className="info-tooltip-trigger"
        aria-label={`Information: ${text}`}
        title={text}
      >
        <Info size={15} />
      </button>

      <span className="info-tooltip-content" role="tooltip">
        {text}
      </span>
    </span>
  );
}
