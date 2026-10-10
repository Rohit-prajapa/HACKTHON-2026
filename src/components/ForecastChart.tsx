import { useMemo } from "react";
import type { ForecastDay } from "../services/types";

interface ForecastChartProps {
  data: ForecastDay[];
  currency?: string;
}

export default function ForecastChart({
  data,
  currency = "USD",
}: ForecastChartProps) {
  const width = 720;
  const height = 260;
  const padding = { top: 20, right: 20, bottom: 38, left: 65 };

  const chart = useMemo(() => {
    if (data.length === 0) return null;

    const values = data.flatMap((day) => [day.projectedBalance, day.threshold]);

    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min || 1;

    const x = (index: number) =>
      padding.left +
      (index / Math.max(data.length - 1, 1)) *
        (width - padding.left - padding.right);

    const y = (value: number) =>
      height -
      padding.bottom -
      ((value - min) / range) * (height - padding.top - padding.bottom);

    const balancePath = data
      .map(
        (day, index) =>
          `${index === 0 ? "M" : "L"} ${x(index)} ${y(day.projectedBalance)}`,
      )
      .join(" ");

    const thresholdPath = data
      .map(
        (day, index) =>
          `${index === 0 ? "M" : "L"} ${x(index)} ${y(day.threshold)}`,
      )
      .join(" ");

    return { x, y, balancePath, thresholdPath, min, max };
  }, [data]);

  const formatAmount = (amount: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(amount);

  if (!chart) {
    return (
      <div className="empty-state">
        <p>No forecast data available.</p>
      </div>
    );
  }

  return (
    <section className="forecast-chart-card">
      <div className="forecast-chart-heading">
        <div>
          <h3>Projected cash balance</h3>
          <p>30-day liquidity outlook</p>
        </div>

        <div className="forecast-chart-legend">
          <span>
            <i className="legend-dot balance-dot" />
            Projected balance
          </span>
          <span>
            <i className="legend-dot threshold-dot" />
            Cash threshold
          </span>
        </div>
      </div>

      <div className="forecast-chart-scroll">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-label="Projected cash balance and minimum cash threshold forecast"
          className="forecast-chart-svg"
        >
          {[0, 1, 2, 3, 4].map((step) => {
            const value = chart.max - ((chart.max - chart.min) * step) / 4;
            const y = chart.y(value);

            return (
              <g key={step}>
                <line
                  x1={padding.left}
                  x2={width - padding.right}
                  y1={y}
                  y2={y}
                  className="chart-grid-line"
                />
                <text
                  x={padding.left - 10}
                  y={y + 4}
                  textAnchor="end"
                  className="chart-axis-label"
                >
                  {formatAmount(value)}
                </text>
              </g>
            );
          })}

          <path d={chart.thresholdPath} className="forecast-threshold-line" />

          <path d={chart.balancePath} className="forecast-balance-line" />

          {data.map((day, index) => (
            <circle
              key={day.date}
              cx={chart.x(index)}
              cy={chart.y(day.projectedBalance)}
              r={index === data.length - 1 ? 4 : 2}
              className="forecast-balance-point"
            >
              <title>
                {day.date}: {formatAmount(day.projectedBalance)}
              </title>
            </circle>
          ))}

          {[0, Math.floor((data.length - 1) / 2), data.length - 1].map(
            (index) => (
              <text
                key={data[index].date}
                x={chart.x(index)}
                y={height - 12}
                textAnchor="middle"
                className="chart-axis-label"
              >
                {new Date(`${data[index].date}T12:00:00`).toLocaleDateString(
                  "en-US",
                  {
                    month: "short",
                    day: "numeric",
                  },
                )}
              </text>
            ),
          )}
        </svg>
      </div>
    </section>
  );
}
