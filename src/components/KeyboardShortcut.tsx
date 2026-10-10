import type { ReactNode } from "react";

interface KeyboardShortcutProps {
  keys: string[];
  children?: ReactNode;
  className?: string;
}

export default function KeyboardShortcut({
  keys,
  children,
  className = "",
}: KeyboardShortcutProps) {
  return (
    <span className={`keyboard-shortcut ${className}`}>
      {children && <span className="keyboard-shortcut-label">{children}</span>}

      <span className="keyboard-shortcut-keys">
        {keys.map((key, index) => (
          <span key={`${key}-${index}`}>
            {index > 0 && <span className="keyboard-shortcut-plus">+</span>}
            <kbd>{key}</kbd>
          </span>
        ))}
      </span>
    </span>
  );
}
