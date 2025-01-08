import { Key } from "react";

const electron = require("electron");

electron.contextBridge.exposeInMainWorld("electron", {
  subscribeStatistics: (callback) => {
    ipcOn("statistics", (statistics) => callback(statistics));
  },
  getStaticData: () => ipcInvoke("getStaticData"),
} satisfies Window["electron"]);

const ipcInvoke = <Key extends keyof TEventPayloadMapping>(
  key: Key
): Promise<TEventPayloadMapping[Key]> => electron.ipcRenderer.invoke(key);

const ipcOn = <Key extends keyof TEventPayloadMapping>(
  key: Key,
  callback: (payload: TEventPayloadMapping[Key]) => void
) => electron.ipcRenderer.on(key, (_, payload) => callback(payload));
