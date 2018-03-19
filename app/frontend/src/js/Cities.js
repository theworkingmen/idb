import React, { Component } from 'react';
import {Image, Grid, Row, Col, Thumbnail} from 'react-bootstrap';
import { Link } from 'react-router-dom'
import Card from './Card.js';
import cityData from '../scrapers/cities.json'
import '../css/Flex.css';

{/* Use following url for default image: http://bit.ly/2CYI94d */}
{/* Grid automatically creates new rows for additional card components. */}

class Cities extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let cities = [];
    for (var i = 0; i < cityData.length; i++) {
        cities.push(<Card name={cityData[i].city_name} model='cities' domain={cityData[i].city_image} index={i}> </Card>);
    }
    return <Grid><Row className="flex-row">{cities}</Row></Grid>;
  }
}

export default Cities;
