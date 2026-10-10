import { Bell, Menu, Search, CalendarDays } from "lucide-react";
import { useState } from "react";

interface TopbarProps {
  title: string;
  subtitle?: string;
  alertCount?: number;
  onMenuClick?: () => void;
  onAlertsClick?: () => void;
  onSearch?: (query: string) => void;
}

export default function Topbar({
  title,
  subtitle = "Monitor your global liquidity position",
  alertCount = 0,
  onMenuClick,
  onAlertsClick,
  onSearch,
}: TopbarProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  function submitSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSearch?.(query.trim());
  }

  return (
    <header className="topbar">
      <div className="topbar-heading">
        <button
          type="button"
          className="topbar-menu-button"
          aria-label="Open navigation"
          onClick={onMenuClick}
        >
          <Menu size={22} />
        </button>

        <div>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
      </div>

      <div className="topbar-actions">
        {searchOpen ? (
          <form className="topbar-search-form" onSubmit={submitSearch}>
            <input
              type="search"
              autoFocus
              value={query}
              placeholder="Search..."
              aria-label="Search dashboard"
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Escape") {
                  setSearchOpen(false);
                  setQuery("");
                }
              }}
            />
            <button type="submit" aria-label="Submit search">
              <Search size={18} />
            </button>
          </form>
        ) : (
          <button
            type="button"
            className="topbar-icon-button"
            aria-label="Open search"
            onClick={() => setSearchOpen(true)}
          >
            <Search size={19} />
          </button>
        )}

        <div className="topbar-date">
          <CalendarDays size={17} />
          <span>
            {new Date().toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>

        <button
          type="button"
          className="topbar-icon-button topbar-alert-button"
          aria-label={`${alertCount} unacknowledged alerts`}
          onClick={onAlertsClick}
        >
          <Bell size={19} />
          {alertCount > 0 && (
            <span className="topbar-alert-indicator">
              {alertCount > 99 ? "99+" : alertCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
