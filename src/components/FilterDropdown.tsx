import { ChevronDown } from "lucide-react";

export interface FilterOption {
  label: string;
  value: string;
}

interface FilterDropdownProps {
  label: string;
  value: string;
  options: FilterOption[];
  onChange: (value: string) => void;
  className?: string;
}

export default function FilterDropdown({
  label,
  value,
  options,
  onChange,
  className = "",
}: FilterDropdownProps) {
  return (
    <label className={`filter-dropdown ${className}`}>
      <span className="filter-dropdown-label">{label}</span>

      <span className="filter-dropdown-control">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          aria-label={label}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <ChevronDown
          size={16}
          className="filter-dropdown-icon"
          aria-hidden="true"
        />
      </span>
    </label>
  );
}
