import React, { Component } from 'react';
import { Navbar, Nav, NavItem} from 'react-bootstrap';
import { Link } from 'react-router-dom'

class InstanceTitle extends Component {
	
	render() {
		return (
		    <div className="InstanceTitle">
		       <p> {this.props.name} </p>
		    </div>
		);
	}
}

export default InstanceTitle;
