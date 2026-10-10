
import { apiGet } from './api';
import type {
  Transaction,
  ForecastDay,
  LiquidityAlert,
} from './types';

export interface DashboardSummary {
  totalCash: number;
  totalInflows: number;
  totalOutflows: number;
  availableLiquidity: number;
  currency: string;
}

export interface DashboardData {
  summary: DashboardSummary;
  transactions: Transaction[];
  forecast: ForecastDay[];
  alerts: LiquidityAlert[];
}

export async function getDashboardData(): Promise<DashboardData> {
  return apiGet<DashboardData>('/api/dashboard');
}
