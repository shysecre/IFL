import { app, BrowserWindow, Menu, MenuItem, Tray } from "electron";
import { join } from "path";

export const createTray = (window: BrowserWindow) => {
  const TRAY_ICON = appIcon();

  const tray = new Tray(TRAY_ICON);
  const menu = new Menu();

  menu.append(
    new MenuItem({
      label: "Exit app",
      click: () => app.exit(0),
    })
  );

  tray.setContextMenu(menu);
  tray.setToolTip("IFL");

  tray.on("click", () => window.show());
};

export const envPath = () => {
  return app.isPackaged
    ? join(__dirname, "./.env")
    : join(process.cwd(), "./.env");
};

export const createWindowEvents = (window: BrowserWindow) => {
  window.on("close", (event: CloseEvent) => {
    event.preventDefault();
    window.hide();
  });

  window.once("ready-to-show", () => {
    window.show();
    window.focus();
  });
};

export const appIcon = () => {
  return app.isPackaged
    ? join(__dirname, "..", "public/icons", "app.png")
    : join(process.cwd(), "./public/icons", "app.png");
};

export const createWindow = (preloadPath: string, urlPath: string) => {
  const APP_ICON = appIcon();

  const mainWindow = new BrowserWindow({
    show: false,
    width: 1920, //800
    height: 1080, //400
    icon: APP_ICON,
    frame: false,
    resizable: true,
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: preloadPath,
    },
  });

  mainWindow.loadURL(urlPath);

  createTray(mainWindow);
  createWindowEvents(mainWindow);

  return mainWindow;
};
