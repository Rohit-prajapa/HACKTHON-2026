import {
  LayoutDashboard,
  ArrowLeftRight,
  ChartNoAxesCombined,
  Bell,
  SlidersHorizontal,
  Bot,
  FileText,
  Settings,
  Wallet,
  X,
} from "lucide-react";

interface SidebarProps {
  activePage: string;
  onNavigate: (page: string) => void;
  alertCount?: number;
  mobileOpen?: boolean;
  onClose?: () => void;
}

const navigation = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "transactions", label: "Transactions", icon: ArrowLeftRight },
  { id: "forecast", label: "Cash Forecast", icon: ChartNoAxesCombined },
  { id: "alerts", label: "Liquidity Alerts", icon: Bell },
  { id: "scenarios", label: "Scenario Planning", icon: SlidersHorizontal },
  { id: "treasury-ai", label: "Treasury AI", icon: Bot },
  { id: "reports", label: "Reports", icon: FileText },
  { id: "settings", label: "Settings", icon: Settings },
];

export default function Sidebar({
  activePage,
  onNavigate,
  alertCount = 0,
  mobileOpen = false,
  onClose,
}: SidebarProps) {
  function navigate(page: string) {
    onNavigate(page);
    onClose?.();
  }

  return (
    <>
      {mobileOpen && (
        <button
          type="button"
          className="sidebar-backdrop"
          aria-label="Close navigation"
          onClick={onClose}
        />
      )}

      <aside className={`sidebar ${mobileOpen ? "sidebar-open" : ""}`}>
        <div className="sidebar-brand">
          <div className="sidebar-logo">
            <Wallet size={23} />
          </div>

          <div className="sidebar-brand-text">
            <strong>Treasury Pulse</strong>
            <span>LIQUIDITY COMMAND</span>
          </div>

          <button
            type="button"
            className="sidebar-close"
            aria-label="Close sidebar"
            onClick={onClose}
          >
            <X size={19} />
          </button>
        </div>

        <div className="sidebar-section-label">WORKSPACE</div>

        <nav className="sidebar-navigation" aria-label="Main navigation">
          {navigation.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              className={`sidebar-nav-item ${
                activePage === id ? "active" : ""
              }`}
              onClick={() => navigate(id)}
              aria-current={activePage === id ? "page" : undefined}
            >
              <Icon size={19} />
              <span>{label}</span>

              {id === "alerts" && alertCount > 0 && (
                <span className="sidebar-alert-count">
                  {alertCount > 99 ? "99+" : alertCount}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-status-dot" />
          <div>
            <strong>Demo environment</strong>
            <span>Using sample data</span>
          </div>
        </div>
      </aside>
    </>
  );
}
