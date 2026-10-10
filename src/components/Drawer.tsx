import { useEffect, type ReactNode } from "react";
import { X } from "lucide-react";

interface DrawerProps {
  open: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
  side?: "left" | "right";
}

export default function Drawer({
  open,
  title,
  children,
  onClose,
  side = "right",
}: DrawerProps) {
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="drawer-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <aside
        className={`drawer drawer-${side}`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <header className="drawer-header">
          <h2>{title}</h2>

          <button
            type="button"
            className="drawer-close-button"
            onClick={onClose}
            aria-label="Close drawer"
          >
            <X size={18} />
          </button>
        </header>

        <div className="drawer-content">{children}</div>
      </aside>
    </div>
  );
}
