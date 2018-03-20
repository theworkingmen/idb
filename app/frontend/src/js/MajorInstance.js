import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import {Jumbotron, Row, Col, Thumbnail} from 'react-bootstrap';
import InstanceTitle from './InstanceTitle.js';
import '../css/App.css';
import Chart from './Chart.js';
import Top5 from './Top5.js';

class MajorInstance extends Component {


  
  
  render() {

    return (
      <div className="container" style={{background: "white"}}>
       
            {/* Name of Major */} 
            <div className="container" style={{width:"95%"}}>
              <Jumbotron> <center>
                <h2> Major Name </h2>
              </center></Jumbotron>
            </div>  

            {/* Top 5 Universities */} 
            <div className="container" style={{width:"95%", padding:"1em"}}>
              <center>
                <Top5 A={"College 1"} B={"College 2"} C={"College 3"} D={"College 4"} E={"College 5"}  />
              </center>
            </div>

            {/* Top 5 Cities */} 
            <div className="container" style={{width:"95%", padding:"1em"}}>
              <center>
                <Top5 A={"City 1"} B={"City 2"} C={"City 3"} D={"City 4"} E={"City 5"}  />
              </center>
            </div>

            {/* Average Wage, Wage Growth */} 
            <div className="container" style={{width:"85%", padding:"1em"}}>
              <center>
              <Col sm={2}></Col>
              <Col sm={4}> 
                <Thumbnail style={{background:"light-blue", height:"7em"}}>
                  <p> Average Wage </p>
                  <h2> 88,750 </h2>
                </Thumbnail>
              </Col>
              <Col sm={4}> 
                <Thumbnail style={{background:"light-blue", height:"7em"}}>
                  <p> Wage Growth </p>
                  <h2> 1.4% </h2>
                </Thumbnail>
              </Col>
              </center>
            </div>


            {/* Total Degrees, Workforce, STEM */} 
            <div className="container" style={{width:"85%", padding:"1em"}}>
              <center>
              <Col sm={4}> 
                <Thumbnail style={{background:"light-blue", height:"7em"}}>
                  <p> Total Degrees </p>
                  <h2> 28,384 </h2>
                </Thumbnail>
              </Col>
              <Col sm={4}> 
                <Thumbnail style={{background:"light-blue", height:"7em"}}>
                  <p> Workforce </p>
                  <h2> 1.77M </h2>
                </Thumbnail>
              </Col>
              <Col sm={4}> 
                <Thumbnail style={{background:"light-blue", height:"7em"}}>
                  <p> STEM </p>
                  <h2> True </h2>
                </Thumbnail>
              </Col>
              </center>
            </div>

          </div>
      
      
      
    );
  }
}

export default MajorInstance;
