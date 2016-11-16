import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import Editor from './editor'

import config from '../config/codemirror'
import themes from '../config/theme'
import {ipcRenderer} from 'electron'

import './preference.css'

const storageKey = 'mder-electron-editor-config'

class Preference extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            modalIsOpen: false,
            config: config,
            themes: themes
        }

        ipcRenderer.on('preference', (event, message) => {
            this.setState({
                modalIsOpen: true
            })
        })

        this.closeModal = this.closeModal.bind(this)
        this.setConfig = this.setConfig.bind(this)
        this.tabSizeChange = this.tabSizeChange.bind(this)
        this.lineNumbersChange = this.lineNumbersChange.bind(this)
        this.lineWrappingChange = this.lineWrappingChange.bind(this)
        this.themeChange = this.themeChange.bind(this)
        this.keyMapChange = this.keyMapChange.bind(this)
    }

    closeModal() {
        this.setState({
            modalIsOpen: false
        })
    }

    setConfig(key, val) {
        this.setState(prevState => {
            prevState.config[key] = val;
            return {
                config: prevState.config
            }
        }, () => {
            Editor.setOption(key, val)
            localStorage.setItem(storageKey, JSON.stringify(this.state.config))
        })
    }

    tabSizeChange(e) {
        let index = e.target.selectedIndex
        let val = e.target.options[index].value
        
        this.setConfig('tabSize', val)
    }

    lineNumbersChange(e) {
        let checked = e.target.checked

        this.setConfig('lineNumbers', checked)
    }

    lineWrappingChange(e) {
        let checked = e.target.checked

        this.setConfig('lineWrapping', checked)
    }

    themeChange(e) {
        let index = e.target.selectedIndex
        let val = e.target.options[index].value

        this.setConfig('theme', val)
    }

    keyMapChange(e) {
        let index = e.target.selectedIndex
        let val = e.target.options[index].value

        this.setConfig('keyMap', val)
    }

    render() {
        const customStyles = {
            overlay: {
                backgroundColor: 'rgba(255, 255, 255, 0.3)'
            },
            content: {
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)', 
                boxShadow: '0 5px 15px rgba(0,0,0,.5)',
                borderRadius: '0px'
            }
        }

        const tabSize = [1, 2, 3, 4]

        const keyMap = ['default', 'sublime', 'vim', 'emacs']

        return (
            <div id="preference">
                <Modal
                    isOpen={this.state.modalIsOpen}
                    style={customStyles}
                    contentLabel="Preference"
                    onRequestClose={this.closeModal}
                    >
                    <h2 ref="subtitle">Editor</h2>
                    <form>
                        <div className="preference-item">
                            <div className="preference-key">Show lineNumbers</div>
                            <div className="preference-value">
                                <input type="checkbox" checked={this.state.config.lineNumbers}  onChange={this.lineNumbersChange}/>
                            </div>
                        </div>
                        <div className="preference-item">
                            <div className="preference-key">lineWrapping</div>
                            <div className="preference-value">
                                <input type="checkbox" checked={this.state.config.lineWrapping}  onChange={this.lineWrappingChange}/>
                            </div>
                        </div>
                        <div className="preference-item">
                            <div className="preference-key">Tab Size</div>
                            <div className="preference-value">
                                <select value={this.state.config.tabSize} onChange={this.tabSizeChange}>
                                    {
                                         tabSize.map(tab =>
                                            <option key={tab} value={tab}>{tab}</option>
                                        )
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="preference-item">
                            <div className="preference-key">Theme</div>
                            <div className="preference-value">
                                <select value={this.state.config.theme} onChange={this.themeChange}>
                                {
                                    this.state.themes.map(theme => 
                                        <option key={theme} value={theme}>{theme}</option>
                                    )
                                }
                                </select>
                            </div>
                        </div>
                        <div className="preference-item">
                            <div className="preference-key">keyMap</div>
                            <div className="preference-value">
                                <select value={this.state.config.keyMap} onChange={this.keyMapChange}>
                                    {
                                         keyMap.map(key =>
                                            <option key={key} value={key}>{key}</option>
                                        )
                                    }
                                </select>
                            </div>
                        </div>
                    </form>
                    <div style={{textAlign: 'right'}}>
                        <button className="close" onClick={this.closeModal}>Close</button>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default Preference