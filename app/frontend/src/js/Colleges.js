import React, { Component } from 'react';
import {Image, Grid, Row, Col, Thumbnail} from 'react-bootstrap';
import { Link } from 'react-router-dom'
import Card from './Card.js';
import '../css/Flex.css';


{/* Use following url for default image: http://bit.ly/2CYI94d */}
{/* Grid automatically creates new rows for additional card components. */}

class Colleges extends Component {
  constructor() {
    super();
    this.state = {
		colleges: [],
	};
  }
  
  componentDidMount() {
	  fetch('http://api.majorpotential.me/universities_limited')
	  .then(results => {
		  return results.json();
		}).then(data => {
			let colleges = data.records.map((college) => {
				return(<Card name={college.name} model='majors' domain={college.image_link} id={college.id}>  </Card>)
			})
			this.setState({colleges: colleges});
		})
  }

  render() {
    return <Grid><Row className="flex-row">{this.state.colleges}</Row></Grid>;
  }
}

export default Colleges;
