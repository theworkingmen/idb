import React from 'react';
import {Image, Grid, Row, Col, Thumbnail} from 'react-bootstrap';
import { Link } from 'react-router-dom'
import ut from '../images/UTlogo.jpg';
import uh from '../images/UHlogo.png';
import am from '../images/A&Mlogo.png';

const Colleges = () => {
  return (
<Grid>
  <Row>
    <Col xs={6} md={4}>
      <Thumbnail>
		<Image src={ut} style={{width:"100%", height:"250px"}}/>
        <h4><center><Link to='#'>The University of Texas at Austin</Link></center></h4>
        <p>Location: <Link to='#'>Austin, TX</Link></p>
        <p>Highest Ranked Major: <Link to='#'>Computer Science</Link></p>
      </Thumbnail>
    </Col>
    <Col xs={6} md={4}>
      <Thumbnail>
		<Image src={am} style={{width:"100%", height:"250px"}}/>
        <h4><center><Link to='#'>Texas A&M University</Link></center></h4>
        <p>Location: <Link to='#'>College Station, TX</Link></p>
        <p>Highest Ranked Major: <Link to='#'>Petroleum Engineering</Link></p>
      </Thumbnail>
    </Col>
    <Col xs={6} md={4}>
      <Thumbnail>
		<Image src={uh} style={{width:"100%", height:"250px"}}/>
        <h4><center><Link to='#'>The University of Houston</Link></center></h4>
        <p>Location: <Link to='#'>Houston, TX</Link></p>
        <p>Highest Ranked Major: <Link to='#'>Computer Science</Link></p>
      </Thumbnail>
    </Col>
  </Row>
</Grid>
);};

export default Colleges;
