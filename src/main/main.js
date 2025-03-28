import { app, BrowserWindow, screen } from 'electron'

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
            nodeIntegration: true
        }
    })

    mainWindow.loadFile('src/renderer/homepage/index.html')

    mainWindow.on('closed', () => {
        mainWindow = null
    })
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    if(process.platform !== 'darwin') {
        app.quit()
    }
})