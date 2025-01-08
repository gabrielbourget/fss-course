import { ipcMain } from "electron";

export const isDev = () => process.env.NODE_ENV === "development";

export const ipcHandle = <Key extends keyof TEventPayloadMapping>(key: Key, handler: () => TEventPayloadMapping[Key]) => {
  ipcMain.handle(key, () => handler());
};
