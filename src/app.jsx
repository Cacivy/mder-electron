import React from 'react';
import ReactDOM from 'react-dom';

import Editor from './component/editor';
import Preview from './component/preview';
import Preference from './component/preference';

import './static/style.css'

class App extends React.Component {
	render() {
		return (
			<div>
				<Editor />
				<Preview />
				<Preference />
			</div>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('container'));