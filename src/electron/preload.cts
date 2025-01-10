import { Key } from "react";

const electron = require("electron");

electron.contextBridge.exposeInMainWorld("electron", {
  subscribeStatistics: (callback) => ipcOn("statistics", (statistics) => callback(statistics)),
  subscribeChangeView: (callback) => ipcOn("changeView", (view) => callback(view)),
  getStaticData: () => ipcInvoke("getStaticData"),
  sendFrameAction: (action) => ipcSend("sendFrameAction", action),
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
};

const ipcSend = <Key extends keyof TEventPayloadMapping>(
  key: Key,
  payload: TEventPayloadMapping[Key]
) => {

  electron.ipcRenderer.send(key, payload);
};
