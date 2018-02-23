import React from 'react';
import { Navbar, Nav, NavItem, Carousel, Jumbotron} from 'react-bootstrap';
import ag from './agricultureresize.jpg';
import man from './manufacturingresize.jpg';
import it from './ITresize.jpg';
import './App.css';

const App = () => {
  return (
<div>
<Navbar>
  <Navbar.Header>
    <Navbar.Brand>
      <a href="#home">Major Potential</a>
    </Navbar.Brand>
  </Navbar.Header>
  <Nav>
    <NavItem eventKey={1} href="#">
      Colleges
    </NavItem>
    <NavItem eventKey={2} href="#">
      Cities
    </NavItem>
    <NavItem eventKey={3} href="#">
      Majors
    </NavItem>
    <NavItem eventKey={4} href="#">
      About
    </NavItem>
  </Nav>
</Navbar>

<Jumbotron>
  <h1><center>Welcome to Major Potential</center></h1>
</Jumbotron>

<Carousel>
  <Carousel.Item>
    <img width={2000} height={500} alt="900x500" src={ag} />
    <Carousel.Caption>
      <h3>First slide label</h3>
      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img width={2000} height={500} alt="900x500" src={man} />
    <Carousel.Caption>
      <h3>Second slide label</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img width={2000} height={500} alt="900x500" src={it} />
    <Carousel.Caption>
      <h3>Third slide label</h3>
      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel></div>);};

export default App;
