import { Search, X } from "lucide-react";
import { useState, type ChangeEvent, type FormEvent } from "react";

interface SearchInputProps {
  placeholder?: string;
  onSearch: (value: string) => void;
  initialValue?: string;
  className?: string;
}

export default function SearchInput({
  placeholder = "Search...",
  onSearch,
  initialValue = "",
  className = "",
}: SearchInputProps) {
  const [value, setValue] = useState(initialValue);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.target.value;
    setValue(nextValue);
    onSearch(nextValue);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(value.trim());
  };

  const clearSearch = () => {
    setValue("");
    onSearch("");
  };

  return (
    <form
      className={`search-input ${className}`}
      onSubmit={handleSubmit}
      role="search"
    >
      <Search size={18} className="search-input-icon" />

      <input
        type="search"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        aria-label={placeholder}
      />

      {value && (
        <button
          type="button"
          className="search-input-clear"
          onClick={clearSearch}
          aria-label="Clear search"
        >
          <X size={16} />
        </button>
      )}
    </form>
  );
}
