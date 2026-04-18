const { app, BrowserWindow, ipcMain } = require('electron')

function createWindow() {
  const win = new BrowserWindow({
    width: 700,
    height: 80,
    x: 100,
    y: 100,
    frame: false,
    transparent: false,
    backgroundColor: '#fff0f5',
    alwaysOnTop: true,
    skipTaskbar: false,
    resizable: false,
    movable: true,
    webPreferences: {
      preload: __dirname + '/preload.js'
    }
  })

  win.loadFile('index.html')
  win.setSkipTaskbar(false)
  ipcMain.on('minimize', () => win.minimize())
  ipcMain.on('close', () => win.close())
}

app.whenReady().then(createWindow)
