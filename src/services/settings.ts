
import { apiGet, apiPost } from './api';

export interface TreasurySettings {
  currency: string;
  minimumCashThreshold: number;
  forecastHorizonDays: number;
  emailAlertsEnabled: boolean;
  liquidityAlertsEnabled: boolean;
  darkMode: boolean;
}

export async function getSettings(): Promise<TreasurySettings> {
  return apiGet<TreasurySettings>('/api/settings');
}

export async function updateSettings(
  settings: TreasurySettings
): Promise<TreasurySettings> {
  return apiPost<TreasurySettings>('/api/settings', settings);
}
