
import { apiGet } from './api';

export interface HealthResponse {
  status: 'ok' | 'error';
  message: string;
  version?: string;
}

export async function checkBackendHealth(): Promise<HealthResponse> {
  return apiGet<HealthResponse>('/health');
}
