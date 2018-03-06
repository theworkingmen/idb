import React, { Component } from 'react';
import {Image, Grid, Row, Col, Thumbnail} from 'react-bootstrap';
import { Link } from 'react-router-dom'
import Card from './Card.js';


{/* Use following url for default image: http://bit.ly/2CYI94d */}
{/* Grid automatically creates new rows for additional card components. */}

class Colleges extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (

      <Grid>
        <Card name='Rice University' model='colleges' domain='rice.edu'> </Card>
        <Card name='The University of Texas at Austin' model='colleges' domain='utexas.edu'> </Card>
        <Card name='Texas A&M' model='colleges' domain='tamu.edu'> </Card>
        <Card name='Default College' model='colleges' domain='clearbit.com'> </Card>
        <Card name='Default College' model='colleges' domain='clearbit.com'> </Card>
        <Card name='Default College' model='colleges' domain='clearbit.com'> </Card>
        <Card name='Default College' model='colleges' domain='clearbit.com'> </Card>
        <Card name='Default College' model='colleges' domain='clearbit.com'> </Card>
        <Card name='Default College' model='colleges' domain='clearbit.com'> </Card>
        <Card name='Default College' model='colleges' domain='clearbit.com'> </Card>
        <Card name='Default College' model='colleges' domain='clearbit.com'> </Card>
        <Card name='Default College' model='colleges' domain='clearbit.com'> </Card>

      </Grid>
    )
  }

}

export default Colleges;