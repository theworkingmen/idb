import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import InstanceTitle from './InstanceTitle.js';
import Chart from './Chart.js';
import {Jumbotron, Row, Col } from 'react-bootstrap';
import '../css/App.css';

class CollegeInstance extends Component {

	constructor(){
    super();
    this.state = {
      chartData:{}
    }
  }

  componentWillMount(){
    this.getChartData();
  }

  getChartData(){
    // Ajax calls here
    this.setState({
      chartData:{
        labels: ['White', 'Asian', 'Hispanic', 'African American', 'Other'],
        datasets:[
          {
            label:'Population',
            data:[
              617594,
              181045,
              153060,
              106519,
              105162,
              95072
            ],
            backgroundColor:[
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)'
            ]
          }
        ]
      }
    });
  }
	
	render() {
		return (
	    <div className="container" style={{background:'white'}}>
		    	
				<center><InstanceTitle name={this.props.match.params.name}/></center>

				<Col md={6}>
					<p id="summary"> Summary: insert api call here </p>
					<p id="city"> City: insert api call here  </p>
					<p id="state"> State: insert api call here  </p>
					<p id="social_media"> Social Media: insert api call here  </p>
					<p id="resturants"> Number of Resturants: insert api call here  </p>
					<p id="ranking"> National Ranking: insert api call here  </p>
					<p id="acceptance"> Acceptance Rate: insert api call here  </p>
					<p id="tuition_in"> Tuition(in-state): insert api call here  </p>
					<p id="tuition_out"> Tuition(out-of-state): insert api call here  </p>
				</Col>
				<Col md={6}>
		    	<Chart chartData={this.state.chartData} titleText="University Demographic" legendPosition="right"/>
				</Col>
	    </div>
		);
	}
}

export default CollegeInstance;
