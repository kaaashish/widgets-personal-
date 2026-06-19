const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  minimize: () => ipcRenderer.send('minimize'),
  close: () => ipcRenderer.send('close'),
  loadData: () => ipcRenderer.invoke('load-todo'),
  saveData: (data) => ipcRenderer.invoke('save-todo', data),
  loadPlanner: () => ipcRenderer.invoke('load-planner'),
  savePlanner: (data) => ipcRenderer.invoke('save-planner', data)
})
