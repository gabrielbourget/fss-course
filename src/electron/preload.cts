import { Key } from "react";

const electron = require("electron");

electron.contextBridge.exposeInMainWorld("electron", {
  subscribeStatistics: (callback) => {
    return ipcOn("statistics", (statistics) => callback(statistics));
  },
  getStaticData: () => ipcInvoke("getStaticData"),
} satisfies Window["electron"]);

const ipcInvoke = <Key extends keyof TEventPayloadMapping>(
  key: Key
): Promise<TEventPayloadMapping[Key]> => electron.ipcRenderer.invoke(key);

const ipcOn = <Key extends keyof TEventPayloadMapping>(
  key: Key,
  callback: (payload: TEventPayloadMapping[Key]) => void
) => {
  const cb = (_: Electron.IpcRendererEvent, payload: any) => callback(payload)
  electron.ipcRenderer.on(key, cb);
  return () => electron.ipcRenderer.off(key, cb);
}
