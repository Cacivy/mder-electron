const {app} = require('electron')

module.exports = {
    label: 'File',
    submenu: [{
        label: 'Open File',
        accelerator: 'CmdOrCtrl+O',
        click() {
            app.emit('open-file')
        }
    }, {
        label: 'New File',
        accelerator: 'CmdOrCtrl+N',
        click() {
            app.emit('new-file')
        }
    }, {
        label: 'Save',
        accelerator: 'CmdOrCtrl+S',
        click() {
            app.emit('save-file')
        }
    }, {
        label: 'Save As...',
        click() {
            app.emit('save-as-file')
        }
    }, {
        type: 'separator'
    },{
        label: 'export',
        submenu: [{
            label: 'PDF',
            click: () => {
                app.emit('print-to-pdf')
            }
        }, {
            label: 'HTML',
            click: () => {
                app.emit('print-to-html')
            }
        }]
    }, {
        type: 'separator'
    }, {
        label: 'preference',
        accelerator: 'CmdOrCtrl+P',
        click() {
            app.emit('preference')
        }
    }]
}