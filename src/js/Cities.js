import React, { Component } from 'react';
import {Image, Grid, Row, Col, Thumbnail} from 'react-bootstrap';
import { Link } from 'react-router-dom'
import Card from './Card.js';

{/* Use following url for default image: http://bit.ly/2CYI94d */}
{/* Grid automatically creates new rows for additional card components. */}

class Cities extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Grid>
        <Card name='Austin' model='cities' imgsrc='http://bit.ly/2CYI94d'/>
        <Card name='College Station' model='cities' imgsrc='http://bit.ly/2CYI94d'/>
        <Card name='Houston' model='cities' imgsrc='http://bit.ly/2CYI94d'/>
        <Card name='default city' model='cities' imgsrc='http://bit.ly/2CYI94d'/>
        <Card name='default city' model='cities' imgsrc='http://bit.ly/2CYI94d'/>
        <Card name='default city' model='cities' imgsrc='http://bit.ly/2CYI94d'/>
        <Card name='default city' model='cities' imgsrc='http://bit.ly/2CYI94d'/>
        <Card name='default city' model='cities' imgsrc='http://bit.ly/2CYI94d'/>
        <Card name='default city' model='cities' imgsrc='http://bit.ly/2CYI94d'/>
        <Card name='default city' model='cities' imgsrc='http://bit.ly/2CYI94d'/>
        <Card name='default city' model='cities' imgsrc='http://bit.ly/2CYI94d'/>
        <Card name='default city' model='cities' imgsrc='http://bit.ly/2CYI94d'/>
        <Card name='default city' model='cities' imgsrc='http://bit.ly/2CYI94d'/>
        
      </Grid>
    )
  }
}

export default Cities;
