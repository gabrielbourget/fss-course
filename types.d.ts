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

type TView = "CPU" | "RAM" | "STORAGE";

type TFrameWindowAction = "CLOSE" | "MINIMIZE" | "MAXIMIZE";

type TEventPayloadMapping = {
  statistics: TStatistics;
  getStaticData: TStaticData;
  changeView: TView;
  sendFrameAction: TFrameWindowAction;
}

interface Window {
  electron: {
    subscribeStatistics: (callback: (stats: TStatistics) => void) => TUnsubscribeFn,
    subscribeChangeView: (callback: (view: View) => void) => TUnsubscribeFn,
    getStaticData: () => Promise<TStaticData>,
    sendFrameAction: (action: TFrameWindowAction) => void
  }
}

type TUnsubscribeFn = () => void;
