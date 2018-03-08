import React, { Component } from 'react';
import {Image, Grid, Row, Col, Thumbnail} from 'react-bootstrap';
import { Link } from 'react-router-dom'
import Card from './Card.js';
import collegeData from '../scrapers/university.json'


{/* Use following url for default image: http://bit.ly/2CYI94d */}
{/* Grid automatically creates new rows for additional card components. */}

class Colleges extends Component {
  constructor(props) {
    super(props);
  }
  render() {
	  
	let colleges = [];
    for (var i = 0; i < collegeData.length; i++) {
        colleges.push(<Card name={collegeData[i].name} model='colleges' domain={collegeData[i].website}> </Card>);
    }
    return <Grid>{colleges}</Grid>;
}
 

}

export default Colleges;
