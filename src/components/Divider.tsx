interface DividerProps {
  label?: string;
  orientation?: "horizontal" | "vertical";
  className?: string;
}

export default function Divider({
  label,
  orientation = "horizontal",
  className = "",
}: DividerProps) {
  if (orientation === "vertical") {
    return (
      <span
        className={`divider divider-vertical ${className}`}
        role="separator"
        aria-orientation="vertical"
      />
    );
  }

  if (!label) {
    return <hr className={`divider divider-horizontal ${className}`} />;
  }

  return (
    <div
      className={`divider-with-label ${className}`}
      role="separator"
      aria-label={label}
    >
      <span />
      <span className="divider-label">{label}</span>
      <span />
    </div>
  );
}
