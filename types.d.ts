// import type { Electron } from "electron";

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

type TEventPayloadMapping = {
  statistics: TStatistics,
  getStaticData: TStaticData,
}

interface Window {
  electron: {
    subscribeStatistics: (callback: (stats: TStatistics) => void) => void,
    getStaticData: () => Promise<TStaticData>,
  }
}
