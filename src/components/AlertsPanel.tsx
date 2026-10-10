import { AlertTriangle, Info, CheckCircle2, Check } from "lucide-react";
import type { LiquidityAlert } from "../services/types";

interface AlertsPanelProps {
  alerts: LiquidityAlert[];
  onAcknowledge?: (alertId: string) => void;
  onViewAll?: () => void;
}

export default function AlertsPanel({
  alerts,
  onAcknowledge,
  onViewAll,
}: AlertsPanelProps) {
  const sortedAlerts = [...alerts].sort(
    (a, b) => Number(a.acknowledged) - Number(b.acknowledged),
  );

  const getIcon = (severity: LiquidityAlert["severity"]) => {
    switch (severity) {
      case "critical":
        return <AlertTriangle size={19} />;
      case "warning":
        return <AlertTriangle size={19} />;
      case "info":
        return <Info size={19} />;
      default:
        return <Info size={19} />;
    }
  };

  return (
    <section className="alerts-panel">
      <div className="alerts-panel-header">
        <div>
          <h3>Liquidity alerts</h3>
          <p>
            {alerts.filter((alert) => !alert.acknowledged).length}{" "}
            unacknowledged alert(s)
          </p>
        </div>

        {onViewAll && (
          <button type="button" className="text-button" onClick={onViewAll}>
            View all
          </button>
        )}
      </div>

      {sortedAlerts.length === 0 ? (
        <div className="alerts-empty">
          <CheckCircle2 size={28} />
          <p>You're all caught up. No alerts to display.</p>
        </div>
      ) : (
        <div className="alerts-list">
          {sortedAlerts.map((alert) => (
            <article
              key={alert.id}
              className={`alert-item alert-${alert.severity} ${
                alert.acknowledged ? "alert-acknowledged" : ""
              }`}
            >
              <div className="alert-icon">{getIcon(alert.severity)}</div>

              <div className="alert-content">
                <div className="alert-title-row">
                  <h4>{alert.title}</h4>
                  {alert.acknowledged && (
                    <span className="alert-acknowledged-label">
                      Acknowledged
                    </span>
                  )}
                </div>

                <p>{alert.message}</p>

                <time dateTime={alert.date}>{alert.date}</time>
              </div>

              {!alert.acknowledged && onAcknowledge && (
                <button
                  type="button"
                  className="alert-acknowledge-button"
                  onClick={() => onAcknowledge(alert.id)}
                  aria-label={`Acknowledge ${alert.title}`}
                  title="Acknowledge alert"
                >
                  <Check size={17} />
                </button>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
