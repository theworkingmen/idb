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
        <div className="container" style={{width:"95%"}}>
          <Jumbotron> <center>
            <h2> City Name </h2>
          </center></Jumbotron>
        </div>  

        {/* population, income, unemployment rate */} 
        <div className="container" style={{width:"85%"}}>
          <center>
          <Col sm={4}> 
            <Thumbnail style={{background:"light-blue", height:"7em"}}>
              <p> Population </p>
              <h2> 643,203 </h2>
            </Thumbnail>
          </Col>
          <Col sm={4}> 
            <Thumbnail style={{background:"light-blue", height:"7em"}}>
              <p> Income </p>
              <h2> $64,039 </h2>
            </Thumbnail>
          </Col>
          <Col sm={4}> 
            <Thumbnail style={{background:"light-blue", height:"7em"}}>
              <p> unemployment rate </p> 
              <h2> 7.3% </h2>
            </Thumbnail>
          </Col>
          </center>
        </div>

        {/* Top 5 Universities */} 
        <div className="container" style={{width:"95%", padding:"1em"}}>
          <center>
            <Top5 A={"University 1"} B={"University 2"} C={"University 3"} D={"University 4"} E={"University 5"}  />
          </center>
        </div>
        
        {/* College Education and High School Graduation */} 
        <div className="container" style={{width:"95%", padding:"1em"}}>
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
        </div>

        {/* Primary Care Physician, Crime Rate, Motor Vehicle Death */} 
        <div className="container" style={{width:"85%", padding:"1em"}}>
          <center>
          <Col sm={4}> 
            <Thumbnail style={{background:"light-blue", height:"7em"}}>
              <p> Physician to Population ratio </p>
              <h2> 1:73 </h2>
            </Thumbnail>
          </Col>
          <Col sm={4}> 
            <Thumbnail style={{background:"light-blue", height:"7em"}}>
              <p> Crime Offense to Population </p>
              <h2> 174 : 100k </h2>
            </Thumbnail>
          </Col>
          <Col sm={4}> 
            <Thumbnail style={{background:"light-blue", height:"7em"}}>
              <p> Motor Vehicle Death per year</p>
              <h2> 7 </h2>
            </Thumbnail>
          </Col>
          </center>
        </div>
        
      </div>
    );
  }
}

export default CollegeInstance;
