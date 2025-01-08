type TStatistics = {
  totalStorage: number,
  CPUUsage: number,
  RAMUsage: number,
}

type TStaticData = {
  totalStorage: number,
  CPUModel: string,
  totalMemoryGB: number,
}

interface Window {
  subscribeStatistics: (callback: (stats: TStatistics) => void) => void,
  getStaticData: () => Promise<TStaticData>
}
