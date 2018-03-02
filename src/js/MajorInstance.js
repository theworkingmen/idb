import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import InstanceTitle from './InstanceTitle.js';
import '../css/App.css';

class MajorInstance extends Component {

	
	
	render() {
		return (
		    <div className="container">
		       <InstanceTitle name={this.props.match.params.name}/>
		       
		       <p id="summary"> Summary: insert api call here </p>
		       <p id="employ_rate"> Employment Rate: insert api call here </p>
		       <p id="relevance"> Relevance in Industry: insert api call here </p>
		       <p id="salaries"> Salaries: insert api call here </p>
		       
		       
		    </div>
		);
	}
}

export default MajorInstance;
