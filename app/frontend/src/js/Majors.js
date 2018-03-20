import React, { Component } from 'react';
import {Image, Grid, Row, Col, Thumbnail} from 'react-bootstrap';
import { Link } from 'react-router-dom'
import Card from './Card.js';
import '../css/Flex.css';

{/* Use following url for default image: http://bit.ly/2CYI94d */}
{/* Grid automatically creates new rows for additional card components. */}

class Majors extends Component {
  constructor() {
    super();
    this.state = {
		majors: [],
	};
  }
  
  componentDidMount() {
	  fetch('http://api.majorpotential.me/majors_limited')
	  .then(results => {
		  return results.json();
		}).then(data => {
			let majors = data.records.map((major) => {
				return(<Card name={major.name} model='majors' domain={major.image_link} id={major.id}>  </Card>)
			})
			this.setState({majors: majors});
		})
  }

  render() {
    return <Grid><Row className="flex-row">{this.state.majors}</Row></Grid>;
  }
}

export default Majors;
