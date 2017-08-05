import React from 'react';
import ReactDOM from 'react-dom';

import * as themes from '../config/preview'

class Styles extends React.Component {
	render() {
        const theme = themes[this.props.theme]
		return (
            <div id="styles">
                <style>
                    {theme}
                </style>
            </div>
        )
	}
}

export default Styles