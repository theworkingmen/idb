import React, { Component } from 'react';
import { Navbar, Nav, NavItem} from 'react-bootstrap';
import { Link } from 'react-router-dom'
import '../css/App.css';
import { Jumbotron } from 'react-bootstrap';

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
