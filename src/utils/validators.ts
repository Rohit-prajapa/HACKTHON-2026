
import type { Transaction } from '../services/types';

export function isValidAmount(amount: number): boolean {
  return Number.isFinite(amount) && amount > 0;
}

export function isValidDate(date: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return false;
  }

  const parsed = new Date(`${date}T00:00:00Z`);

  return (
    !Number.isNaN(parsed.getTime()) &&
    parsed.toISOString().slice(0, 10) === date
  );
}

export function validateTransaction(
  transaction: Omit<Transaction, 'id'>
): string[] {
  const errors: string[] = [];

  if (!(transaction.description ?? '').trim()) {
    errors.push('Description is required.');
  }

  if (!(transaction.entity ?? '').trim()) {
    errors.push('Entity is required.');
  }

  if (!isValidAmount(transaction.amount)) {
    errors.push('Amount must be greater than zero.');
  }

  if (!isValidDate(transaction.date)) {
    errors.push('Enter a valid date in YYYY-MM-DD format.');
  }

  if (!(transaction.currency ?? '').trim()) {
    errors.push('Currency is required.');
  }

  return errors;
}
