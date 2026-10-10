
import { apiGet } from './api';

export interface TreasuryReport {
  id: string;
  title: string;
  description: string;
  generatedAt: string;
  period: string;
  status: 'ready' | 'processing' | 'failed';
  downloadUrl?: string;
}

export async function getReports(): Promise<TreasuryReport[]> {
  return apiGet<TreasuryReport[]>('/api/reports');
}

export async function downloadReport(
  reportId: string
): Promise<Blob> {
  const baseUrl =
    (import.meta as ImportMeta & {
      env: { VITE_API_URL?: string };
    }).env.VITE_API_URL || 'http://127.0.0.1:8000';

  const response = await fetch(
    `${baseUrl}/api/reports/${encodeURIComponent(reportId)}/download`
  );

  if (!response.ok) {
    throw new Error(
      `Report download failed: ${response.status}`
    );
  }

  return response.blob();
}
