/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';

	var _require = __webpack_require__(1),
	    app = _require.app,
	    Menu = _require.Menu,
	    dialog = _require.dialog,
	    BrowserWindow = _require.BrowserWindow,
	    globalShortcut = _require.globalShortcut,
	    clipboard = _require.clipboard,
	    ipcMain = _require.ipcMain,
	    shell = _require.shell;

	var path = __webpack_require__(2);
	var url = __webpack_require__(3);
	var fs = __webpack_require__(4);
	var os = __webpack_require__(5);
	var debug = /--debug/.test(process.argv[2]);

	__webpack_require__(6);
	var setMenu = __webpack_require__(7);

	var mainWindow = void 0;
	var filePath;

	function setFilePath(path) {
	    filePath = path || '';
	    mainWindow.setTitle('mder' + (filePath && '-' + filePath));
	}

	function createWindow() {
	    // window
	    mainWindow = new BrowserWindow({
	        width: 1000,
	        height: 600,
	        icon: './static/M.ico'
	    });

	    if (debug) {
	        mainWindow.loadURL('http://localhost:8080');
	    } else {
	        mainWindow.loadURL(url.format({
	            pathname: path.join(__dirname, '../build/index.html'),
	            protocol: 'file:',
	            slashes: true
	        }));
	    }

	    mainWindow.on('closed', function () {
	        mainWindow = null;
	    });

	    // devTools
	    if (debug) {
	        mainWindow.webContents.openDevTools();
	    }

	    // menu
	    Menu.setApplicationMenu(Menu.buildFromTemplate(setMenu));

	    // globalShortcut
	    globalShortcut.register('CommandOrControl+Shift+V', function () {
	        var obj = clipboard.readText();
	        mainWindow.webContents.send('clipboard', obj);
	    });
	}

	app.on('ready', createWindow);

	app.on('activate', function () {
	    if (mainWindow === null) {
	        createWindow();
	    }
	});

	app.on('will-quit', function () {
	    //   globalShortcut.unregisterAll()
	});

	app.on('window-all-closed', function () {
	    app.quit();
	});

	// custom events
	app.on('toggle-menu', function () {
	    mainWindow.setMenuBarVisibility(!mainWindow.isMenuBarVisible());
	});

	app.on('open-file', function () {
	    dialog.showOpenDialog({
	        properties: ['openFile'],
	        filters: [{
	            name: 'Markdown',
	            extensions: ['md']
	        }]
	    }, function (path) {
	        fs.readFile(path[0], 'utf8', function (err, data) {
	            setFilePath(path[0]);
	            mainWindow.webContents.send('open-file', data);
	        });
	    });
	});

	app.on('new-file', function () {
	    setFilePath();
	    mainWindow.webContents.send('new-file');
	});

	app.on('preference', function () {
	    mainWindow.webContents.send('preference');
	});

	app.on('save-file', function () {
	    if (filePath) {
	        mainWindow.webContents.send('save-file', filePath);
	    } else {
	        app.emit('save-as-file');
	    }
	});

	app.on('save-as-file', function () {
	    mainWindow.webContents.send('save-as-file');
	});

	app.on('print-to-pdf', function () {
	    mainWindow.webContents.send('wrote-pdf');
	});

	ipcMain.on('print-to-pdf', function (event) {
	    var pdfPath = path.join(os.tmpdir(), 'print.pdf');
	    var win = BrowserWindow.fromWebContents(event.sender);
	    // Use default printing options
	    win.webContents.printToPDF({}, function (error, data) {
	        if (error) throw error;
	        fs.writeFile(pdfPath, data, function (error) {
	            if (error) {
	                throw error;
	            }
	            shell.openExternal('file://' + pdfPath);
	        });
	    });
	});

	app.on('print-to-html', function () {
	    mainWindow.webContents.send('wrote-html');
	});

	ipcMain.on('print-to-html', function (event, data) {
	    console.log('ok' + data);
	    var htmlPath = path.join(os.tmpdir(), 'print.html');
	    fs.writeFile(htmlPath, data, function (error) {
	        if (error) {
	            throw error;
	        }
	        shell.openExternal('file://' + htmlPath);
	    });
	});

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
	/* WEBPACK VAR INJECTION */}.call(exports, "app"))

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("electron");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("url");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("fs");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("os");

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _require = __webpack_require__(1),
	    ipcMain = _require.ipcMain,
	    dialog = _require.dialog;

	var fs = __webpack_require__(4);

	ipcMain.on('open-file-dialog', function (event) {
		dialog.showOpenDialog({
			properties: ['openFile'],
			filters: [{ name: 'Markdown', extensions: ['md'] }]
		}, function (files) {
			if (files) event.sender.send('selected-directory', files);
		});
	});

	ipcMain.on('save-dialog', function (event, content) {
		var options = {
			title: 'Save',
			filters: [{ name: 'Markdown', extensions: ['md'] }]
		};
		dialog.showSaveDialog(options, function (filename) {
			if (filename) {
				fs.writeFile(filename, content, function (err) {
					if (err) {
						alert("An error ocurred creating the file " + err.message);
					}
					event.sender.send('saved-file', filename);
				});
			}
		});
	});

	ipcMain.on('message-dialog', function (event, type, title, mes, btn) {
		var options = {
			type: type || 'info', // "none", "info", "error", "question" or "warning"
			title: title || '文本保存？',
			message: mes || "当前文本没有保存，是否保存?",
			buttons: btn || ['Yes', 'No']
		};
		dialog.showMessageBox(options, function (index) {
			event.sender.send('information-dialog-selection', index);
		});
	});

	ipcMain.on('error-dialog', function (event, title, msg) {
		dialog.showErrorBox(title || 'An Error Message', msg || 'Demonstrating an error message.');
	});

	ipcMain.on('save-file', function (event, filename, content) {
		fs.writeFile(filename, content, function (err) {
			if (err) {
				alert("An error ocurred creating the file " + err.message);
			}
			event.sender.send('saved-file', filename);
		});
	});

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var file = __webpack_require__(8);
	var edit = __webpack_require__(9);
	var view = __webpack_require__(10);
	var window = __webpack_require__(11);
	var help = __webpack_require__(12);

	module.exports = [file, edit, view, window, help];

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _require = __webpack_require__(1),
	    app = _require.app;

	module.exports = {
	    label: 'File',
	    submenu: [{
	        label: 'Open File',
	        accelerator: 'CmdOrCtrl+O',
	        click: function click() {
	            app.emit('open-file');
	        }
	    }, {
	        label: 'New File',
	        accelerator: 'CmdOrCtrl+N',
	        click: function click() {
	            app.emit('new-file');
	        }
	    }, {
	        label: 'Save',
	        accelerator: 'CmdOrCtrl+S',
	        click: function click() {
	            app.emit('save-file');
	        }
	    }, {
	        label: 'Save As...',
	        click: function click() {
	            app.emit('save-as-file');
	        }
	    }, {
	        type: 'separator'
	    }, {
	        label: 'export',
	        submenu: [{
	            label: 'PDF',
	            click: function click() {
	                app.emit('print-to-pdf');
	            }
	        }, {
	            label: 'HTML',
	            click: function click() {
	                app.emit('print-to-html');
	            }
	        }]
	    }, {
	        type: 'separator'
	    }, {
	        label: 'preference',
	        accelerator: 'CmdOrCtrl+P',
	        click: function click() {
	            app.emit('preference');
	        }
	    }]
	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	    label: 'Edit',
	    submenu: [{
	        label: 'Undo',
	        accelerator: 'CmdOrCtrl+Z',
	        role: 'undo'
	    }, {
	        label: 'Redo',
	        accelerator: 'Shift+CmdOrCtrl+Z',
	        role: 'redo'
	    }, {
	        type: 'separator'
	    }, {
	        label: 'Cut',
	        accelerator: 'CmdOrCtrl+X',
	        role: 'cut'
	    }, {
	        label: 'Copy',
	        accelerator: 'CmdOrCtrl+C',
	        role: 'copy'
	    }, {
	        label: 'Paste',
	        accelerator: 'CmdOrCtrl+V',
	        role: 'paste'
	    }, {
	        label: 'Select All',
	        accelerator: 'CmdOrCtrl+A',
	        role: 'selectall'
	    }]
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _require = __webpack_require__(1),
	    app = _require.app;

	module.exports = {
	    label: 'View',
	    submenu: [{
	        label: 'Toggle Menu',
	        accelerator: 'Alt+X',
	        click: function click() {
	            app.emit('toggle-menu');
	        }
	    }, {
	        label: 'Reload',
	        accelerator: 'CmdOrCtrl+R',
	        click: function click(item, focusedWindow) {
	            if (focusedWindow) {
	                // on reload, start fresh and close any old
	                // open secondary windows
	                if (focusedWindow.id === 1) {
	                    BrowserWindow.getAllWindows().forEach(function (win) {
	                        if (win.id > 1) {
	                            win.close();
	                        }
	                    });
	                }
	                focusedWindow.reload();
	            }
	        }
	    }, {
	        label: 'Toggle Full Screen',
	        accelerator: function () {
	            if (process.platform === 'darwin') {
	                return 'Ctrl+Command+F';
	            } else {
	                return 'F11';
	            }
	        }(),
	        click: function click(item, focusedWindow) {
	            if (focusedWindow) {
	                focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
	            }
	        }
	    }, {
	        label: 'Toggle Developer Tools',
	        accelerator: function () {
	            if (process.platform === 'darwin') {
	                return 'Alt+Command+I';
	            } else {
	                return 'Ctrl+Shift+I';
	            }
	        }(),
	        click: function click(item, focusedWindow) {
	            if (focusedWindow) {
	                focusedWindow.toggleDevTools();
	            }
	        }
	    }]
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _require = __webpack_require__(1),
	    app = _require.app;

	module.exports = {
	  label: 'Window',
	  role: 'window',
	  submenu: [{
	    label: 'Minimize',
	    accelerator: 'CmdOrCtrl+M',
	    role: 'minimize'
	  }, {
	    label: 'Close',
	    accelerator: 'CmdOrCtrl+W',
	    role: 'close'
	  }, {
	    type: 'separator'
	  }, {
	    label: 'Reopen Window',
	    accelerator: 'CmdOrCtrl+Shift+T',
	    enabled: true,
	    key: 'reopenMenuItem',
	    click: function click() {
	      app.emit('activate');
	    }
	  }]
	};

/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	  label: 'Help',
	  role: 'help',
	  submenu: [{
	    label: 'Electron',
	    click: function click() {
	      electron.shell.openExternal('http://electron.atom.io');
	    }
	  }, {
	    label: 'GitHub',
	    click: function click() {
	      electron.shell.openExternal('https://github.com/Cacivy/mder');
	    }
	  }]
	};

/***/ }
/******/ ]);