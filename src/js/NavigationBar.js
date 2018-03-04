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
		        <Navbar inverse>
					<Navbar.Header>
						<Navbar.Brand>
							<Link to='/'>Major Potential</Link>
						</Navbar.Brand>
					</Navbar.Header>
					<Nav activeKey={this.state.highlight}>
						<NavItem eventKey={1} href="/colleges">
							Colleges
						</NavItem>
						<NavItem eventKey={2} href="/cities">
							Cities
						</NavItem>
						<NavItem eventKey={3}  href="/majors">
							Majors
						</NavItem>
						<NavItem eventKey={4} href="/about">
							About
						</NavItem>
					</Nav>
				</Navbar>
		    </div>
		);
	}
}

export default NavigationBar;
