import { useState } from "react";
import { Check, Copy } from "lucide-react";

interface CopyButtonProps {
  text: string;
  label?: string;
  className?: string;
}

export default function CopyButton({
  text,
  label = "Copy",
  className = "",
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);

      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      className={`copy-button ${className}`}
      onClick={handleCopy}
      aria-label={copied ? "Copied to clipboard" : label}
      title={copied ? "Copied!" : label}
    >
      {copied ? <Check size={16} /> : <Copy size={16} />}
      <span>{copied ? "Copied" : label}</span>
    </button>
  );
}
