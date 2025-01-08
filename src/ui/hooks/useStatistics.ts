import { useEffect, useState } from "react";

export const useStatistics = (dataPointCount: number): TStatistics[] => {
  const [statistics, setStatistics] = useState<TStatistics[]>([]);

  useEffect(() => {
    const unsubscribeToStatistics = window.electron.subscribeStatistics((stats) => {
      if (stats) setStatistics((prevState) => {

        const newStats = [...prevState, stats];

        if (newStats.length > dataPointCount) newStats.shift();

        return newStats;
      });
    });

    return unsubscribeToStatistics;
  }, [dataPointCount]);

  return statistics;
};
