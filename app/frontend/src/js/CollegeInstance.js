import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import InstanceTitle from './InstanceTitle.js';
import Chart from './Chart.js';
import {Jumbotron, Row, Col, Thumbnail, Button } from 'react-bootstrap';
import Map from './Map.js';
import '../css/instance.css';
import Top5 from './Top5.js';


class CollegeInstance extends Component { 
    constructor() {
    super();
    
    this.state = {
      ready: false
    };

  }

  componentWillMount() {
    var api = "http://api.majorpotential.me/universities/";
    api += this.props.match.params.id;
    fetch(api)
    .then(results => {
      return results.json();
    }).then(data => {
       this.setState({
          name: data.name,
          city: data.city,
          state: data.state,
          website: data.website,
          major0_name: data.majors[0].name, 
          major1_name: data.majors[1].name,
          major2_name: data.majors[2].name,
          major3_name: data.majors[3].name,
          major4_name: data.majors[4].name,
          major0_img: data.majors[0].image_link,
          major1_img: data.majors[1].image_link,
          major2_img: data.majors[2].image_link,
          major3_img: data.majors[3].image_link,
          major4_img: data.majors[4].image_link,
          demo_0: data.demographics_asian,
          demo_1: data.demographics_black,
          demo_2: data.demographics_hispanic,
          demo_3: data.demographics_other,
          demo_4: data.demographics_white,
          gender: data.enrolled_women,
          univ_type: data.uni_type,
          tuition_in: data.state_tuition,
          tuition_out: data.oos_tuition,
          longitude: data.longitude,
          latitude: data.latitude,
          ready: true
        })  
    })

  }


  render() {

    let demographics_chart = null;
    let gender_chart = null;
    let gmap = null;
    if (this.state.ready) {
      demographics_chart = 
          <Chart  chartData=
                { {
                  labels: ['White', 'Asian', 'Black', 'Hispanic', 'Other'],
                  datasets:[
                    {
                      label:'Population',
                      data:[
                        this.state.demo_4,
                        this.state.demo_0,
                        this.state.demo_1,
                        this.state.demo_2,
                        this.state.demo_3,
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
            legendPosition="right"/>;
      gender_chart =
          <Chart  chartData=
              { {
                labels: ['Female', 'Male'],
                datasets:[
                  {
                    label:'Gender Ratio',
                    data:[
                      this.state.gender,
                      1 - this.state.gender
                    ],
                    backgroundColor:[
                      'rgba(255, 99, 132, 0.6)',
                      'rgba(54, 162, 235, 0.6)',
                    ]
                  }
                ]
              } } 
          titleText="Gender Ratio"
          displayLegend={false} />;
      gmap = <Map center={[this.state.latitude, this.state.longitude]} zoom={11} />;
    }

    return (

      <div className="container" style={{background: "white"}}>
       
        {/* Name of University */} 
        <div className="container">
          <Jumbotron> <center>
            <h2> {this.state.name} </h2>
          </center></Jumbotron>
        </div>  

        {/*city, state, website link*/} 
        <div className="container" style={{width:"85%"}}>
          <center>
          <Col sm={4}> 
            <Thumbnail className="thumbnail">
              <p> City </p>
              <h3> {this.state.city} </h3>
            </Thumbnail>
          </Col>
          <Col sm={4}> 
            <Thumbnail className="thumbnail">
              <p> State </p>
              <h3> {this.state.state} </h3>
            </Thumbnail>
          </Col>
          <Col sm={4}> 
            <Thumbnail className="thumbnail">
              <p> Website </p>
              <h3> <Button bsStyle="link" href={this.state.website}> link </Button> </h3>
            </Thumbnail>
          </Col>
          </center>
        </div>

        {/* Top 5 Majors */} 
        <div className="container" >
          <center>
            <h3> Top 5 Majors </h3>
            <Top5 A_name={this.state.major0_name} A_img={this.state.major0_img}
                  B_name={this.state.major1_name} B_img={this.state.major1_img}
                  C_name={this.state.major2_name} C_img={this.state.major2_img}
                  D_name={this.state.major3_name} D_img={this.state.major3_img}
                  E_name={this.state.major4_name} E_img={this.state.major4_img} />
          </center>
        </div>
        
        {/* Demographics and Gender Ratio (Doughnut Charts) */} 
        <div className="container" >
          <Row>
          <Col sm={1}></Col>
          <Col sm={5}>
            {demographics_chart}
          </Col>
          <Col sm={5}>
            {gender_chart}
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
              <h3> {this.state.univ_type} </h3>
            </Thumbnail>
          </Col>
          <Col sm={4}> 
            <Thumbnail className="thumbnail">
              <p> In-State Tuition </p>
              <h3> ${this.state.tuition_in} </h3>
            </Thumbnail>
          </Col>
          <Col sm={4}> 
            <Thumbnail className="thumbnail">
              <p> Out-of-State Tuition </p>
              <h3> ${this.state.tuition_out} </h3>
            </Thumbnail>
          </Col>
          </center>
        </div>

        {/* GMap */} 
        <div className="container" >
          <center>{gmap}</center>
        </div>
        
      </div>
    );
  }
}

export default CollegeInstance;
