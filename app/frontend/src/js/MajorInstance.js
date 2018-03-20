import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import {Jumbotron, Row, Col, Thumbnail} from 'react-bootstrap';
import InstanceTitle from './InstanceTitle.js';
import '../css/instance.css';
import Chart from './Chart.js';
import Top5 from './Top5.js';

class MajorInstance extends Component {

  render() {
    return (
      <div className="container" style={{background: "white"}}>
       
            {/* Name of Major */} 
            <div className="container" >
              <Jumbotron> <center>
                <h2> {this.props.match.params.name} </h2>
              </center></Jumbotron>
            </div>  

            {/* Top 5 Universities */} 
            <div className="container" >
              <center>
                <h3> Top 5 Universities </h3>
                <Top5 A={"College 1"} B={"College 2"} C={"College 3"} D={"College 4"} E={"College 5"}  />
              </center>
            </div>

            {/* Top 5 Cities */} 
            <div className="container" >
              <center>
                <h3> Top 5 Cities </h3>
                <Top5 A={"City 1"} B={"City 2"} C={"City 3"} D={"City 4"} E={"City 5"}  />
              </center>
            </div>

            {/* Average Wage, Wage Growth */} 
            <div className="container" style={{width:"85%"}}>
              <center>
              <Col sm={2}></Col>
              <Col sm={4}> 
                <Thumbnail className="thumbnail">
                  <p> Average Wage </p>
                  <h3> 88,750 </h3>
                </Thumbnail>
              </Col>
              <Col sm={4}> 
                <Thumbnail className="thumbnail">
                  <p> Wage Growth </p>
                  <h3> 1.4% </h3>
                </Thumbnail>
              </Col>
              </center>
            </div>


            {/* Total Degrees, Workforce, STEM */} 
            <div className="container" style={{width:"85%"}}>
              <center>
              <Col sm={4}> 
                <Thumbnail className="thumbnail">
                  <p> Total Degrees </p>
                  <h3> 28,384 </h3>
                </Thumbnail>
              </Col>
              <Col sm={4}> 
                <Thumbnail className="thumbnail">
                  <p> Workforce </p>
                  <h3> 1.77M </h3>
                </Thumbnail>
              </Col>
              <Col sm={4}> 
                <Thumbnail className="thumbnail">
                  <p> STEM </p>
                  <h3> True </h3>
                </Thumbnail>
              </Col>
              </center>
            </div>

          </div>
      
      
      
    );
  }
}

export default MajorInstance;
