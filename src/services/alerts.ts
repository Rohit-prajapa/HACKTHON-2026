
import { apiGet, apiPost } from './api';
import type { LiquidityAlert } from './types';

export async function getAlerts(): Promise<LiquidityAlert[]> {
  return apiGet<LiquidityAlert[]>('/api/alerts');
}

export async function acknowledgeAlert(
  alertId: string
): Promise<{ success: boolean; message: string }> {
  return apiPost<{ success: boolean; message: string }>(
    `/api/alerts/${encodeURIComponent(alertId)}/acknowledge`,
    {}
  );
}
