import React, { Component } from 'react';
import {Image, Grid, Row, Col, Thumbnail} from 'react-bootstrap';
import { Link } from 'react-router-dom'
import Card from './Card.js';
import majorData from '../scrapers/majors.json'
import '../css/Flex.css';

{/* Use following url for default image: http://bit.ly/2CYI94d */}
{/* Grid automatically creates new rows for additional card components. */}

class Majors extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let majors = [];
    for (var i = 0; i < majorData.length; i++) {
        majors.push(<Card name={majorData[i].name} model='majors' domain={majorData[i].image_link}> </Card>);
    }
    return <Grid><Row className="flex-row">{majors}</Row></Grid>;
  }
}

export default Majors;
