import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import InstanceTitle from './InstanceTitle.js';
import Chart from './Chart.js';
import {Jumbotron, Row, Col, Thumbnail, Button } from 'react-bootstrap';
import Map from './Map.js';
import '../css/instance.css';
import Top5 from './Top5.js';


class CollegeInstance extends Component { 
  
  render() {
    return (

      <div className="container" style={{background: "white"}}>
       
        {/* Name of City */} 
        <div className="container">
          <Jumbotron> <center>
            <h2> {this.props.match.params.name} </h2>
          </center></Jumbotron>
        </div>  

        {/* population, income, unemployment rate */} 
        <div className="container" style={{width:"85%"}}>
          <center>
          <Col sm={4}> 
            <Thumbnail className="thumbnail">
              <p> Population </p>
              <h3> 643,203 </h3>
            </Thumbnail>
          </Col>
          <Col sm={4}> 
            <Thumbnail className="thumbnail">
              <p> Income </p>
              <h3> $64,039 </h3>
            </Thumbnail>
          </Col>
          <Col sm={4}> 
            <Thumbnail className="thumbnail">
              <p> unemployment rate </p> 
              <h3> 7.3% </h3>
            </Thumbnail>
          </Col>
          </center>
        </div>

        {/* Top 5 Universities */} 
        <div className="container">
          <center>
            <h3> Top 5 Universities </h3>
            <Top5 A={"University 1"} B={"University 2"} C={"University 3"} D={"University 4"} E={"University 5"}  />
          </center>
        </div>
        
        {/* College Education and High School Graduation */} 
        <div className="container" >
          <Row>
            <Col sm={1}></Col>
            <Col sm={5}>
            <Chart  chartData=
                        { {
                          labels: ['College Educated', 'Not College Educated'],
                          datasets:[
                            {
                              label:'College Education',
                              data:[
                                40,
                                60
                              ],
                              backgroundColor:[
                                'rgba(255, 206, 86, 0.6)',
                                'rgba(75, 192, 192, 0.6)',
                              ]
                            }
                          ]
                        } } 
                    titleText="College Education" 
                    displayLegend={false}/>
            </Col>
            <Col sm={5}>
            <Chart  chartData=
                        { {
                          labels: ['High School Educated', 'Not High School Educated'],
                          datasets:[
                            {
                              label:'High School Education',
                              data:[
                                70,
                                30
                              ],
                              backgroundColor:[
                                'rgba(255, 99, 132, 0.6)',
                                'rgba(54, 162, 235, 0.6)',
                              ]
                            }
                          ]
                        } } 
                    titleText="High School Education"
                    displayLegend={false} />
            </Col>
          </Row>
          <p></p>
        </div>

        {/* Primary Care Physician, Crime Rate, Motor Vehicle Death */} 
        <div className="container" style={{width:"85%"}}>
          <center>
          <Col sm={4}> 
            <Thumbnail className="thumbnail">
              <p> Physician to Population </p>
              <h3> 1:73 </h3>
            </Thumbnail>
          </Col>
          <Col sm={4}> 
            <Thumbnail className="thumbnail">
              <p> Crime Offense to Population </p>
              <h3> 174 : 100k </h3>
            </Thumbnail>
          </Col>
          <Col sm={4}> 
            <Thumbnail className="thumbnail">
              <p> Motor Vehicle Death per year</p>
              <h3> 7 </h3>
            </Thumbnail>
          </Col>
          </center>
        </div>
        
      </div>
    );
  }
}

export default CollegeInstance;
