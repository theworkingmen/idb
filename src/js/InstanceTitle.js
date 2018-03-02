import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import '../css/App.css';

class InstanceTitle extends Component {
	
	render() {
		return (
			<div className="container InstanceTitle">
				<p><center>{this.props.name}</center> </p>
		    </div>
		);
	}
}

export default InstanceTitle;
