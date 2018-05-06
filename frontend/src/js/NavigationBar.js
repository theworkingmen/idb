import React, {
    Component
} from 'react';
import {
    Redirect
} from 'react-router'
import {
    Navbar,
    Nav,
    NavItem,
    FormGroup,
    FormControl,
    Button
} from 'react-bootstrap';
import {
    LinkContainer
} from 'react-router-bootstrap'
import {
    Link
} from 'react-router-dom'
import '../css/index.css'

class NavigationBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            highlight: props.highlight,
            search: "search",
            redirect: false,
            value: ''
        };
    }

    handleChange(e) {
        this.setState({
            value: e.target.value.replace("%", "").replace("/", "").replace("\\", "")
        });
    }

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.setState({
                redirect: true
            })
        }
    }

    render() {
        var redirection = null;
        if (this.state.redirect) {
            redirection = <Redirect to={`/${this.state.search}/${this.state.value}`} />;
            this.setState({
                redirect: false
            })
        }
        return (
            <div className = "Nav">
		        <Navbar fixedTop={true} inverse={true}>
					<Navbar.Header>
						<Navbar.Brand>
							<Link to='/'>Major Potential</Link>
						</Navbar.Brand>
					 <Navbar.Toggle />
					</Navbar.Header>
					<Navbar.Collapse>
					<Nav activeKey={this.state.highlight}>
						<LinkContainer to="/colleges" exact={true}>
                			<NavItem>Universities</NavItem>
						 </LinkContainer>
						<LinkContainer to="/cities" exact={true}>
                			<NavItem>Cities</NavItem>
						 </LinkContainer>
						 <LinkContainer to="/majors" exact={true}>
                 			<NavItem>Majors</NavItem>
 						 </LinkContainer>
						 <LinkContainer to="/about" exact={true}>
                 			<NavItem>About</NavItem>
 						 </LinkContainer>
					</Nav>
					<Navbar.Form pullRight>
						<FormGroup>
							<FormControl type="text"
										 placeholder="Search"
										 value={this.state.value}
										 onChange={this.handleChange.bind(this)}
										 onKeyPress={this.handleKeyPress.bind(this)} />
						</FormGroup>{' '}
						<Link to={`/${this.state.search}/${this.state.value}`}>
							<Button type="submit">Search</Button></Link>

					</Navbar.Form>
					</Navbar.Collapse>
				</Navbar>
				{redirection}
		    </div>
        );
    }
}

export default NavigationBar;