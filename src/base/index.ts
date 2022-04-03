import { config } from "dotenv";
import { app, BrowserWindow, globalShortcut, ipcMain } from "electron";
import { createWindow, envPath } from "./utils";

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

if (require("electron-squirrel-startup")) {
  app.quit();
}

require("update-electron-app")({ repo: "sekkure/IFL" });
config({ path: envPath() });

app
  .on("ready", () => {
    const win = createWindow(
      MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      MAIN_WINDOW_WEBPACK_ENTRY
    );

    globalShortcut.register("Alt+0", () => {
      win.webContents.send("add-track");
    });

    ipcMain
      .on("Rhide-window", () => {
        win.minimize();
      })
      .on("Rhide-window-to-tray", () => {
        win.hide();
      });
  })
  .on("window-all-closed", () => {
    if (process.platform === "darwin") return;

    app.quit();
  })
  .on("activate", () => {
    if (BrowserWindow.getAllWindows().length) return;

    createWindow(MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY, MAIN_WINDOW_WEBPACK_ENTRY);
  })
  .setName("IFL");
