interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  variant?: "text" | "circular" | "rectangular";
  count?: number;
  className?: string;
}

export default function Skeleton({
  width,
  height,
  variant = "rectangular",
  count = 1,
  className = "",
}: SkeletonProps) {
  return (
    <div className="skeleton-group" aria-hidden="true">
      {Array.from({ length: Math.max(0, count) }, (_, index) => (
        <span
          key={index}
          className={`skeleton skeleton-${variant} ${className}`}
          style={{
            width: width ?? (variant === "text" ? "100%" : 120),
            height: height ?? (variant === "text" ? 14 : 80),
          }}
        />
      ))}
    </div>
  );
}
