import React, { Component } from 'react';
import { Navbar, Nav, NavItem} from 'react-bootstrap';

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
							<a href="#home">Major Potential</a>
						</Navbar.Brand>
					</Navbar.Header>
					<Nav activeKey={this.state.highlight}>
						<NavItem eventKey={1} href="#">
							Colleges
						</NavItem>
						<NavItem eventKey={2} href="#">
							Cities
						</NavItem>
						<NavItem eventKey={3} href="#">
							Majors
						</NavItem>
						<NavItem eventKey={4} href="#">
							About
						</NavItem>
					</Nav>
				</Navbar>
		    </div>
		);
	}
}

export default NavigationBar;
