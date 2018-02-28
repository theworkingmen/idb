import React from 'react';
import {Image, Grid, Row, Col, Thumbnail} from 'react-bootstrap';
import { Link } from 'react-router-dom'
import nursing from './UTnursing.jpg';
import petrol from './manufacture.jpg';
import it from './ITresize.jpg';

const Majors = () => {
  return (
<Grid>
  <Row>
    <Col xs={6} md={4}>
      <Thumbnail>
		<Image src={petrol} style={{width:"100%", height:"250px"}}/>
        <h4><center><Link to='#'>Petroleum Engineering</Link></center></h4>
        <p>Universities:</p>
		<ul>
			<li><Link to='#'>Texas A&M University</Link></li>
			<li><Link to='#'>The University of Texas at Austin</Link></li>
		</ul> 
        <p>Most prominent city: <Link to='#'>Houston, Tx</Link></p>
      </Thumbnail>
    </Col>
    <Col xs={6} md={4}>
      <Thumbnail>
		<Image src={nursing} style={{width:"100%", height:"250px"}}/>
        <h4><center><Link to='#'>Nursing</Link></center></h4>
        <p>Universities:</p>
        <ul>
			<li><Link to='#'>The University of Texas at Austin</Link></li>
		</ul> 
        <p>Most prominent city: <Link to='#'>Houston, Tx</Link></p>
      </Thumbnail>
    </Col>
    <Col xs={6} md={4}>
      <Thumbnail>
		<Image src={it} style={{width:"100%", height:"250px"}}/>
        <h4><center><Link to='#'>Information Technology</Link></center></h4>
        <p>Universities:</p>
        <ul>
			<li><Link to='#'>The University of Texas at Austin</Link></li>
			<li><Link to='#'>Texas A&M University</Link></li>
			<li><Link to='#'>The University of Houston</Link></li>
		</ul>
        <p>Most prominent city: <Link to='#'>Austin, Tx</Link></p>
      </Thumbnail>
    </Col>
  </Row>
</Grid>
);};

export default Majors;
