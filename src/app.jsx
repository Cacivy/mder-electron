import React from 'react';
import ReactDOM from 'react-dom';

import Editor from './component/editor';
import Preview from './component/preview';
import Preference from './component/preference';
import Styles from './component/styles';

import './static/style.css'

class App extends React.Component {
	constructor() {
		super()
		this.state = {
			previewTheme: 'github'
		}
		this.onUpdatePreview = this.onUpdatePreview.bind(this)
	}

	onUpdatePreview(val) {
		this.setState({previewTheme: val})
	}

	render() {
		return (
			<div>
				<Editor />
				<Preview theme={this.state.previewTheme} />
				<Preference onUpdatePreview={this.onUpdatePreview} />
				<Styles theme={this.state.previewTheme}/>
			</div>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('container'));

if (process.env.NODE_ENV === 'development') {
  if (module.hot) {
    module.hot.accept()
  }
}