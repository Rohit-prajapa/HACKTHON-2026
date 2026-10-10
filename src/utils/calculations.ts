
import type { ForecastDay, ScenarioInput } from '../services/types';

export function calculateNetCashFlow(
  inflows: number,
  outflows: number
): number {
  return inflows - outflows;
}

export function calculateLiquidityGap(
  projectedBalance: number,
  threshold: number
): number {
  return projectedBalance - threshold;
}

export function calculateScenarioForecast(
  forecast: ForecastDay[],
  input: ScenarioInput
): ForecastDay[] {
  let previousBalance = forecast[0]?.projectedBalance ?? 0;

  return forecast.map((day, index) => {
    const inflows =
      day.inflows * (1 + input.inflowChangePercent / 100);

    const outflows =
      day.outflows * (1 + input.outflowChangePercent / 100);

    const projectedBalance =
      index === 0
        ? previousBalance + inflows - outflows
        : previousBalance + inflows - outflows;

    previousBalance = projectedBalance;

    return {
      ...day,
      inflows,
      outflows,
      projectedBalance,
      threshold: input.threshold,
    };
  });
}

export function findMinimumBalance(
  forecast: ForecastDay[]
): number {
  if (forecast.length === 0) return 0;

  return Math.min(
    ...forecast.map((day) => day.projectedBalance)
  );
}
