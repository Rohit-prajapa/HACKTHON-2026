
import type { Transaction } from './types';

export function exportTransactionsToCSV(
  transactions: Transaction[],
  filename = 'treasury-pulse-transactions.csv',
): void {
  const headers = [
    'id',
    'date',
    'entity',
    'category',
    'direction',
    'amount',
    'currency',
    'status',
  ];

  const escapeCSV = (value: unknown) =>
    `"${String(value ?? '').replace(/"/g, '""')}"`;

  const rows = transactions.map((transaction) => [
    transaction.id,
    transaction.date,
    transaction.entity,
    transaction.category,
    transaction.direction ?? transaction.type ?? '',
    transaction.amount,
    transaction.currency,
    transaction.status,
  ]);

  const csv = [headers, ...rows]
    .map((row) => row.map(escapeCSV).join(','))
    .join('\r\n');

  const blob = new Blob(['\uFEFF', csv], {
    type: 'text/csv;charset=utf-8;',
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(url);
}
