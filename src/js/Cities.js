import React from 'react';
import {Image, Grid, Row, Col, Thumbnail} from 'react-bootstrap';
import { Link } from 'react-router-dom'
import austin from '../images/austinTx.jpg';
import cstat from '../images/collegestationTX.jpg';
import houston from '../images/houstonTX.jpg';

const Cities = () => {
  return (
<Grid>
  <Row>
    <Col xs={6} md={4}>
      <Thumbnail>
		<Image src={austin} style={{width:"100%", height:"250px"}}/>
        <h4><center><Link to='/cities/Austin'>Austin, TX</Link></center></h4>
        <p>Universities: <Link to='#'>The University of Texas at Austin</Link></p>
        <p>Notable job opportunities: <Link to='#'>Computer Science</Link></p>
      </Thumbnail>
    </Col>
    <Col xs={6} md={4}>
      <Thumbnail>
		<Image src={cstat} style={{width:"100%", height:"250px"}}/>
        <h4><center><Link to='#'>College Station, TX</Link></center></h4>
        <p>Universities: <Link to='#'>Texas A&M University</Link></p>
        <p>Notable job opportunities:</p>
      </Thumbnail>
    </Col>
    <Col xs={6} md={4}>
      <Thumbnail>
		<Image src={houston} style={{width:"100%", height:"250px"}}/>
        <h4><center><Link to='#'>Houston, TX</Link></center></h4>
        <p>Universities: <Link to='#'>The University of Houston</Link></p>
        <p>Notable job opportunities: <Link to='#'>Petroleum Engineering</Link>, <Link to='#'>Nursing</Link></p>
      </Thumbnail>
    </Col>
  </Row>
</Grid>
);};

export default Cities;
