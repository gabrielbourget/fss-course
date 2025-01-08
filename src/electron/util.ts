import { ipcMain, type WebContents } from "electron";

export const isDev = () => process.env.NODE_ENV === "development";

export const ipcMainHandle = <Key extends keyof TEventPayloadMapping>(key: Key, handler: () => TEventPayloadMapping[Key]) => {
  ipcMain.handle(key, () => handler());
};

export const ipcWebContentsSend = <Key extends keyof TEventPayloadMapping>(
  key: Key,
  webContents: WebContents,
  payload: TEventPayloadMapping[Key]
) => {
  webContents.send(key, payload);
};
