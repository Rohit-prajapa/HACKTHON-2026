import { CalendarDays } from "lucide-react";

interface DateLabelProps {
  date: string;
  showIcon?: boolean;
  className?: string;
}

export default function DateLabel({
  date,
  showIcon = true,
  className = "",
}: DateLabelProps) {
  const parsedDate = new Date(`${date}T00:00:00`);

  const formattedDate = Number.isNaN(parsedDate.getTime())
    ? date
    : new Intl.DateTimeFormat("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }).format(parsedDate);

  return (
    <span className={`date-label ${className}`}>
      {showIcon && <CalendarDays size={14} aria-hidden="true" />}
      <time dateTime={date}>{formattedDate}</time>
    </span>
  );
}
