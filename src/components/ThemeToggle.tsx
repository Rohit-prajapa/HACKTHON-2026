import { Moon, Sun } from "lucide-react";

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
  className?: string;
}

export default function ThemeToggle({
  isDark,
  onToggle,
  className = "",
}: ThemeToggleProps) {
  return (
    <button
      type="button"
      className={`theme-toggle ${className}`}
      onClick={onToggle}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
