interface LegendItem {
  label: string;
  color: string;
  value?: string;
}

interface ChartLegendProps {
  items: LegendItem[];
  className?: string;
}

export default function ChartLegend({
  items,
  className = "",
}: ChartLegendProps) {
  return (
    <div className={`chart-legend ${className}`}>
      {items.map((item) => (
        <div className="chart-legend-item" key={item.label}>
          <span
            className="chart-legend-dot"
            style={{ backgroundColor: item.color }}
            aria-hidden="true"
          />

          <span className="chart-legend-label">{item.label}</span>

          {item.value !== undefined && (
            <span className="chart-legend-value">{item.value}</span>
          )}
        </div>
      ))}
    </div>
  );
}
