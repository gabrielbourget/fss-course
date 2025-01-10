import { app, BrowserWindow } from "electron";
import { ipcMainHandle, isDev } from "./util.js";
import { getStaticData, pollResources } from "./resourceManager.js";
import { getPreloadPath, getUIPath } from "./pathResolver.js";
import { createTray } from "./tray.js";
import { createMenu } from "./menu.js";

// -> reduce menu to bare minimum options
// Menu.setApplicationMenu(null);

app.on("ready", () => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: getPreloadPath(),
    }
  });

  if (isDev()) mainWindow.loadURL("http://localhost:5123");
  else mainWindow.loadFile(getUIPath());

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      if (isDev()) mainWindow.loadURL("http://localhost:5123");
      else mainWindow.loadFile(getUIPath());
    }
  })

  pollResources(mainWindow);

  ipcMainHandle("getStaticData", () => getStaticData());

  createTray(mainWindow);
  createMenu(mainWindow);

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

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })

  app.on("before-quit", () => willClose = true);

  mainWindow.on("show", () => willClose = false);
};
