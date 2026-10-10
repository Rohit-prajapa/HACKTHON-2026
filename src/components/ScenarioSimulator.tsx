import { useMemo, useState } from "react";
import { RotateCcw, TrendingDown, TrendingUp } from "lucide-react";
import type { ForecastDay } from "../services/types";
import { calculateScenarioForecast } from "../utils/calculations";
import { formatCurrency } from "../utils/formatters";

interface ScenarioSimulatorProps {
  forecast: ForecastDay[];
  currency?: string;
}

export default function ScenarioSimulator({
  forecast,
  currency = "USD",
}: ScenarioSimulatorProps) {
  const [inflowChange, setInflowChange] = useState(0);
  const [outflowChange, setOutflowChange] = useState(0);
  const [threshold, setThreshold] = useState(500000);

  const simulatedForecast = useMemo(
    () =>
      calculateScenarioForecast(forecast, {
        inflowChangePercent: inflowChange,
        outflowChangePercent: outflowChange,
        threshold,
      }),
    [forecast, inflowChange, outflowChange, threshold],
  );

  const baselineMinimum =
    forecast.length > 0
      ? Math.min(...forecast.map((day) => day.projectedBalance))
      : 0;

  const simulatedMinimum =
    simulatedForecast.length > 0
      ? Math.min(...simulatedForecast.map((day) => day.projectedBalance))
      : 0;

  const difference = simulatedMinimum - baselineMinimum;

  function resetScenario() {
    setInflowChange(0);
    setOutflowChange(0);
    setThreshold(500000);
  }

  return (
    <section className="scenario-simulator">
      <div className="scenario-header">
        <div>
          <h3>What-if scenario</h3>
          <p>Adjust assumptions to explore liquidity impact.</p>
        </div>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={resetScenario}
        >
          <RotateCcw size={16} />
          Reset
        </button>
      </div>

      <div className="scenario-controls">
        <label className="scenario-control">
          <span>Inflow change</span>
          <strong>
            {inflowChange > 0 ? "+" : ""}
            {inflowChange}%
          </strong>
          <input
            type="range"
            min={-50}
            max={50}
            step={5}
            value={inflowChange}
            onChange={(event) => setInflowChange(Number(event.target.value))}
          />
          <small>Change expected cash received</small>
        </label>

        <label className="scenario-control">
          <span>Outflow change</span>
          <strong>
            {outflowChange > 0 ? "+" : ""}
            {outflowChange}%
          </strong>
          <input
            type="range"
            min={-50}
            max={50}
            step={5}
            value={outflowChange}
            onChange={(event) => setOutflowChange(Number(event.target.value))}
          />
          <small>Change expected cash paid</small>
        </label>

        <label className="scenario-control">
          <span>Minimum cash threshold</span>
          <strong>{formatCurrency(threshold, currency)}</strong>
          <input
            type="range"
            min={0}
            max={2000000}
            step={50000}
            value={threshold}
            onChange={(event) => setThreshold(Number(event.target.value))}
          />
          <small>Required minimum cash reserve</small>
        </label>
      </div>

      <div className="scenario-results">
        <article>
          <span>Baseline minimum balance</span>
          <strong>{formatCurrency(baselineMinimum, currency)}</strong>
        </article>

        <article>
          <span>Scenario minimum balance</span>
          <strong>{formatCurrency(simulatedMinimum, currency)}</strong>
        </article>

        <article
          className={difference < 0 ? "scenario-negative" : "scenario-positive"}
        >
          <span>Change in minimum balance</span>
          <strong>
            {difference > 0 ? "+" : ""}
            {formatCurrency(difference, currency)}
          </strong>
          {difference < 0 ? (
            <TrendingDown size={18} />
          ) : (
            <TrendingUp size={18} />
          )}
        </article>
      </div>

      {simulatedMinimum < threshold && (
        <div className="scenario-warning" role="status">
          <strong>Liquidity risk:</strong> The scenario's minimum projected
          balance falls below your selected cash threshold.
        </div>
      )}
    </section>
  );
}
