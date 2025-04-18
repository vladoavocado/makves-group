import {useMemo} from "react";

function getStats<T extends Record<string, any>, K extends keyof T>(data: T[], metrics: K[]) {
    return metrics.reduce((acc, metricKey) => {
        const mean = data.reduce(
            (acc, dataItem) => acc + dataItem[metricKey], 0
        ) / data.length;

        const diff = data.reduce((acc, dataItem) => {
            return acc + (dataItem[metricKey] - mean) ** 2;
        }, 0);

        const std = Math.sqrt(diff / data.length);

        return {
            ...acc,
            [metricKey as string]: {
                mean,
                std,
            }
        }
    }, {} as Record<string, { mean: number, std: number }>);
}

export const useZScoreDataset =
    <T extends Record<string, any>, K extends keyof T>(
        data: T[],
        metrics: K[],
        defaultColors: Record<string, string>,
        threshold = 1,
    ) => {
        const stats = useMemo(() => getStats(data, metrics), [data, metrics]);

        return useMemo(() => {
            return data.map((item) => {

              return Object.entries(stats).reduce((acc, [statKey, stat]) => {
                  const { mean, std } = stat;
                  const zScore = Math.abs((item[statKey] - mean) / std);

                  return {
                      ...acc,
                        [statKey]: item[statKey],
                        [`${statKey}ZScore`]: zScore,
                        [`${statKey}ZColor`]: zScore > threshold ? "red" : defaultColors[statKey],
                  };
              }, { ...item });
            });
        }, [data, metrics, stats]);
    };