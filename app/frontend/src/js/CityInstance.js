import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import InstanceTitle from './InstanceTitle.js';
import Chart from './Chart.js';
import {Jumbotron, Row, Col, Thumbnail, Button, Image, OverlayTrigger, Tooltip, Grid } from 'react-bootstrap';
import Map from './Map.js';
import Top5 from './Top5.js';


class CityInstance extends Component {
  constructor() {
    super();

    this.state = {
      ready: false
    };

  }

  componentWillMount() {
    var api = "http://api.majorpotential.me/cities/";
    api += this.props.match.params.id;
    fetch(api)
    .then(results => {
      return results.json();
    }).then(data => {
      let universities = data.universities_in_city.map((college) => {
        return(
          <Col sm={3}> 
            <Link to={`/colleges/${college.id}`}>
              <OverlayTrigger placement="bottom" overlay={<Tooltip>{college.name}</Tooltip>}>
                <Image  className="top5" src={college.image_link} thumbnail />
              </OverlayTrigger>
            </Link>
          </Col>
        )
      })

      this.setState({
        name: data.city_name,
        population: data.population_in_county,
        income: data.median_household_income_in_county,
        unemployment: data.unemployment_in_county*100,
        universities:universities,
        major0_name: data.top_grad_majors[0].name,
        major1_name: data.top_grad_majors[1].name,
        major2_name: data.top_grad_majors[2].name,
        major3_name: data.top_grad_majors[3].name,
        major4_name: data.top_grad_majors[4].name,
        major0_img: data.top_grad_majors[0].image_link,
        major1_img: data.top_grad_majors[1].image_link,
        major2_img: data.top_grad_majors[2].image_link,
        major3_img: data.top_grad_majors[3].image_link,
        major4_img: data.top_grad_majors[4].image_link,
        major0_id: data.top_grad_majors[0].id,
        major1_id: data.top_grad_majors[1].id,
        major2_id: data.top_grad_majors[2].id,
        major3_id: data.top_grad_majors[3].id,
        major4_id: data.top_grad_majors[4].id,
        college_ed: data.people_with_college_education_in_county,
        high_ed: data.high_school_graduation_rate_in_county,
        physician: data.primary_care_physicians_in_county,
        crime: data.violent_crime_in_county,
        motor: data.motor_vehicle_crash_deaths_in_county,
        ready: true
      })
    })

  }

  render() {
    let college_chart = null;
    let high_school_chart = null;
    if (this.state.ready) {
      college_chart =
              <Chart  data=
                    { {
                      labels: ['College Educated', 'Not College Educated'],
                      datasets:[
                        {
                          label:'College Education',
                          data:[
                            this.state.college_ed,
                            1-this.state.college_ed,

                          ],
                          backgroundColor:[
                            'rgba(255, 206, 86, 0.6)',
                            'rgba(75, 192, 192, 0.6)',
                          ]
                        }
                      ]
                    } }
                titleText="College Education"
                legendPosition="right"
                />;
      high_school_chart =
              <Chart  data=
                    { {
                      labels: ['High School Educated', 'Not High School Educated'],
                      datasets:[
                        {
                          label:'High School Education',
                          data:[
                            this.state.high_ed,
                            1-this.state.high_ed
                          ],
                          backgroundColor:[
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(54, 162, 235, 0.6)',
                          ]
                        }
                      ]
                    } }
                titleText="High School Education"
                legendPosition="right"
                />;
    }

    return (

      <div className="container" style={{background: "white"}}>

        {/* Name of City */}
        <div className="container">
          <Jumbotron> <center>
            <h2> {this.state.name} </h2>
          </center></Jumbotron>
        </div>

        {/* population, income, unemployment rate */}
        <div className="container" style={{width:"85%"}}>
          <center>
          <Col sm={4}>
            <Thumbnail className="thumbnail">
              <p> Population </p>
              <h3> {this.state.population} </h3>
            </Thumbnail>
          </Col>
          <Col sm={4}>
            <Thumbnail className="thumbnail">
              <p> Income </p>
              <h3> ${this.state.income} </h3>
            </Thumbnail>
          </Col>
          <Col sm={4}>
            <Thumbnail className="thumbnail">
              <p> unemployment rate </p>
              <h3> {this.state.unemployment}% </h3>
            </Thumbnail>
          </Col>
          </center>
        </div>

        {/* Top 5 Majors */}
        <div className="container">
          <center>
            <h3> Top 5 Majors </h3>
            <Top5 A_name={this.state.major0_name} A_img={this.state.major0_img} A_id={this.state.major0_id}
                  B_name={this.state.major1_name} B_img={this.state.major1_img} B_id={this.state.major1_id}
                  C_name={this.state.major2_name} C_img={this.state.major2_img} C_id={this.state.major2_id}
                  D_name={this.state.major3_name} D_img={this.state.major3_img} D_id={this.state.major3_id}
                  E_name={this.state.major4_name} E_img={this.state.major4_img} E_id={this.state.major4_id}
                  model="majors"/>
          </center>
        </div>

        {/* Universities in City */}
        <div className="container">
          <center>
            <h3> Universities </h3>
            <Row className="flex-row">
              <Col sm={1}></Col>
              <Col sm={10}>
                <Grid>{this.state.universities}</Grid>
              </Col>
            </Row>
            
          </center>
        </div>

        {/* College Education and High School Graduation */}
        <div className="container">
          <Row>
            <Col sm={1}></Col>
            <Col sm={5}>
              {college_chart}
            </Col>
            <Col sm={5}>
              {high_school_chart}
            </Col>
          </Row>
        </div>

        {/* Primary Care Physician, Crime Rate, Motor Vehicle Death */}
        <div className="container" style={{width:"85%"}}>
          <center>
          <Col sm={4}>
            <Thumbnail className="thumbnail">
              <p> Physician to Population </p>
              <h3> 1 : {this.state.physician} </h3>
            </Thumbnail>
          </Col>
          <Col sm={4}>
            <Thumbnail className="thumbnail">
              <p> Crime Offense to Population </p>
              <h3> {this.state.crime} : 100k </h3>
            </Thumbnail>
          </Col>
          <Col sm={4}>
            <Thumbnail className="thumbnail">
              <p> Motor Vehicle Death per year</p>
              <h3> {this.state.motor} </h3>
            </Thumbnail>
          </Col>
          </center>
        </div>

      </div>
    );
  }
}

export default CityInstance;
