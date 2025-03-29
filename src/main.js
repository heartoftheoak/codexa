import { app, BrowserWindow, screen, ipcMain } from 'electron'
import { fileURLToPath } from 'url';
import path from 'path'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)
let mainWindow

function createWindow() {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize
    const windowWidth = Math.floor(width * 0.35)
    const windowHeight = Math.floor(height * 0.7)

    const xPos = Math.floor((width - windowWidth) / 2)
    const yPos = Math.floor((height - windowHeight) / 2)

    mainWindow = new BrowserWindow({
        width: windowWidth,
        height: windowHeight,
        x: xPos,
        y: yPos,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: true,
            preload: path.join(__dirname, 'renderer', 'homepage', 'index.js')
        }
    })

    mainWindow.loadFile(path.join(__dirname, 'renderer', 'homepage', 'index.html'))

    mainWindow.on('closed', () => {
        mainWindow = null
    })
}

app.whenReady().then(createWindow)

ipcMain.handle('getData', async () => {
    const statefilePath = path.join(__dirname, 'renderer', 'assets', 'statefile.json')
    const statefileData = fs.readFileSync(statefilePath, 'utf-8')
    return JSON.parse(statefileData)
})

app.on('window-all-closed', () => {
    if(process.platform !== 'darwin') {
        app.quit()
    }
})