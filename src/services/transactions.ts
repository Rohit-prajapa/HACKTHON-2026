
import { apiGet, apiPost } from './api';
import type { Transaction } from './types';

export interface TransactionFilters {
  search?: string;
  type?: 'inflow' | 'outflow';
  status?: 'completed' | 'pending' | 'scheduled';
  page?: number;
  limit?: number;
}

export async function getTransactions(
  filters: TransactionFilters = {}
): Promise<Transaction[]> {
  const params = new URLSearchParams();

  if (filters.search) params.set('search', filters.search);
  if (filters.type) params.set('type', filters.type);
  if (filters.status) params.set('status', filters.status);
  if (filters.page) params.set('page', String(filters.page));
  if (filters.limit) params.set('limit', String(filters.limit));

  const query = params.toString();
  return apiGet<Transaction[]>(
    `/api/transactions${query ? `?${query}` : ''}`
  );
}

export async function createTransaction(
  transaction: Omit<Transaction, 'id'>
): Promise<Transaction> {
  return apiPost<Transaction>('/api/transactions', transaction);
}
