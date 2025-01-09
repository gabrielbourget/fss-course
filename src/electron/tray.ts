import { app, Menu, Tray, type BrowserWindow } from "electron";
import { getAssetPath } from "./pathResolver.js";
import path from "path";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const createTray = (mainWindow: BrowserWindow) => {
  const tray = new Tray(path.join(getAssetPath(), process.platform === "win32" ? "trayIconTemplate@8x.png" : "trayIconTemplate.png"));

  tray.setContextMenu(
    Menu.buildFromTemplate([
      {
        label: "Show",
        click: () => {
          mainWindow.show();
        }
      },
      {
        label: "Quit",
        click: () => app.quit(),
      }
    ])
  );

  return tray;
}