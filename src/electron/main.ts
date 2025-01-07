import { app, BrowserWindow } from "electron";
import path from "path";
import { fileURLToPath } from "url";
import { isDev } from "./util.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.on("ready", () => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  if (isDev()) {
    mainWindow.loadURL("http://localhost:5123");
  } else {
    mainWindow.loadFile(path.join(__dirname, "..", "dist-react", "index.html"));
  }

  // console.log(`__dirname: ${__dirname}`);
  // console.log(`path created -> ${path.join(__dirname, "..", "dist-react", "index.html")}`);

});
