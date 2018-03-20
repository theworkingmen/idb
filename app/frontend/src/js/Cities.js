import React, { Component } from 'react';
import {Image, Grid, Row, Col, Thumbnail} from 'react-bootstrap';
import { Link } from 'react-router-dom'
import Card from './Card.js';
import cityData from '../scrapers/cities.json'
import '../css/Flex.css';

{/* Use following url for default image: http://bit.ly/2CYI94d */}
{/* Grid automatically creates new rows for additional card components. */}

class Cities extends Component {
  constructor() {
    super();
    this.state = {
		cities: [],
	};
  }
  
  componentDidMount() {
	  fetch('http://api.majorpotential.me/cities_limited')
	  .then(results => {
		  return results.json();
		}).then(data => {
			let cities = data.records.map((city) => {
				return(<Card name={city.city_name} model='cities' domain={city.city_image_link} id={city.id}>  </Card>)
			})
			this.setState({cities: cities});
		})
  }

  render() {
    return <Grid><Row className="flex-row">{this.state.cities}</Row></Grid>;
  }
}

export default Cities;
