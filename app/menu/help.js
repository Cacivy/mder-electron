module.exports = {
  label: 'Help',
  role: 'help',
  submenu: [{
    label: 'Electron',
    click: function () {
      electron.shell.openExternal('http://electron.atom.io')
    }
  }, {
    label: 'GitHub',
    click: function () {
      electron.shell.openExternal('https://github.com/Cacivy/mder')
    }
  }]
}