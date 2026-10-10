
import { apiGet, apiPost } from './api';
import type { ForecastDay, ScenarioInput } from './types';

export interface ForecastResponse {
  forecast: ForecastDay[];
  openingBalance: number;
  closingBalance: number;
  minimumBalance: number;
  currency: string;
}

export interface ScenarioResponse {
  baseline: ForecastDay[];
  simulated: ForecastDay[];
  minimumBalance: number;
  liquidityGap: number;
  currency: string;
}

export async function getForecast(): Promise<ForecastResponse> {
  return apiGet<ForecastResponse>('/api/forecast');
}

export async function runScenario(
  input: ScenarioInput
): Promise<ScenarioResponse> {
  return apiPost<ScenarioResponse>('/api/scenarios', input);
}
