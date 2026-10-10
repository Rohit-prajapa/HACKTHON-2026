
export const APP_NAME = 'Treasury Pulse';

export const DEFAULT_CURRENCY = 'USD';

export const DEFAULT_CASH_THRESHOLD = 500000;

export const DEFAULT_FORECAST_DAYS = 30;

export const TRANSACTION_TYPES = [
  'inflow',
  'outflow',
] as const;

export const TRANSACTION_STATUSES = [
  'completed',
  'pending',
  'scheduled',
] as const;

export const ALERT_SEVERITIES = [
  'critical',
  'warning',
  'info',
] as const;

export const NAVIGATION_ITEMS = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'transactions', label: 'Transactions' },
  { id: 'forecast', label: 'Forecast' },
  { id: 'alerts', label: 'Alerts' },
  { id: 'scenarios', label: 'Scenarios' },
  { id: 'treasury-ai', label: 'Treasury AI' },
  { id: 'reports', label: 'Reports' },
  { id: 'settings', label: 'Settings' },
] as const;
