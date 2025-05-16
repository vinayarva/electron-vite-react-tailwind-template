// electron/main.js
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const isDev = process.env.NODE_ENV === 'development';
const db = require('./database'); // We'll create this next

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true, // Recommended for security
      nodeIntegration: false, // Recommended for security
    },
  });

  if (isDev) {
    mainWindow.loadURL('http://localhost:5173'); // Vite dev server URL
    // mainWindow.webContents.openDevTools(); // Open DevTools automatically in dev mode
  } else {
    // Load the index.html of the app.
    mainWindow.loadFile(path.join(__dirname, 'dist', 'index.html'));
  }

  // Example: Handle a simple IPC message from renderer
  ipcMain.on('message-from-renderer', (event, arg) => {
    console.log('Message from renderer:', arg);
    event.reply('reply-from-main', 'Hello from Main Process!');
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Initialize database when app is ready
db.initDb((err) => {
  if (err) {
    console.error("Failed to initialize database:", err);
    // Handle error, maybe quit the app or show an error dialog
  } else {
    console.log("Database initialized successfully.");
  }
});

// IPC handlers for database operations will go here later
