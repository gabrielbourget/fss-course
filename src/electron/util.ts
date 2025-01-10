import { ipcMain, WebFrameMain, type WebContents } from "electron";
import { getUIPath } from "./pathResolver.js";
import { pathToFileURL } from "url";

export const isDev = () => process.env.NODE_ENV === "development";

export const ipcMainHandle = <Key extends keyof TEventPayloadMapping>(
  key: Key,
  handler: () => TEventPayloadMapping[Key]
) => {
  ipcMain.handle(key, (event) => {
    validateEventFrame(event.senderFrame!);
    return handler();
  });
};

export const ipcMainOn = <Key extends keyof TEventPayloadMapping>(
  key: Key,
  handler: (payload: TEventPayloadMapping[Key]) => void
) => {
  ipcMain.on(key, (event, payload) => {
    validateEventFrame(event.senderFrame!);
    return handler(payload);
  });
};

export const ipcWebContentsSend = <Key extends keyof TEventPayloadMapping>(
  key: Key,
  webContents: WebContents,
  payload: TEventPayloadMapping[Key]
) => {
  webContents.send(key, payload);
};

export const validateEventFrame = (frame: WebFrameMain) => {
  if (isDev() && new URL(frame.url).host === "localhost:5123") {
    return;
  }

  if (frame.url !== pathToFileURL(getUIPath()).toString()) {
    throw new Error("Potentially malicious event detected");
  }
};