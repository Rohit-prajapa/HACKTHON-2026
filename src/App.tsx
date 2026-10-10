import React, { useMemo, useState } from "react";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  Bot,
  Building2,
  ChevronDown,
  CircleAlert,
  FileText,
  LayoutDashboard,
  Menu,
  Moon,
  Search,
  Settings,
  ShieldCheck,
  Sun,
  TrendingUp,
  Wallet,
  X,
} from "lucide-react";

type Transaction = {
  id: string;
  date: string;
  entity: string;
  currency: string;
  category: string;
  direction: "Inflow" | "Outflow";
  amount: number;
  status: "Expected" | "Scheduled" | "Settled";
};

type Region = {
  id: string;
  name: string;
  description: string;
  transactions: string;
  entities: string[];
};

const initialTransactions: Transaction[] = [
  {
    id: "TX-20481",
    date: "2026-10-10",
    entity: "New York",
    currency: "USD",
    category: "Customer receipt",
    direction: "Inflow",
    amount: 125000,
    status: "Expected",
  },
  {
    id: "TX-20480",
    date: "2026-10-10",
    entity: "London",
    currency: "GBP",
    category: "Supplier payment",
    direction: "Outflow",
    amount: 42000,
    status: "Scheduled",
  },
  {
    id: "TX-20479",
    date: "2026-10-09",
    entity: "BNP Paris",
    currency: "EUR",
    category: "Invoice collection",
    direction: "Inflow",
    amount: 92000,
    status: "Settled",
  },
  {
    id: "TX-20478",
    date: "2026-10-09",
    entity: "Mumbai",
    currency: "INR",
    category: "Payroll",
    direction: "Outflow",
    amount: 180000,
    status: "Scheduled",
  },
  {
    id: "TX-20477",
    date: "2026-10-08",
    entity: "Singapore",
    currency: "SGD",
    category: "Customer receipt",
    direction: "Inflow",
    amount: 75000,
    status: "Expected",
  },
  {
    id: "TX-20476",
    date: "2026-10-08",
    entity: "Tokyo",
    currency: "JPY",
    category: "Supplier payment",
    direction: "Outflow",
    amount: 420000,
    status: "Scheduled",
  },
  {
    id: "TX-20475",
    date: "2026-10-07",
    entity: "New York",
    currency: "USD",
    category: "Capex",
    direction: "Outflow",
    amount: 68000,
    status: "Scheduled",
  },
  {
    id: "TX-20474",
    date: "2026-10-07",
    entity: "London",
    currency: "GBP",
    category: "Customer receipt",
    direction: "Inflow",
    amount: 80000,
    status: "Settled",
  },
  // Synthetic entity-specific rows used by the Entity Explorer demo.
  {
    id: "TX-20473",
    date: "2026-10-10",
    entity: "Belgium",
    currency: "EUR",
    category: "Customer receipt",
    direction: "Inflow",
    amount: 148000,
    status: "Expected",
  },
  {
    id: "TX-20472",
    date: "2026-10-09",
    entity: "Belgium",
    currency: "EUR",
    category: "Supplier payment",
    direction: "Outflow",
    amount: 63500,
    status: "Scheduled",
  },
  {
    id: "TX-20471",
    date: "2026-10-10",
    entity: "France",
    currency: "EUR",
    category: "Invoice collection",
    direction: "Inflow",
    amount: 210000,
    status: "Expected",
  },
  {
    id: "TX-20470",
    date: "2026-10-09",
    entity: "France",
    currency: "EUR",
    category: "Payroll",
    direction: "Outflow",
    amount: 91000,
    status: "Scheduled",
  },
  {
    id: "TX-20469",
    date: "2026-10-10",
    entity: "UK",
    currency: "GBP",
    category: "Customer receipt",
    direction: "Inflow",
    amount: 132000,
    status: "Expected",
  },
  {
    id: "TX-20468",
    date: "2026-10-09",
    entity: "UK",
    currency: "GBP",
    category: "Supplier payment",
    direction: "Outflow",
    amount: 57000,
    status: "Scheduled",
  },
  {
    id: "TX-20467",
    date: "2026-10-10",
    entity: "UAE",
    currency: "AED",
    category: "Customer receipt",
    direction: "Inflow",
    amount: 97000,
    status: "Expected",
  },
  {
    id: "TX-20466",
    date: "2026-10-09",
    entity: "UAE",
    currency: "AED",
    category: "Operating expense",
    direction: "Outflow",
    amount: 36000,
    status: "Scheduled",
  },
  {
    id: "TX-20465",
    date: "2026-10-10",
    entity: "HK",
    currency: "HKD",
    category: "Customer receipt",
    direction: "Inflow",
    amount: 78000,
    status: "Expected",
  },
  {
    id: "TX-20464",
    date: "2026-10-09",
    entity: "HK",
    currency: "HKD",
    category: "Supplier payment",
    direction: "Outflow",
    amount: 31000,
    status: "Scheduled",
  },
  {
    id: "TX-20463",
    date: "2026-10-10",
    entity: "Hong Kong",
    currency: "HKD",
    category: "Invoice collection",
    direction: "Inflow",
    amount: 85000,
    status: "Expected",
  },
  {
    id: "TX-20462",
    date: "2026-10-09",
    entity: "Hong Kong",
    currency: "HKD",
    category: "Payroll",
    direction: "Outflow",
    amount: 39000,
    status: "Scheduled",
  },
  {
    id: "TX-20461",
    date: "2026-10-10",
    entity: "India",
    currency: "INR",
    category: "Customer receipt",
    direction: "Inflow",
    amount: 245000,
    status: "Expected",
  },
  {
    id: "TX-20460",
    date: "2026-10-09",
    entity: "India",
    currency: "INR",
    category: "Payroll",
    direction: "Outflow",
    amount: 118000,
    status: "Scheduled",
  },
  {
    id: "TX-20459",
    date: "2026-10-10",
    entity: "Japan",
    currency: "JPY",
    category: "Customer receipt",
    direction: "Inflow",
    amount: 360000,
    status: "Expected",
  },
  {
    id: "TX-20458",
    date: "2026-10-09",
    entity: "Japan",
    currency: "JPY",
    category: "Supplier payment",
    direction: "Outflow",
    amount: 165000,
    status: "Scheduled",
  },
  {
    id: "TX-20457",
    date: "2026-10-10",
    entity: "Brazil",
    currency: "BRL",
    category: "Invoice collection",
    direction: "Inflow",
    amount: 115000,
    status: "Expected",
  },
  {
    id: "TX-20456",
    date: "2026-10-09",
    entity: "Brazil",
    currency: "BRL",
    category: "Supplier payment",
    direction: "Outflow",
    amount: 48000,
    status: "Scheduled",
  },
  {
    id: "TX-20455",
    date: "2026-10-10",
    entity: "USA",
    currency: "USD",
    category: "Customer receipt",
    direction: "Inflow",
    amount: 325000,
    status: "Expected",
  },
  {
    id: "TX-20454",
    date: "2026-10-09",
    entity: "USA",
    currency: "USD",
    category: "Capex",
    direction: "Outflow",
    amount: 128000,
    status: "Scheduled",
  },
];

const regions: Region[] = [
  {
    id: "EMEA",
    name: "EMEA",
    description: "Europe, Middle East and Africa",
    transactions: "18,484",
    entities: ["Belgium", "France", "UK", "UAE"],
  },
  {
    id: "APAC",
    name: "APAC",
    description: "Asia-Pacific",
    transactions: "18,185",
    entities: ["HK", "Hong Kong", "India", "Japan", "Singapore"],
  },
  {
    id: "AMER",
    name: "AMER",
    description: "Americas",
    transactions: "9,337",
    entities: ["Brazil", "USA"],
  },
];

const navItems = [
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "Transactions", icon: Activity },
  { name: "Forecast", icon: TrendingUp },
  { name: "Alerts", icon: Bell },
  { name: "Scenarios", icon: ShieldCheck },
  { name: "Treasury AI", icon: Bot },
  { name: "Reports", icon: FileText },
  { name: "Entity Explorer", icon: Building2 },
  { name: "Settings", icon: Settings },
];

const forecastData = [
  { day: "10 Oct", value: 12.1 },
  { day: "12 Oct", value: 12.7 },
  { day: "14 Oct", value: 12.4 },
  { day: "16 Oct", value: 13.2 },
  { day: "18 Oct", value: 12.9 },
  { day: "20 Oct", value: 13.7 },
  { day: "22 Oct", value: 13.3 },
  { day: "24 Oct", value: 14.1 },
  { day: "26 Oct", value: 13.8 },
  { day: "28 Oct", value: 14.5 },
];

const alerts = [
  {
    entity: "Tokyo",
    currency: "JPY",
    severity: "Critical",
    message:
      "Projected liquidity requires review against the minimum threshold.",
    time: "08:42 AM",
  },
  {
    entity: "London",
    currency: "GBP",
    severity: "Warning",
    message: "A large supplier payment is scheduled within the next 48 hours.",
    time: "08:15 AM",
  },
  {
    entity: "New York",
    currency: "USD",
    severity: "Info",
    message: "An expected customer receipt may improve near-term liquidity.",
    time: "Yesterday",
  },
];

function money(value: number) {
  return value.toLocaleString("en-US", { maximumFractionDigits: 2 });
}

function CashChart() {
  const width = 700;
  const height = 230;
  const padding = { top: 15, right: 18, bottom: 30, left: 38 };
  const plotW = width - padding.left - padding.right;
  const plotH = height - padding.top - padding.bottom;
  const points = forecastData.map((item, index) => ({
    ...item,
    x: padding.left + (index * plotW) / (forecastData.length - 1),
    y: height - padding.bottom - ((item.value - 11) / 4) * plotH,
  }));
  const line = points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");
  const area = `${line} L ${points[points.length - 1].x} ${height - padding.bottom} L ${points[0].x} ${height - padding.bottom} Z`;

  return (
    <div className="chart-container">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="cash-chart"
        role="img"
        aria-label="Illustrative cash forecast line chart"
      >
        <defs>
          <linearGradient id="cashGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#43d9b2" stopOpacity=".24" />
            <stop offset="100%" stopColor="#43d9b2" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[11, 12, 13, 14, 15].map((value) => {
          const y = height - padding.bottom - ((value - 11) / 4) * plotH;
          return (
            <g key={value}>
              <line
                x1={padding.left}
                y1={y}
                x2={width - padding.right}
                y2={y}
                stroke="var(--line)"
                strokeDasharray="4 5"
              />
              <text x="1" y={y + 4} fill="var(--muted)" fontSize="10">
                ${value}M
              </text>
            </g>
          );
        })}
        <path d={area} fill="url(#cashGradient)" />
        <path
          d={line}
          fill="none"
          stroke="#43d9b2"
          strokeWidth="3"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {points.map((point) => (
          <g key={point.day}>
            <circle
              cx={point.x}
              cy={point.y}
              r="3.5"
              fill="#43d9b2"
              stroke="var(--panel)"
              strokeWidth="2"
            />
            <text
              x={point.x}
              y={height - 8}
              fill="var(--muted)"
              fontSize="10"
              textAnchor="middle"
            >
              {point.day}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

function PageTitle({
  eyebrow,
  title,
  subtitle,
  action,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="page-title-row">
      <div>
        <div className="eyebrow">{eyebrow}</div>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      {action && <div className="page-action">{action}</div>}
    </div>
  );
}

function PanelTitle({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="panel-title">
      <h2>{title}</h2>
      <p>{subtitle}</p>
    </div>
  );
}

function StatCard({
  label,
  value,
  change,
  sub,
  icon,
}: {
  label: string;
  value: string;
  change: string;
  sub: string;
  icon: React.ReactNode;
}) {
  return (
    <article className="stat-card">
      <div className="stat-top">
        <span>{label}</span>
        <span className="stat-icon">{icon}</span>
      </div>
      <div className="stat-value">{value}</div>
      <div className="stat-bottom">
        <span className="stat-change">{change}</span>
        <span className="muted">{sub}</span>
      </div>
    </article>
  );
}

function TransactionTable({ rows }: { rows: Transaction[] }) {
  if (!rows.length)
    return <div className="empty-state">No transactions found.</div>;
  return (
    <div className="table-scroll">
      <table>
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Entity</th>
            <th>Category</th>
            <th>Date</th>
            <th>Currency</th>
            <th>Direction</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((transaction) => (
            <tr key={transaction.id}>
              <td className="mono">{transaction.id}</td>
              <td>{transaction.entity}</td>
              <td>{transaction.category}</td>
              <td>{transaction.date}</td>
              <td>{transaction.currency}</td>
              <td>
                <span
                  className={`direction ${transaction.direction.toLowerCase()}`}
                >
                  {transaction.direction}
                </span>
              </td>
              <td>{money(transaction.amount)}</td>
              <td>
                <span className={`badge ${transaction.status.toLowerCase()}`}>
                  {transaction.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState("Dashboard");
  const [search, setSearch] = useState("");
  const [entity, setEntity] = useState("All entities");
  const [transactions, setTransactions] =
    useState<Transaction[]>(initialTransactions);
  const [message, setMessage] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [lightTheme, setLightTheme] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [paymentDelay, setPaymentDelay] = useState(2);
  const [fxShock, setFxShock] = useState(5);
  const [postponeCapex, setPostponeCapex] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    {
      role: "assistant",
      text: "Hello! I can explain liquidity gaps, forecasting concepts, and scenario assumptions. This demo assistant does not access live treasury data.",
    },
  ]);

  const filteredTransactions = useMemo(() => {
    const query = search.toLowerCase().trim();
    return transactions.filter((item) => {
      const matchesSearch = Object.values(item)
        .join(" ")
        .toLowerCase()
        .includes(query);
      const matchesEntity = entity === "All entities" || item.entity === entity;
      return matchesSearch && matchesEntity;
    });
  }, [transactions, search, entity]);

  const dashboardTransactions = selectedCountry
    ? transactions.filter(
        (item) => item.entity.toLowerCase() === selectedCountry.toLowerCase(),
      )
    : transactions;
  const dashboardCurrency = dashboardTransactions[0]?.currency ?? "USD";
  const inflows = dashboardTransactions
    .filter((item) => item.direction === "Inflow")
    .reduce((sum, item) => sum + item.amount, 0);
  const outflows = dashboardTransactions
    .filter((item) => item.direction === "Outflow")
    .reduce((sum, item) => sum + item.amount, 0);

  function uploadCsv(file?: File) {
    if (!file) return;
    if (!file.name.toLowerCase().endsWith(".csv")) {
      setMessage("Please select a CSV file.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const lines = String(reader.result ?? "")
        .split(/\r?\n/)
        .filter((line) => line.trim());
      if (lines.length < 2) {
        setMessage("The CSV file contains no transaction rows.");
        return;
      }
      const headers = lines[0]
        .split(",")
        .map((header) => header.trim().toLowerCase());
      const indexOf = (...names: string[]) =>
        headers.findIndex((header) => names.includes(header));
      const idIndex = indexOf("transaction_id", "id");
      const dateIndex = indexOf("transaction_date", "date");
      const entityIndex = indexOf("entity", "entity_name");
      const currencyIndex = indexOf("currency");
      const directionIndex = indexOf("direction");
      const amountIndex = indexOf("amount", "original_amount");
      const categoryIndex = indexOf("category", "product_type");
      const statusIndex = indexOf("status", "settlement_status");
      if (
        [
          idIndex,
          dateIndex,
          entityIndex,
          currencyIndex,
          directionIndex,
          amountIndex,
        ].some((index) => index < 0)
      ) {
        setMessage(
          "Missing required CSV columns: transaction_id, transaction_date, entity, currency, direction, amount.",
        );
        return;
      }
      const existingIds = new Set(transactions.map((item) => item.id));
      const imported: Transaction[] = [];
      let skipped = 0;
      for (const line of lines.slice(1)) {
        const values = line.split(",").map((value) => value.trim());
        const id = values[idIndex];
        const directionText = values[directionIndex]?.toLowerCase();
        const amount = Number((values[amountIndex] || "").replace(/,/g, ""));
        if (
          !id ||
          existingIds.has(id) ||
          !Number.isFinite(amount) ||
          amount < 0 ||
          !["inflow", "outflow", "in", "out"].includes(directionText)
        ) {
          skipped++;
          continue;
        }
        const statusText =
          statusIndex >= 0 ? values[statusIndex]?.toLowerCase() : "";
        imported.push({
          id,
          date: values[dateIndex] || "",
          entity: values[entityIndex] || "Unknown entity",
          currency: (values[currencyIndex] || "USD").toUpperCase(),
          category:
            categoryIndex >= 0
              ? values[categoryIndex] || "Uncategorized"
              : "Uncategorized",
          direction:
            directionText === "outflow" || directionText === "out"
              ? "Outflow"
              : "Inflow",
          amount,
          status:
            statusText === "settled"
              ? "Settled"
              : statusText === "scheduled"
                ? "Scheduled"
                : "Expected",
        });
        existingIds.add(id);
      }
      setTransactions((previous) => [...imported, ...previous]);
      setMessage(
        `Imported ${imported.length} transactions. Skipped ${skipped} invalid or duplicate rows. CSV demo parser does not support every quoted-comma format.`,
      );
      setPage("Transactions");
    };
    reader.onerror = () => setMessage("Could not read the selected file.");
    reader.readAsText(file);
  }

  function exportCsv() {
    const header = [
      "transaction_id",
      "date",
      "entity",
      "currency",
      "category",
      "direction",
      "amount",
      "status",
    ];
    const rowsToExport = selectedCountry
      ? transactions.filter(
          (item) => item.entity.toLowerCase() === selectedCountry.toLowerCase(),
        )
      : filteredTransactions;
    const rows = rowsToExport.map((item) => [
      item.id,
      item.date,
      item.entity,
      item.currency,
      item.category,
      item.direction,
      item.amount,
      item.status,
    ]);
    const csv = [header, ...rows]
      .map((row) =>
        row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(","),
      )
      .join("\n");
    const url = URL.createObjectURL(
      new Blob([csv], { type: "text/csv;charset=utf-8;" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = "treasury-pulse-transactions.csv";
    link.click();
    URL.revokeObjectURL(url);
    setMessage(
      "CSV export generated from the currently displayed transactions.",
    );
  }

  function sendChat(text = chatInput) {
    const question = text.trim();
    if (!question) return;
    let answer =
      "Review the entity, currency, opening balance, dated cash flows, and approved threshold before taking action. This demo assistant does not retrieve live financial data.";
    if (/gap|shortfall|threshold/i.test(question))
      answer =
        "Liquidity gap = projected cash position minus the minimum liquidity threshold. A negative gap means projected cash is below the configured minimum.";
    else if (/forecast|predict/i.test(question))
      answer =
        "A proper 30-day forecast should use historical daily balances, compare against a baseline, and be evaluated on a chronological holdout dataset. This chart is illustrative.";
    else if (/surplus|excess/i.test(question))
      answer =
        "Before acting on a surplus, review upcoming payments, liquidity buffers, currency restrictions, and counterparty exposure. This is a review checklist, not a financial recommendation.";
    setChatMessages((previous) => [
      ...previous,
      { role: "user", text: question },
      { role: "assistant", text: answer },
    ]);
    setChatInput("");
  }

  function pageContent() {
    switch (page) {
      case "Transactions":
        return (
          <>
            <PageTitle
              eyebrow="WORKSPACE / DATA"
              title="Transactions"
              subtitle="Import, search, and review transaction activity."
              action={
                <label className="button primary upload-label">
                  Upload CSV
                  <input
                    type="file"
                    accept=".csv,text/csv"
                    hidden
                    onChange={(event) => uploadCsv(event.target.files?.[0])}
                  />
                </label>
              }
            />
            {message && <div className="notice">{message}</div>}
            <section className="panel">
              <div className="filter-row">
                <div className="search-box">
                  <Search size={16} />
                  <input
                    placeholder="Search transactions..."
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                  />
                </div>
                <select
                  value={entity}
                  onChange={(event) => setEntity(event.target.value)}
                >
                  <option>All entities</option>
                  {[...new Set(transactions.map((item) => item.entity))].map(
                    (name) => (
                      <option key={name}>{name}</option>
                    ),
                  )}
                </select>
                <button className="button outline" onClick={exportCsv}>
                  Export CSV
                </button>
              </div>
              <TransactionTable rows={filteredTransactions} />
            </section>
          </>
        );
      case "Forecast":
        return (
          <>
            <PageTitle
              eyebrow="WORKSPACE / PLANNING"
              title="30-day cash forecast"
              subtitle="Review projected liquidity and forecast uncertainty."
            />
            <div className="notice">
              Demo forecast only. Values are synthetic and are not generated
              from uploaded transaction history.
            </div>
            <section className="panel">
              <PanelTitle
                title="Projected cash movement"
                subtitle="Illustrative values in USD millions"
              />
              <CashChart />
            </section>
            <section className="panel">
              <PanelTitle
                title="Forecast methodology"
                subtitle="Planned implementation"
              />
              <ul className="method-list">
                <li>Prepare daily balances per entity and currency.</li>
                <li>Compare a baseline with Prophet or SARIMA.</li>
                <li>Evaluate the model on historical holdout data.</li>
                <li>Return daily predictions and confidence intervals.</li>
              </ul>
            </section>
          </>
        );
      case "Alerts":
        return (
          <>
            <PageTitle
              eyebrow="WORKSPACE / MONITORING"
              title="Liquidity alerts"
              subtitle="Review potential shortfalls and upcoming cash-flow risks."
            />
            <section className="panel">
              <PanelTitle
                title="Alert inbox"
                subtitle="Illustrative alerts — backend threshold engine not connected"
              />
              {alerts.map((alert) => (
                <div className="alert-row" key={alert.entity}>
                  <div className={`alert-icon ${alert.severity.toLowerCase()}`}>
                    <CircleAlert size={18} />
                  </div>
                  <div className="alert-copy">
                    <b>
                      {alert.entity} · {alert.currency}
                    </b>
                    <p>{alert.message}</p>
                    <small>{alert.time}</small>
                  </div>
                  <span className={`badge ${alert.severity.toLowerCase()}`}>
                    {alert.severity}
                  </span>
                </div>
              ))}
            </section>
          </>
        );
      case "Scenarios":
        return (
          <>
            <PageTitle
              eyebrow="WORKSPACE / SIMULATION"
              title="What-if scenarios"
              subtitle="Explore changes to payment timing, FX, and capex."
            />
            <div className="notice">
              Scenario impact is a simplified UI illustration, not a calculation
              of actual dated cash flows.
            </div>
            <div className="scenario-grid">
              <section className="panel">
                <PanelTitle
                  title="Scenario assumptions"
                  subtitle="Adjust the controls"
                />
                <div className="control">
                  <label>
                    Payment delay <b>{paymentDelay} days</b>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="5"
                    value={paymentDelay}
                    onChange={(event) =>
                      setPaymentDelay(Number(event.target.value))
                    }
                  />
                </div>
                <div className="control">
                  <label>
                    FX shock{" "}
                    <b>
                      {fxShock > 0 ? "+" : ""}
                      {fxShock}%
                    </b>
                  </label>
                  <input
                    type="range"
                    min="-15"
                    max="15"
                    step="5"
                    value={fxShock}
                    onChange={(event) => setFxShock(Number(event.target.value))}
                  />
                </div>
                <label className="checkbox-row">
                  <input
                    type="checkbox"
                    checked={postponeCapex}
                    onChange={(event) => setPostponeCapex(event.target.checked)}
                  />
                  Postpone planned capex
                </label>
              </section>
              <section className="panel">
                <PanelTitle
                  title="Scenario summary"
                  subtitle="Illustrative only"
                />
                <div className="scenario-value">
                  $
                  {(
                    12.48 -
                    paymentDelay * 0.18 -
                    Math.abs(fxShock) * 0.035 +
                    (postponeCapex ? 0.25 : 0)
                  ).toFixed(2)}
                  M
                </div>
                <p className="muted">
                  This number is a UI demonstration and is not a forecast.
                </p>
              </section>
            </div>
          </>
        );
      case "Treasury AI":
        return (
          <>
            <PageTitle
              eyebrow="INTELLIGENCE / ASSISTANT"
              title="Treasury AI"
              subtitle="Ask questions about liquidity concepts and forecasts."
            />
            <section className="panel chat-panel">
              <div className="chat-heading">
                <Bot size={20} />
                <div>
                  <b>Treasury Copilot</b>
                  <small>Demo mode · predefined responses</small>
                </div>
              </div>
              <div className="chat-messages">
                {chatMessages.map((chat, index) => (
                  <div className={`chat-message ${chat.role}`} key={index}>
                    <b>{chat.role === "user" ? "You" : "Treasury Copilot"}</b>
                    <p>{chat.text}</p>
                  </div>
                ))}
              </div>
              <div className="suggestions">
                <button onClick={() => sendChat("Explain liquidity gap")}>
                  Explain liquidity gap
                </button>
                <button onClick={() => sendChat("How does forecasting work?")}>
                  Explain forecasting
                </button>
                <button
                  onClick={() => sendChat("How should I review a surplus?")}
                >
                  Review cash surplus
                </button>
              </div>
              <form
                className="chat-form"
                onSubmit={(event) => {
                  event.preventDefault();
                  sendChat();
                }}
              >
                <input
                  value={chatInput}
                  onChange={(event) => setChatInput(event.target.value)}
                  placeholder="Ask a treasury question..."
                />
                <button className="button primary" type="submit">
                  Send
                </button>
              </form>
            </section>
          </>
        );
      case "Reports":
        return (
          <>
            <PageTitle
              eyebrow="MANAGEMENT / REPORTING"
              title="Reports"
              subtitle="Review report templates and export transaction data."
            />
            {message && <div className="notice">{message}</div>}
            <div className="report-grid">
              {[
                ["Daily cash position", "Cash balances and cash movements"],
                ["30-day forecast", "Daily predictions and uncertainty"],
                ["Liquidity alert register", "Alert list and thresholds"],
                ["Transaction activity", "Imported transaction records"],
              ].map(([title, description]) => (
                <section className="panel report-card" key={title}>
                  <FileText size={22} />
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <button className="button outline" onClick={exportCsv}>
                    Export CSV
                  </button>
                </section>
              ))}
            </div>
          </>
        );
      case "Entity Explorer":
        return (
          <>
            <PageTitle
              eyebrow="MANAGEMENT / ENTITIES"
              title="Entity Explorer"
              subtitle="Select an entity to open its filtered treasury dashboard."
              action={
                <button className="button outline" onClick={exportCsv}>
                  Export CSV{selectedCountry ? ` · ${selectedCountry}` : ""}
                </button>
              }
            />
            <section className="panel region-panel">
              <div className="region-list">
                {regions.map((region, index) => (
                  <div className="region-section" key={region.id}>
                    <div className="region-heading">
                      <div>
                        <h2>
                          {index + 1}. {region.name}
                        </h2>
                        <p>{region.description}</p>
                      </div>
                      <span className="transaction-count">
                        {region.transactions} transactions
                      </span>
                    </div>
                    <div className="entity-grid">
                      {region.entities.map((country) => (
                        <button
                          key={country}
                          className={`entity-button ${selectedCountry === country ? "selected" : ""}`}
                          onClick={() => {
                            setSelectedRegion(region.id);
                            setSelectedCountry(country);
                            setEntity(country);
                            setSearch("");
                            setMessage("");
                            setPage("Dashboard");
                          }}
                        >
                          {country}
                        </button>
                      ))}
                    </div>
                    {selectedRegion === region.id && selectedCountry && (
                      <div className="selected-entity">
                        Selected entity: <strong>{selectedCountry}</strong>{" "}
                        <span>· {region.name}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {message && <div className="notice entity-notice">{message}</div>}
            </section>
          </>
        );
      case "Settings":
        return (
          <>
            <PageTitle
              eyebrow="MANAGEMENT / PREFERENCES"
              title="Settings"
              subtitle="Workspace preferences and prototype configuration."
            />
            <section className="panel settings-panel">
              <PanelTitle
                title="Workspace preferences"
                subtitle="These preferences are local UI state only"
              />
              <label>
                Workspace name
                <input defaultValue="Global Treasury" />
              </label>
              <label>
                Reporting currency
                <select defaultValue="USD">
                  <option>USD</option>
                  <option>EUR</option>
                  <option>GBP</option>
                  <option>INR</option>
                  <option>JPY</option>
                </select>
              </label>
              <div className="notice">
                Authentication, persistent settings, and server-side access
                control will be integrated later.
              </div>
            </section>
          </>
        );
      default:
        return (
          <>
            <PageTitle
              eyebrow={
                selectedCountry
                  ? `ENTITY OVERVIEW / ${selectedRegion ?? "SELECTED"}`
                  : "OVERVIEW / LIQUIDITY"
              }
              title={
                selectedCountry
                  ? `${selectedCountry} Treasury Overview`
                  : "Good morning, Treasury Team"
              }
              subtitle={
                selectedCountry
                  ? `Showing transaction and cash-flow demo data for ${selectedCountry}.`
                  : "Your global liquidity overview and items that need attention."
              }
              action={
                <div className="dashboard-actions">
                  {selectedCountry && (
                    <button
                      className="button outline"
                      onClick={() => {
                        setSelectedCountry(null);
                        setSelectedRegion(null);
                        setEntity("All entities");
                        setMessage("");
                      }}
                    >
                      Clear entity
                    </button>
                  )}
                  <button className="button outline" onClick={exportCsv}>
                    Export CSV
                  </button>
                </div>
              }
            />
            {message && <div className="notice">{message}</div>}
            {selectedCountry && (
              <div className="entity-context">
                <span className="green-dot" />
                Viewing <strong>{selectedCountry}</strong>
                <span className="muted">
                  · {dashboardTransactions.length} demo transaction records
                </span>
                <button onClick={() => setPage("Entity Explorer")}>
                  Change entity
                </button>
              </div>
            )}
            <div className="stats-grid">
              <StatCard
                label={
                  selectedCountry
                    ? `Net cash flow (${dashboardCurrency})`
                    : "Illustrative cash position"
                }
                value={
                  selectedCountry
                    ? `${money(inflows - outflows)} ${dashboardCurrency}`
                    : "$12.48M"
                }
                change={selectedCountry ? "Entity selected" : "+8.2%"}
                sub={
                  selectedCountry ? "inflows minus outflows" : "vs. last month"
                }
                icon={<Wallet size={18} />}
              />
              <StatCard
                label={
                  selectedCountry
                    ? `Projected 30-day low (${dashboardCurrency})`
                    : "Projected 30-day low"
                }
                value={
                  selectedCountry
                    ? `${money(Math.max(0, (inflows - outflows) * 0.7))} ${dashboardCurrency}`
                    : "$8.92M"
                }
                change="Demo"
                sub="not model-validated"
                icon={<TrendingUp size={18} />}
              />
              <StatCard
                label="Imported inflows"
                value={money(inflows)}
                change={selectedCountry ? dashboardCurrency : "Sample data"}
                sub={
                  selectedCountry
                    ? `${dashboardTransactions.filter((item) => item.direction === "Inflow").length} incoming records`
                    : "raw amount sum"
                }
                icon={<ArrowDownRight size={18} />}
              />
              <StatCard
                label="Imported outflows"
                value={money(outflows)}
                change={selectedCountry ? dashboardCurrency : "Sample data"}
                sub={
                  selectedCountry
                    ? `${dashboardTransactions.filter((item) => item.direction === "Outflow").length} outgoing records`
                    : "raw amount sum"
                }
                icon={<ArrowUpRight size={18} />}
              />
            </div>
            <div className="dashboard-grid">
              <section className="panel chart-panel">
                <PanelTitle
                  title="30-day liquidity forecast"
                  subtitle="Illustrative projected cash position · USD millions"
                />
                <CashChart />
                <p className="chart-note">
                  Forecast values are synthetic and do not come from uploaded
                  transactions.
                </p>
              </section>
              <section className="panel currency-panel">
                <PanelTitle
                  title={
                    selectedCountry
                      ? `${selectedCountry} currency`
                      : "Currency exposure"
                  }
                  subtitle={
                    selectedCountry
                      ? "Currency used by the selected entity's demo transactions"
                      : "Synthetic currency mix"
                  }
                />
                {selectedCountry ? (
                  <div className="single-currency">
                    <span
                      className="currency-dot"
                      style={{ background: "#43d9b2" }}
                    />
                    <strong>{dashboardCurrency}</strong>
                    <span className="muted">
                      All displayed entity amounts are in {dashboardCurrency};
                      no FX conversion is applied.
                    </span>
                  </div>
                ) : (
                  [
                    { name: "USD", value: 38, color: "#43d9b2" },
                    { name: "EUR", value: 24, color: "#6d9eff" },
                    { name: "GBP", value: 16, color: "#b49aff" },
                    { name: "JPY", value: 12, color: "#f2bd63" },
                    { name: "Other", value: 10, color: "#59718b" },
                  ].map((item) => (
                    <div className="currency-row" key={item.name}>
                      <span
                        className="currency-dot"
                        style={{ background: item.color }}
                      />{" "}
                      <span>{item.name}</span>
                      <div className="bar-track">
                        <div
                          className="bar-fill"
                          style={{
                            width: `${item.value}%`,
                            background: item.color,
                          }}
                        />
                      </div>
                      <b>{item.value}%</b>
                    </div>
                  ))
                )}
                {!selectedCountry && (
                  <div className="notice">
                    Currency percentages are synthetic. No live FX conversion is
                    applied.
                  </div>
                )}
              </section>
              <section className="panel">
                <PanelTitle
                  title="Priority alerts"
                  subtitle="Items that may require review"
                />
                {alerts.map((alert) => (
                  <div className="alert-row" key={alert.entity}>
                    <div
                      className={`alert-icon ${alert.severity.toLowerCase()}`}
                    >
                      <CircleAlert size={18} />
                    </div>
                    <div className="alert-copy">
                      <b>
                        {alert.entity} · {alert.currency}
                      </b>
                      <p>{alert.message}</p>
                      <small>{alert.time}</small>
                    </div>
                    <span className={`badge ${alert.severity.toLowerCase()}`}>
                      {alert.severity}
                    </span>
                  </div>
                ))}
              </section>
              <section className="panel cash-summary">
                <PanelTitle
                  title="Cash-flow summary"
                  subtitle="Transactions currently in frontend memory"
                />
                <div className="summary-row">
                  <span>Transaction records</span>
                  <b>{transactions.length}</b>
                </div>
                <div className="summary-row">
                  <span>Entities represented</span>
                  <b>{new Set(transactions.map((item) => item.entity)).size}</b>
                </div>
                <div className="summary-row">
                  <span>Currencies represented</span>
                  <b>
                    {new Set(transactions.map((item) => item.currency)).size}
                  </b>
                </div>
                <button
                  className="button primary"
                  onClick={() => {
                    setEntity(selectedCountry ?? "All entities");
                    setPage("Transactions");
                  }}
                >
                  View transactions
                </button>
              </section>
            </div>
            <section className="panel dashboard-transactions">
              <PanelTitle
                title={
                  selectedCountry
                    ? `${selectedCountry} transactions`
                    : "Recent transactions"
                }
                subtitle={
                  selectedCountry
                    ? `Filtered to ${selectedCountry}; amounts shown in ${dashboardCurrency}.`
                    : "Recent records currently in frontend memory"
                }
              />
              <TransactionTable rows={dashboardTransactions.slice(0, 5)} />
              <button
                className="button outline"
                onClick={() => {
                  setEntity(selectedCountry ?? "All entities");
                  setPage("Transactions");
                }}
              >
                View all transactions
              </button>
            </section>
          </>
        );
    }
  }

  return (
    <div className={`app-shell ${lightTheme ? "light-theme" : ""}`}>
      <aside className={`sidebar ${mobileMenu ? "mobile-open" : ""}`}>
        <button
          className="workspace-select"
          onClick={() => setMessage("Global Treasury workspace selected.")}
        >
          <span>
            <i className="green-dot" />
            Global Treasury
          </span>
          <ChevronDown size={15} />
        </button>
        <div className="nav-label">WORKSPACE</div>
        {navItems.map((item, index) => (
          <React.Fragment key={item.name}>
            {index === 5 && (
              <>
                <div className="nav-spacer" />
                <div className="nav-label">INTELLIGENCE</div>
              </>
            )}
            {index === 6 && (
              <>
                <div className="nav-spacer" />
                <div className="nav-label">MANAGEMENT</div>
              </>
            )}
            <button
              className={`nav-item ${page === item.name ? "active" : ""}`}
              onClick={() => {
                setPage(item.name);
                setMobileMenu(false);
              }}
            >
              <item.icon size={20} />
              <span>{item.name}</span>
              {item.name === "Alerts" && <span className="nav-count">3</span>}
            </button>
          </React.Fragment>
        ))}
        <div className="sidebar-user">
          <div className="avatar">RT</div>
          <div>
            <b>R. Treasury</b>
            <small>Treasury Manager</small>
          </div>
        </div>
      </aside>
      <div className="main-shell">
        <header className="topbar">
          <div className="breadcrumb">
            <button
              className="icon-button mobile-menu"
              onClick={() => setMobileMenu(!mobileMenu)}
              aria-label="Toggle menu"
            >
              {mobileMenu ? <X size={20} /> : <Menu size={20} />}
            </button>
            <span>Treasury Pulse</span>
            <span>/</span>
            <b>{page}</b>
          </div>
          <div className="top-actions">
            <div className="search-box">
              <Search size={17} />
              <input
                placeholder="Search transactions..."
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  if (event.target.value) setPage("Transactions");
                }}
              />
            </div>
            <button
              className="icon-button"
              title="Toggle theme"
              onClick={() => setLightTheme(!lightTheme)}
            >
              {lightTheme ? <Moon size={19} /> : <Sun size={19} />}
            </button>
            <button
              className="icon-button"
              title="Open alerts"
              onClick={() => setPage("Alerts")}
            >
              <Bell size={19} />
              <i />
            </button>
            <div className="top-avatar">RT</div>
          </div>
        </header>
        <main className="page-content">{pageContent()}</main>
        <footer className="app-footer">
          <span>
            <i className="green-dot" />
            Demo interface ready
          </span>
          <span>Mock data · Backend integration pending</span>
        </footer>
      </div>
    </div>
  );
}
