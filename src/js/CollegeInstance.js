import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import InstanceTitle from './InstanceTitle.js';
import '../css/App.css';

class CollegeInstance extends Component {

	
	
	render() {
		return (
		    <div className="container">
		       <InstanceTitle name={this.props.match.params.name}/>
		       
		       <p id="summary"> Summary: insert api call here </p>
		       <p id="city"> City: insert api call here  </p>
		       <p id="state"> State: insert api call here  </p>
		       <p id="social_media"> Social Media: insert api call here  </p>
		       <p id="resturants"> Number of Resturants: insert api call here  </p>
		       <p id="ranking"> National Ranking: insert api call here  </p>
		       <p id="acceptance"> Acceptance Rate: insert api call here  </p>
		       <p id="tuition_in"> Tuition(in-state): insert api call here  </p>
		       <p id="tuition_out"> Tuition(out-of-state): insert api call here  </p>
		       
		    </div>
		);
	}
}

export default CollegeInstance;
