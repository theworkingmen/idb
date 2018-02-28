import React, { Component } from 'react';
import { Navbar, Nav, NavItem} from 'react-bootstrap';
import { Link } from 'react-router-dom'
import InstanceTitle from './InstanceTitle.js';

class MajorInstance extends Component {

	
	render() {
		return (
		    <div className="MajorInstance">
		       <InstanceTitle name={this.props.match.params.name}/>
		    </div>
		);
	}
}

export default MajorInstance;
