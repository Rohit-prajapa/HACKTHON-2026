interface RelativeTimeProps {
  date: string | Date;
  className?: string;
}

export default function RelativeTime({
  date,
  className = "",
}: RelativeTimeProps) {
  const timestamp = new Date(date).getTime();
  const now = Date.now();

  if (Number.isNaN(timestamp)) {
    return <span className={className}>Unknown date</span>;
  }

  const seconds = Math.round((timestamp - now) / 1000);
  const formatter = new Intl.RelativeTimeFormat("en", {
    numeric: "auto",
  });

  const units: [Intl.RelativeTimeFormatUnit, number][] = [
    ["year", 60 * 60 * 24 * 365],
    ["month", 60 * 60 * 24 * 30],
    ["week", 60 * 60 * 24 * 7],
    ["day", 60 * 60 * 24],
    ["hour", 60 * 60],
    ["minute", 60],
    ["second", 1],
  ];

  const [unit, divisor] =
    units.find(([, size]) => Math.abs(seconds) >= size) ?? units[6];

  const relative = formatter.format(Math.round(seconds / divisor), unit);

  return (
    <time
      className={className}
      dateTime={new Date(timestamp).toISOString()}
      title={new Date(timestamp).toLocaleString()}
    >
      {relative}
    </time>
  );
}
