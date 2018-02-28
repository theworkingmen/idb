import React, { Component } from 'react';
import { Navbar, Nav, NavItem} from 'react-bootstrap';
import { Link } from 'react-router-dom'

class NavigationBar extends Component {
	constructor(props) {
		super(props);
		this.state = {highlight: props.highlight};
	}
	
	render() {
		return (
		    <div className="NavigationBar">
		        <Navbar>
					<Navbar.Header>
						<Navbar.Brand>
							<Link to='/'>Major Potential</Link>
						</Navbar.Brand>
					</Navbar.Header>
					<Nav activeKey={this.state.highlight}>
						<NavItem eventKey={1}>
							<Link to='/colleges'>Colleges</Link>
						</NavItem>
						<NavItem eventKey={2}>
							<Link to='/cities'>Cities</Link>
						</NavItem>
						<NavItem eventKey={3}>
							<Link to='/majors'>Majors</Link>
						</NavItem>
						<NavItem eventKey={4} href="#">
							<Link to='/about'>About</Link>
						</NavItem>
					</Nav>
				</Navbar>
		    </div>
		);
	}
}

export default NavigationBar;
