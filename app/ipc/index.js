const {ipcMain, dialog} = require('electron')
const fs = require('fs')

ipcMain.on('open-file-dialog', function (event) {
	dialog.showOpenDialog({
		properties: ['openFile'],
		filters: [
			{ name: 'Markdown', extensions: ['md'] },
		]
	}, function (files) {
		if (files) event.sender.send('selected-directory', files)
	})
})

ipcMain.on('save-dialog', function (event, content) {
	const options = {
		title: 'Save',
		filters: [
			{ name: 'Markdown', extensions: ['md'] }
		]
	}
	dialog.showSaveDialog(options, function (filename) {
		if (filename) {
			fs.writeFile(filename, content, function (err) {
				if (err) {
					alert("An error ocurred creating the file " + err.message)
				}
				event.sender.send('saved-file', filename)
			});
		}
	})
})

ipcMain.on('message-dialog', (event, type, title, mes, btn) => {
	const options = {
		type: type || 'info', // "none", "info", "error", "question" or "warning"
		title: title || '文本保存？',
		message: mes || "当前文本没有保存，是否保存?",
		buttons: btn || ['Yes', 'No']
	}
	dialog.showMessageBox(options, function (index) {
		event.sender.send('information-dialog-selection', index)
	})
})

ipcMain.on('error-dialog', (event, title, msg) => {
	dialog.showErrorBox(title || 'An Error Message', msg || 'Demonstrating an error message.')
})

ipcMain.on('save-file', function (event, filename, content) {
	fs.writeFile(filename, content, function (err) {
		if (err) {
			alert("An error ocurred creating the file " + err.message)
		}
		event.sender.send('saved-file', filename)
	});
})