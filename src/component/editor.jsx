import React from 'react';
import ReactDOM from 'react-dom';

import marked from 'marked'
import highlight from 'highlight.js'
import CodeMirror from 'CodeMirror'
import 'CodeMirror/addon/mode/overlay'
import 'CodeMirror/addon/scroll/simplescrollbars'
import 'CodeMirror/mode/xml/xml.js'
import 'CodeMirror/mode/markdown/markdown.js'
import 'CodeMirror/mode/gfm/gfm.js'
import 'CodeMirror/mode/javascript/javascript.js'
import 'CodeMirror/mode/css/css.js'
import 'CodeMirror/mode/htmlmixed/htmlmixed.js'
import 'CodeMirror/keymap/emacs.js'
import 'CodeMirror/keymap/sublime.js'
import 'CodeMirror/keymap/vim.js'
import configCodemirror from '../config/codemirror'
import configHighlight from '../config/highlight'
import {ipcRenderer} from 'electron'
import sample from '../config/sample'

import 'CodeMirror/lib/codemirror.css'
import 'CodeMirror/addon/scroll/simplescrollbars.css'
import './editor.css'

// themes
import 'CodeMirror/theme/eclipse.css'
import 'CodeMirror/theme/elegant.css'
import 'CodeMirror/theme/monokai.css'
import 'CodeMirror/theme/material.css'
import 'CodeMirror/theme/night.css'
import 'CodeMirror/theme/rubyblue.css'
import 'CodeMirror/theme/solarized.css'

// highlight
import codeStyleDefault from 'highlight.js/styles/default.css'

var editor
class Editor extends React.Component {
    constructor(props) {
        super(props)
        marked.setOptions({
            renderer: new marked.Renderer(),
            gfm: true,
            tables: true,
            list: true,
            breaks: false,
            pedantic: false,
            sanitize: false,
            smartLists: true,
            smartypants: false,
            highlight: function (code, lang) {
                return highlight.highlightAuto(code).value
            }
        });

        this.componentDidMount = this.componentDidMount.bind(this)
        this.setValue = this.setValue.bind(this)

        ipcRenderer.on('open-file', (event, data) => {
            this.setValue(data)
        })

        ipcRenderer.on('new-file', (event) => {
            let val = editor.getValue()
            if (val) {
                ipcRenderer.send('message-dialog', 'question', '提示', '当前文本没有保存，是否保存?')
                ipcRenderer.once('information-dialog-selection', (e, index) => {
                    if (index) {
                        // No
                        this.setValue()
                    } else {
                        // YES
                        ipcRenderer.send('save-dialog', val)
                        ipcRenderer.once('saved-file', (ev, filename) => {
                            ipcRenderer.send('message-dialog', 'info', '提示', '保存成功('+filename+')', [])
                            this.setValue()
                        })
                    }
                })
            }
        })

        ipcRenderer.on('save-file', (event, filePath) => {
            let val = editor.getValue()
            ipcRenderer.send('save-file', filePath, val)
        })

        ipcRenderer.on('save-as-file', (event, filePath) => {
            let val = editor.getValue()
            if (val) {
                ipcRenderer.send('save-dialog', val)
                ipcRenderer.once('saved-file', (ev, filename) => {
                    ipcRenderer.send('message-dialog', 'info', '提示', '保存成功('+filename+')', [])
                })
            }
        })

        ipcRenderer.on('wrote-pdf', function (event, path) {
            ipcRenderer.send('print-to-pdf')
        })

        ipcRenderer.on('wrote-html', event => {
            ipcRenderer.send('print-to-html', marked(editor.getValue()))
        })

        ipcRenderer.on('paste-as-link', (event, type, text) => {
            var content = ''
            switch(type) {
                case 'link':
                    content = `[${editor.getSelection()}](${text})`
                break;
                case 'image':
                    content = `![${editor.getSelection()}](${text})`
                break;
            }
            editor.replaceSelection(content, 'around')
        })
    }

    static setOption (key, val) {
        if (editor) {
            editor.setOption(key, val)
        }
    }

    static setCodeStyle(style) {
        var links = document.querySelectorAll('.codestyle');
        Array.prototype.forEach.call(links, function(link) {
            link.rel = 'stylesheet';
            link.disabled = !link.href.match(style + '\\.css$');
        });
    }

    setValue(val) {
        editor.setValue(val || '')
        this.preview()
    }

    preview() {
        document.getElementById('preview').innerHTML = marked(editor.getValue())
    }

    componentDidMount() {
        editor = CodeMirror.fromTextArea(document.getElementById('text'), Object.assign({}, configCodemirror))
        this.setValue(sample)
        Editor.setCodeStyle(configHighlight.theme)
        // keyup event
        editor.on('keyup', (cm, e) => {
            this.preview()
        })
        // scroll event
        editor.on('scroll', (cm, e) => {
            var scroll_info = cm.getScrollInfo()
            var scale = (scroll_info.top) / (scroll_info.height - scroll_info.clientHeight);

            document.getElementById('preview').scrollTop = document.getElementById('preview').scrollHeight * scale
        })
    }

    render() {
        return (
            <div className="editor">
                <textarea id="text"></textarea>
            </div>
        )
    }
}

export default Editor