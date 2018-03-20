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
       
        {/* Name of University */} 
        <div className="container">
          <Jumbotron> <center>
            <h2> {this.props.match.params.name} </h2>
          </center></Jumbotron>
        </div>  

        {/*city, state, website link*/} 
        <div className="container" style={{width:"85%"}}>
          <center>
          <Col sm={4}> 
            <Thumbnail className="thumbnail">
              <p> City </p>
              <h3> Austin </h3>
            </Thumbnail>
          </Col>
          <Col sm={4}> 
            <Thumbnail className="thumbnail">
              <p> State </p>
              <h3> Texas </h3>
            </Thumbnail>
          </Col>
          <Col sm={4}> 
            <Thumbnail className="thumbnail">
              <p> Website </p>
              <h3> <Button bsStyle="link" > link </Button> </h3>
            </Thumbnail>
          </Col>
          </center>
        </div>

        {/* Top 5 Majors */} 
        <div className="container" >
          <center>
            <h3> Top 5 Majors </h3>
            <Top5 A={"major 1"} B={"major 2"} C={"major 3"} D={"major 4"} E={"major 5"}  />
          </center>
        </div>
        
        {/* Demographics and Gender Ratio (Doughnut Charts) */} 
        <div className="container" >
          <Row>
          <Col sm={1}></Col>
          <Col sm={5}>
          <Chart  chartData=
                      { {
                        labels: ['White', 'Asian', 'Hispanic', 'African American', 'Other'],
                        datasets:[
                          {
                            label:'Population',
                            data:[
                              617594,
                              181045,
                              153060,
                              106519,
                              105162
                            ],
                            backgroundColor:[
                              'rgba(255, 99, 132, 0.6)',
                              'rgba(54, 162, 235, 0.6)',
                              'rgba(255, 206, 86, 0.6)',
                              'rgba(75, 192, 192, 0.6)',
                              'rgba(153, 102, 255, 0.6)'
                            ]
                          }
                        ]
                      } } 
                  titleText="Demographics" 
                  legendPosition="right"/>
          </Col>
          <Col sm={5}>
          <Chart  chartData=
                      { {
                        labels: ['Female', 'Male'],
                        datasets:[
                          {
                            label:'Gender Ratio',
                            data:[
                              33,
                              67
                            ],
                            backgroundColor:[
                              'rgba(255, 99, 132, 0.6)',
                              'rgba(54, 162, 235, 0.6)',
                            ]
                          }
                        ]
                      } } 
                  titleText="Gender Ratio"
                  displayLegend={false} />
          </Col>
          </Row>
          <p></p>
        </div>

        {/* Univ. Type, Tuitions */} 
        <div className="container" style={{width:"85%"}}>
          <center>
          <Col sm={4}> 
            <Thumbnail className="thumbnail">
              <p> University Type </p>
              <h3> 4 year public </h3>
            </Thumbnail>
          </Col>
          <Col sm={4}> 
            <Thumbnail className="thumbnail">
              <p> In-State Tuition </p>
              <h3> $9,873 </h3>
            </Thumbnail>
          </Col>
          <Col sm={4}> 
            <Thumbnail className="thumbnail">
              <p> Out-of-State Tuition </p>
              <h3> $34,676 </h3>
            </Thumbnail>
          </Col>
          </center>
        </div>

        {/* GMap */} 
        <div className="container" >
          <center><Map center={[30.2672, -97.7431]} zoom={11} /></center>
        </div>
        
      </div>
    );
  }
}

export default CollegeInstance;
