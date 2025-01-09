import { app, BrowserWindow, Tray } from "electron";
import path from "path";
import { ipcMainHandle, isDev } from "./util.js";
import { getStaticData, pollResources } from "./resourceManager.js";
import { getAssetPath, getPreloadPath, getUIPath } from "./pathResolver.js";

app.on("ready", () => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: getPreloadPath(),
    }
  });

  if (isDev()) {
    mainWindow.loadURL("http://localhost:5123");
  } else {
    mainWindow.loadFile(getUIPath());
  }

  pollResources(mainWindow);

  ipcMainHandle("getStaticData", () => getStaticData());

  new Tray(path.join(getAssetPath(), process.platform === "darwin" ? "trayIconTemplate@8x.png" : "trayIconTemplate.png"));

  handleCloseEvents(mainWindow);
});

const handleCloseEvents = (mainWindow: BrowserWindow) => {
  let willClose = false;

  if (willClose) return;

  mainWindow.on("close", (e) => {
    e.preventDefault();
    mainWindow.hide();

    if (app.dock) app.dock.hide();
  });

  app.on("before-quit", () => willClose = true);

  mainWindow.on("show", () => willClose = false);
};
