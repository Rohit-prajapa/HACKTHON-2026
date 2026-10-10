
import type {
  Transaction,
  ForecastDay,
  LiquidityAlert,
} from '../services/types';

export const mockTransactions: Transaction[] = [
  {
    id: 'TXN-1001',
    date: '2026-10-10',
    description: 'Customer payment',
    entity: 'Acme Corporation',
    type: 'inflow',
    category: 'Revenue',
    direction: 'Inflow',
    amount: 125000,
    currency: 'USD',
    status: 'completed',
  },
  {
    id: 'TXN-1002',
    date: '2026-10-10',
    description: 'Supplier settlement',
    entity: 'Global Supplies Ltd.',
    type: 'outflow',
    category: 'Supplier Payment',
    direction: 'Outflow',
    amount: 78000,
    currency: 'USD',
    status: 'pending',
  },
  {
    id: 'TXN-1003',
    date: '2026-10-11',
    description: 'Invoice collection',
    entity: 'Northstar Retail',
    type: 'inflow',
    category: 'Revenue',
    direction: 'Inflow',
    amount: 95000,
    currency: 'USD',
    status: 'scheduled',
  },
  {
    id: 'TXN-1004',
    date: '2026-10-12',
    description: 'Payroll',
    entity: 'Treasury Operations',
    type: 'outflow',
    category: 'Payroll',
    direction: 'Outflow',
    amount: 142000,
    currency: 'USD',
    status: 'scheduled',
  },
  {
    id: 'TXN-1005',
    date: '2026-10-13',
    description: 'Service revenue',
    entity: 'Vertex Services',
    type: 'inflow',
    category: 'Revenue',
    direction: 'Inflow',
    amount: 68000,
    currency: 'USD',
    status: 'pending',
  },
];

export const mockForecast: ForecastDay[] = Array.from(
  { length: 30 },
  (_, index) => {
    const date = new Date('2026-10-10T12:00:00');
    date.setDate(date.getDate() + index);

    const inflows = 80000 + ((index * 13700) % 65000);
    const outflows = 65000 + ((index * 9200) % 70000);
    const projectedBalance =
      1250000 + index * (inflows - outflows);

    return {
      date: date.toISOString().slice(0, 10),
      inflows,
      outflows,
      projectedBalance,
      threshold: 500000,
    };
  }
);

export const mockAlerts: LiquidityAlert[] = [
  {
    id: 'ALT-001',
    title: 'Liquidity threshold approaching',
    message:
      'Projected cash may approach the minimum reserve threshold.',
    severity: 'warning',
    date: '2026-10-10',
    acknowledged: false,
  },
  {
    id: 'ALT-002',
    title: 'Large supplier payment',
    message:
      'A scheduled supplier payment may reduce available liquidity.',
    severity: 'critical',
    date: '2026-10-11',
    acknowledged: false,
  },
  {
    id: 'ALT-003',
    title: 'Customer inflow expected',
    message:
      'A customer collection is scheduled for the next few days.',
    severity: 'info',
    date: '2026-10-12',
    acknowledged: true,
  },
];
