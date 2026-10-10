
import { apiPost } from './api';

export interface AIQuestion {
  question: string;
  context?: Record<string, unknown>;
}

export interface AIResponse {
  answer: string;
  recommendations: string[];
  riskLevel: 'low' | 'medium' | 'high';
}

export async function askTreasuryAI(
  input: AIQuestion
): Promise<AIResponse> {
  return apiPost<AIResponse>('/api/ai/ask', input);
}
