import React, { Component } from 'react';
import { Navbar, Nav, NavItem} from 'react-bootstrap';
import { Link } from 'react-router-dom'
import InstanceTitle from './InstanceTitle.js';
import '../css/App.css';

class CityInstance extends Component {

	
	
	render() {
		return (
		    <div className="container">
		       <InstanceTitle name={this.props.match.params.name}/>
		       
		       <p id="state"> State: insert api call here  </p>
		       <p id="summary"> Summary: insert api call here  </p>
		       <p id="population"> Population: insert api call here  </p>
		       <p id="crime_rate"> Crime Rate: insert api call here  </p>
		       <p id="cost_living"> Average Cost of Living: insert api call here  </p>
		       <p id="med_income"> Median Income: insert api call here  </p>
		          
		       
		    </div>
		);
	}
}

export default CityInstance;
