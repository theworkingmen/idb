import React, { Component } from 'react';
import {Carousel} from 'react-bootstrap';
import city from '../images/newyork.jpg';
import it from '../images/majors.jpg';
import uni from '../images/ut.jpg';
import '../css/splash.css'

class Splash extends Component {
  render() {
    return (
            <Carousel>
              <Carousel.Item>
                 <img width='100%' height='600px'  src={uni} alt="universities"/>
                <Carousel.Caption>
                <div className="cheader">Universities</div>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img width='100%' height='600px'  src={city} alt="cities" />
                <Carousel.Caption>
                  <div className="cheader">Cities</div>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img width='100%' height='600px'  src={it} alt="majors"/>
                <Carousel.Caption>
                 <div className="cheader">Majors</div>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
      )
    }
}

    export default Splash;
