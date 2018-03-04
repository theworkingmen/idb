import React, { Component } from 'react';
import {Carousel, Jumbotron, Row} from 'react-bootstrap';
import ag from '../images/agricultureresize.jpg';
import city from '../images/seattle.jpg';
import man from '../images/manufacturingresize.jpg';
import it from '../images/ITresize.jpg';
import uni from '../images/UTAustin.jpg';

import about from '../css/splash.css';

class Splash extends Component {
  render() {
    return (
      <div>
        <div class="welcome">
          <center>
            <Row>
              <p> </p>
              <logo_m><center>Welcome to Major Potential</center></logo_m>
            </Row>
          </center>
        </div>

        <div>
          <center>
            <Carousel>
              <Carousel.Item>
                 <img width={1500} height={500} alt="900x500" src={uni} />
                <Carousel.Caption>
                  <h3>Universities</h3>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img width={1500} height={500} alt="900x500" src={city} />
                <Carousel.Caption>
                  <h3>Cities</h3>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img width={1500} height={500} alt="900x500" src={it} />
                <Carousel.Caption>
                  <h3>Majors: Infomration Technology</h3>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img width={1500} height={500} alt="900x500" src={ag} />
                <Carousel.Caption>
                  <h3>Jobs: Agriculture</h3>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img width={1500} height={500} alt="900x500" src={man} />
                <Carousel.Caption>
                  <h3>Jobs: Manufacturing Industry</h3>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </center>
        </div>
      </div>
      )
    }
}

    export default Splash;
