const {
    app,
    Menu,
    dialog,
    BrowserWindow,
    globalShortcut,
    clipboard,
    ipcMain,
    shell
} = require('electron')

const path = require('path')
const url = require('url')
const fs = require('fs')
const os = require('os')
const debug = /--debug/.test(process.argv[2])

require('./ipc')
const setMenu = require('./menu')

let mainWindow
var filePath

function setFilePath(path) {
    filePath = path || ''
    mainWindow.setTitle('mder' + (filePath && ('-' + filePath)))
}

function createWindow() {
    // window
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 600,
        icon: './static/M.ico',
    })

    if (debug) {
        mainWindow.loadURL('http://localhost:8080')
    } else {
        mainWindow.loadURL(url.format({
            pathname: path.join(__dirname, '../build/index.html'),
            protocol: 'file:',
            slashes: true
        }))
    }


    mainWindow.on('closed', function () {
        mainWindow = null
    })

    // devTools
    if (debug) {
        mainWindow.webContents.openDevTools()
    }

    // menu
    Menu.setApplicationMenu(Menu.buildFromTemplate(setMenu));

    // globalShortcut
    globalShortcut.register('CommandOrControl+Shift+V', () => {
        var obj = clipboard.readText()
        mainWindow.webContents.send('clipboard', obj);
    })

}

app.on('ready', createWindow)

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow()
    }
})

app.on('will-quit', () => {
    //   globalShortcut.unregisterAll()
})

app.on('window-all-closed', () => {
    app.quit()
})

// custom events
app.on('toggle-menu', () => {
    mainWindow.setMenuBarVisibility(!mainWindow.isMenuBarVisible())
})

app.on('open-file', () => {
    dialog.showOpenDialog({
        properties: ['openFile'],
        filters: [{
            name: 'Markdown',
            extensions: ['md']
        },]
    }, function (path) {
        fs.readFile(path[0], 'utf8', (err, data) => {
            setFilePath(path[0])
            mainWindow.webContents.send('open-file', data);
        });
    })
})

app.on('new-file', () => {
    setFilePath()
    mainWindow.webContents.send('new-file');
})

app.on('preference', () => {
    mainWindow.webContents.send('preference');
})

app.on('save-file', () => {
    if (filePath) {
        mainWindow.webContents.send('save-file', filePath);
    } else {
        app.emit('save-as-file')
    }
})

app.on('save-as-file', () => {
     mainWindow.webContents.send('save-as-file');
})

app.on('print-to-pdf', () => {
     mainWindow.webContents.send('wrote-pdf');
})

ipcMain.on('print-to-pdf', function (event) {
  const pdfPath = path.join(os.tmpdir(), 'print.pdf')
  const win = BrowserWindow.fromWebContents(event.sender)
  // Use default printing options
  win.webContents.printToPDF({}, function (error, data) {
    if (error) throw error
    fs.writeFile(pdfPath, data, function (error) {
      if (error) {
        throw error
      }
      shell.openExternal('file://' + pdfPath)
    })
  })
})

app.on('print-to-html', () => {
     mainWindow.webContents.send('wrote-html');
})

ipcMain.on('print-to-html', function(event, data) {
    console.log('ok' + data)
    const htmlPath = path.join(os.tmpdir(), 'print.html')
    fs.writeFile(htmlPath, data, function (error) {
      if (error) {
        throw error
      }
      shell.openExternal('file://' + htmlPath)
    })
})


/*let preferenceWindow
app.on('preference', () => {
    const modalPath = url.format({
        pathname: path.join(__dirname, '../build/preference.html'),
        protocol: 'file:',
        slashes: true
    })
    preferenceWindow = new BrowserWindow({ 
        width: 600,
        height: 400,
        frame: false, 
        // transparent: true
    })
    preferenceWindow.on('close', function () { preferenceWindow = null })
    preferenceWindow.loadURL(modalPath)
    preferenceWindow.show()
})*/