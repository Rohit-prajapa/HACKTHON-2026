import { UserRound } from "lucide-react";

interface AvatarProps {
  name?: string;
  imageUrl?: string;
  size?: "small" | "medium" | "large";
  className?: string;
}

export default function Avatar({
  name = "User",
  imageUrl,
  size = "medium",
  className = "",
}: AvatarProps) {
  const initials = name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");

  return (
    <span
      className={`avatar avatar-${size} ${className}`}
      title={name}
      aria-label={`Avatar for ${name}`}
      role="img"
    >
      {imageUrl ? (
        <img src={imageUrl} alt="" />
      ) : initials ? (
        initials
      ) : (
        <UserRound size={18} />
      )}
    </span>
  );
}
