import { app, BrowserWindow } from "electron";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.on("ready", () => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  console.log(`__dirname: ${__dirname}`);
  console.log(`path created -> ${path.join(__dirname, "..", "dist-react", "index.html")}`);

  mainWindow.loadFile(path.join(__dirname, "..", "dist-react", "index.html"));
});
