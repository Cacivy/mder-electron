const storageKey = 'mder-electron-editor-config'

var localConfig = localStorage.getItem(storageKey)

var config = localConfig ? JSON.parse(localConfig) :  {
    mode: 'gfm',
    lineNumbers: true,
    theme: "default",
    autofocus: true,
    lineWrapping: true,
    scrollbarStyle: "simple", // overlay
    tabSize: 4,
    keyMap: 'default'
}

export default config