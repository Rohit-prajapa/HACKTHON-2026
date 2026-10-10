import { CalendarDays } from "lucide-react";

interface DateRangePickerProps {
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  className?: string;
}

export default function DateRangePicker({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  className = "",
}: DateRangePickerProps) {
  return (
    <div className={`date-range-picker ${className}`}>
      <CalendarDays
        size={18}
        className="date-range-picker-icon"
        aria-hidden="true"
      />

      <label className="date-range-field">
        <span>From</span>
        <input
          type="date"
          value={startDate}
          max={endDate || undefined}
          onChange={(event) => onStartDateChange(event.target.value)}
        />
      </label>

      <span className="date-range-separator" aria-hidden="true">
        to
      </span>

      <label className="date-range-field">
        <span>To</span>
        <input
          type="date"
          value={endDate}
          min={startDate || undefined}
          onChange={(event) => onEndDateChange(event.target.value)}
        />
      </label>
    </div>
  );
}
