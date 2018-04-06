import React, { Component } from 'react';
import {Carousel, Jumbotron, Row} from 'react-bootstrap';
import { Button } from 'reactstrap';
import ag from '../images/agricultureresize.jpg';
import city from '../images/newyork.jpg';
import man from '../images/manufacturingresize.jpg';
import it from '../images/majors.jpg';
import uni from '../images/ut.jpg';

import about from '../css/splash.css';

class Splash extends Component {
  render() {
    return (
            <Carousel>
              <Carousel.Item>
                 <img width='100%' height='600px'  src={uni} />
                <Carousel.Caption>
                <div className="cheader">Universities</div>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img width='100%' height='600px'  src={city} />
                <Carousel.Caption>
                  <div className="cheader">Cities</div>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img width='100%' height='600px'  src={it} />
                <Carousel.Caption>
                 <div className="cheader">Majors</div>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
      )
    }
}

    export default Splash;
