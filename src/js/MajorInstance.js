import React, { Component } from 'react';
import { Navbar, Nav, NavItem} from 'react-bootstrap';
import { Link } from 'react-router-dom'
import InstanceTitle from './InstanceTitle.js';

class MajorInstance extends Component {

	
	
	render() {
		var boldtext = {
			color: "red"
		};
		
		return (
		    <div className="MajorInstance" style={boldtext}>
		       <InstanceTitle name={this.props.match.params.name}/>
		    </div>
		);
	}
}

export default MajorInstance;
