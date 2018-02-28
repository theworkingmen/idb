import React from 'react';
import {Carousel, Jumbotron} from 'react-bootstrap';
import ag from '../images/agricultureresize.jpg';
import man from '../images/manufacturingresize.jpg';
import it from '../images/ITresize.jpg';

const Splash = () => {
  return (<div>
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

export default Splash;
