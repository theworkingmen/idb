import React from 'react';
import { Jumbotron } from 'react-bootstrap';
import {Image, Grid, Row, Col, Thumbnail, Button, ButtonToolbar, Table} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../css/about.css';
import abel_pic from '../images/authors/abel_pic.jpg';
import sungsup_pic from '../images/authors/sungsup_pic.jpg';
import mitchell_pic from '../images/authors/mitchell_pic.jpg';
import neal_pic from '../images/authors/neal_pic.jpg';
import christian_pic from '../images/authors/christian_pic.jpg';

const About = () => {
  return (
<div className ='container'>
<div className = 'introduction'>
<Jumbotron>
<logo> <center> Major Potential </center></logo>
<p></p>
  <intro ><center> A website that links universities, the cities where the universities are located,
  and job opportunities in cities for graduates in certain majors.</center> </intro>
<p></p>
<p></p>
</Jumbotron>
</div>

<div className = 'group_members'>
<block> <center> The Team </center> </block>
<p></p>
<Grid>
  <Row>
    <Col xs={6} md={4}>
    <Thumbnail>
      <Image src={mitchell_pic}
             style={{width:"100%", height:"250px"}}/>
      <h4><center>Mitchell Traylor</center></h4>
      <p>Role: Front-End, Report Author</p>
      <p>Bio - Computer Science third-year, with special focus on cybersecurity</p>
    </Thumbnail>
    </Col>
    <Col xs={6} md={4}>
    <Thumbnail>
      <Image src={sungsup_pic}
             style={{width:"100%", height:"250px"}}/>
      <h4><center>Sungsup Lee</center></h4>
      <p>Role: Back-End, Front-End</p>
      <p>Bio - Studies Computer Science at UT Austin.</p>
    </Thumbnail>
    </Col>
    <Col xs={6} md={4}>
      <Thumbnail>
        <Image src={abel_pic}
               style={{width:"100%", height:"250px"}}/>
        <h4><center>Abel Tesfaye</center></h4>
        <p>Role: Back-End, Front-End</p>
        <p>Bio - I am a junior Computer Science major at UT Austin.</p>
      </Thumbnail>
    </Col>
  </Row>
  <Row>
  <Col xs={6} md={4}>
  <Thumbnail>
    <Image src={neal_pic}
           style={{width:"100%", height:"250px"}}/>
    <h4><center>Neal Friesenhahn</center></h4>
    <p>Role: Web Hosting, API Design</p>
    <p>Bio - Studies Computer Science at UT Austin.</p>
  </Thumbnail>
  </Col>
  <Col xs={6} md={4}>
  <Thumbnail>
    <Image src={christian_pic}
           style={{width:"100%", height:"250px"}}/>
    <h4><center>Christian Onuogu</center></h4>
    <p>Role: Front-End</p>
    <p>Bio - Studies Computer Science at UT Austin.</p>
  </Thumbnail>
  </Col>
  </Row>
</Grid>
</div>


<div>
  <block_small> <p> </p> <center> Sources </center> <p></p></block_small>
    <a href="https://www.bls.gov/developers/api_signature_v2.html" class="list-group-item active">Bureau of Labor Statistics</a>
    <a href="https://www.census.gov/data/developers/data-sets/cbp-nonemp-zbp/cbp-api.html" class="list-group-item">United States Census Bureau</a>
    <a href="https://api.data.gov/docs/ed/" class="list-group-item">Department of Education</a>
</div>

<div>
<center>
<block_small>  <p> </p> <p> </p> <center>Project Links</center> <p></p> </block_small>
 <Button>
 <a href = "https://theworkingmen.gitbooks.io/api/content/" > Github </a> </Button>
<p> </p>
 <Button> <a href = "https://theworkingmen.gitbooks.io/api/content/" > API </a></Button>
<p> </p>
<Button> <a href = "https://theworkingmen.gitbooks.io/major-potential/content/" > Report </a></Button>
<p></p> <p></p>

</center>
</div>

</div>

);};

export default About;
