import { app, type BrowserWindow, Menu } from "electron"
import { isDev } from "./util.js"

export const createMenu = (mainWindow: BrowserWindow) => {
  Menu.setApplicationMenu(Menu.buildFromTemplate([
    {
      label: process.platform === "darwin" ? undefined : "App",
      type: "submenu",
      submenu: [
        {
          label: "Quit",
          click: () => app.quit()
        },
        {
          label: "DevTools",
          click: () => {
            mainWindow.webContents.openDevTools()
          },
          visible: isDev(),
        }
      ]
    },
    {
      label: "View",
      type: "submenu",
      submenu: [
        {
          label: "CPU",
        },
        {
          label: "RAM",
        },
        {
          label: "Storage",
        },
      ]
    }
  ]))
}