
import type { Transaction } from '../services/types';

function parseCSVLine(line: string): string[] {
  const values: string[] = [];
  let value = '';
  let insideQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      if (insideQuotes && line[i + 1] === '"') {
        value += '"';
        i++;
      } else {
        insideQuotes = !insideQuotes;
      }
    } else if (char === ',' && !insideQuotes) {
      values.push(value.trim());
      value = '';
    } else {
      value += char;
    }
  }

  values.push(value.trim());
  return values;
}

export function parseTransactionsCSV(
  content: string
): Omit<Transaction, 'id'>[] {
  const lines = content
    .replace(/^\uFEFF/, '')
    .split(/\r?\n/)
    .filter((line) => line.trim());

  if (lines.length < 2) {
    throw new Error('CSV must contain a header and at least one transaction.');
  }

  const headers = parseCSVLine(lines[0]).map((header) =>
    header.toLowerCase()
  );

  const requiredHeaders = [
    'date',
    'description',
    'entity',
    'type',
    'amount',
    'currency',
    'status',
  ];

  for (const header of requiredHeaders) {
    if (!headers.includes(header)) {
      throw new Error(`Missing required CSV column: ${header}`);
    }
  }

  return lines.slice(1).map((line, index) => {
    const values = parseCSVLine(line);
    const record = Object.fromEntries(
      headers.map((header, columnIndex) => [
        header,
        values[columnIndex] ?? '',
      ])
    );

    const type = record.type.toLowerCase();
    const status = record.status.toLowerCase();
    const amount = Number(record.amount);

    if (type !== 'inflow' && type !== 'outflow') {
      throw new Error(`Invalid transaction type on row ${index + 2}.`);
    }

    if (!['completed', 'pending', 'scheduled'].includes(status)) {
      throw new Error(`Invalid transaction status on row ${index + 2}.`);
    }

    if (!Number.isFinite(amount) || amount <= 0) {
      throw new Error(`Invalid amount on row ${index + 2}.`);
    }

    return {
      date: record.date,
      description: record.description,
      entity: record.entity,
      type,
      amount,
      currency: record.currency,
      status,
    } as Omit<Transaction, 'id'>;
  });
}
