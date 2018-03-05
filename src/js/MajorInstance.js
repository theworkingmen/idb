import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import {Jumbotron, Row, Col} from 'react-bootstrap';
import InstanceTitle from './InstanceTitle.js';
import '../css/App.css';
import Chart from './Chart.js';

class MajorInstance extends Component {


	
	
	render() {

		return (
			<div className="container">
		    
		    <Jumbotron>
		    	<center> <InstanceTitle name={this.props.match.params.name}/> </center>
		      
		      <p id="summary"> Summary: insert api call here </p>
		      <p id="employ_rate"> Employment Rate: insert api call here </p>
		      <p id="relevance"> Relevance in Industry: insert api call here </p>
		      <p id="salaries"> Salaries: insert api call here </p>
	      	
		    </Jumbotron>
		    
		  </div>
		  
		  
		  
		);
	}
}

export default MajorInstance;
