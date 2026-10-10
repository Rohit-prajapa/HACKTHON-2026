
export interface Transaction {
  id: string;
  date: string;
  description?: string;
  entity: string;
  category: string;
  direction: 'Inflow' | 'Outflow';
  type?: 'inflow' | 'outflow';
  amount: number;
  currency: string;
  status: 'Expected' | 'Scheduled' | 'Settled' | 'completed' | 'pending' | 'scheduled';
}

export interface ForecastDay {
  date: string;
  inflows: number;
  outflows: number;
  projectedBalance: number;
  threshold: number;
}

export interface LiquidityAlert {
  id: string;
  title: string;
  message: string;
  severity: 'critical' | 'warning' | 'info';
  date: string;
  acknowledged: boolean;
}

export interface ScenarioInput {
  inflowChangePercent: number;
  outflowChangePercent: number;
  threshold: number;
}
