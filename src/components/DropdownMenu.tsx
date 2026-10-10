import { useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";

interface DropdownMenuItem {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  destructive?: boolean;
}

interface DropdownMenuProps {
  trigger: ReactNode;
  items: DropdownMenuItem[];
  className?: string;
}

export default function DropdownMenu({
  trigger,
  items,
  className = "",
}: DropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div className={`dropdown-menu ${className}`} ref={menuRef}>
      <button
        type="button"
        className="dropdown-menu-trigger"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((previous) => !previous)}
      >
        {trigger}
        <ChevronDown size={15} />
      </button>

      {open && (
        <div className="dropdown-menu-list" role="menu">
          {items.map((item) => (
            <button
              key={item.label}
              type="button"
              role="menuitem"
              className={`dropdown-menu-item ${
                item.destructive ? "destructive" : ""
              }`}
              disabled={item.disabled}
              onClick={() => {
                item.onClick();
                setOpen(false);
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
