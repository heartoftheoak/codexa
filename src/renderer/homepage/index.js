const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    getData: () => ipcRenderer.invoke('getData')
})