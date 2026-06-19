const { app, BrowserWindow, ipcMain } = require('electron')
const fs = require('fs')
const path = require('path')

const todoDataPath = path.join(app.getPath('userData'), 'checklist.json')
const plannerDataPath = path.join(app.getPath('userData'), 'planner.json')

function loadData(filePath) {
  try {
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, 'utf8'))
    }
  } catch (e) {}
  return null
}

function saveData(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data))
}

function createTodoWindow() {
  const win = new BrowserWindow({
    width: 340,
    height: 580,
    x: 20,
    y: 100,
    frame: false,
    transparent: false,
    backgroundColor: '#ffffff',
    alwaysOnTop: true,
    skipTaskbar: false,
    resizable: false,
    movable: true,
    webPreferences: { preload: __dirname + '/preload.js' }
  })
  win.loadFile('todo.html')
  win.setSkipTaskbar(false)
}

function createTimerWindow() {
  const win = new BrowserWindow({
    width: 300,
    height: 320,
    x: 380,
    y: 100,
    frame: false,
    transparent: false,
    backgroundColor: '#ffffff',
    alwaysOnTop: true,
    skipTaskbar: false,
    resizable: false,
    movable: true,
    webPreferences: { preload: __dirname + '/preload.js' }
  })
  win.loadFile('timer.html')
  win.setSkipTaskbar(false)
}

function createPlannerWindow() {
  const win = new BrowserWindow({
    width: 700,
    height: 500,
    x: 200,
    y: 200,
    frame: false,
    transparent: false,
    backgroundColor: '#ffffff',
    alwaysOnTop: true,
    skipTaskbar: false,
    resizable: false,
    movable: true,
    webPreferences: { preload: __dirname + '/preload.js' }
  })
  win.loadFile('planner.html')
  win.setSkipTaskbar(false)
}

app.whenReady().then(() => {
  createTodoWindow()
  createTimerWindow()
  createPlannerWindow()
})

ipcMain.on('minimize', (event) => {
  BrowserWindow.fromWebContents(event.sender).minimize()
})
ipcMain.on('close', (event) => {
  BrowserWindow.fromWebContents(event.sender).close()
})
ipcMain.handle('load-todo', () => loadData(todoDataPath) || { tasks: [] })
ipcMain.handle('save-todo', (e, data) => saveData(todoDataPath, data))
ipcMain.handle('load-planner', () => loadData(plannerDataPath) || { slots: {} })
ipcMain.handle('save-planner', (e, data) => saveData(plannerDataPath, data))
