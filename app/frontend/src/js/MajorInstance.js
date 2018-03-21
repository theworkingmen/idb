import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import {Jumbotron, Row, Col, Thumbnail} from 'react-bootstrap';
import InstanceTitle from './InstanceTitle.js';
import '../css/instance.css';
import Chart from './Chart.js';
import Top5 from './Top5.js';

class majorInstance extends Component {

  constructor() {
    super();
    
    this.state = {
      ready: false
    };

  }

  componentWillMount() {
    var api = "http://api.majorpotential.me/majors/";
    api += this.props.match.params.id;
    fetch(api)
    .then(results => {
      return results.json();
    }).then(data => {
       this.setState({
          name: data.name,
          univ0_name: data.universities_high_graduates_2015[0].name,
          univ1_name: data.universities_high_graduates_2015[1].name,
          univ2_name: data.universities_high_graduates_2015[2].name,
          univ3_name: data.universities_high_graduates_2015[3].name,
          univ4_name: data.universities_high_graduates_2015[4].name,
          univ0_img: data.universities_high_graduates_2015[0].image_link,
          univ1_img: data.universities_high_graduates_2015[1].image_link,
          univ2_img: data.universities_high_graduates_2015[2].image_link,
          univ3_img: data.universities_high_graduates_2015[3].image_link,
          univ4_img: data.universities_high_graduates_2015[4].image_link,
          city0_name: data.cities_high_graduates_2015[0].city_name,
          city1_name: data.cities_high_graduates_2015[1].city_name,
          city2_name: data.cities_high_graduates_2015[2].city_name,
          city3_name: data.cities_high_graduates_2015[3].city_name,
          city4_name: data.cities_high_graduates_2015[4].city_name,
          city0_img: data.cities_high_graduates_2015[0].city_image_link,
          city1_img: data.cities_high_graduates_2015[1].city_image_link,
          city2_img: data.cities_high_graduates_2015[2].city_image_link,
          city3_img: data.cities_high_graduates_2015[3].city_image_link,
          city4_img: data.cities_high_graduates_2015[4].city_image_link,
          wage: data.average_wage,
          workforce_age: data.average_age_work_force,
          wage_growth: data.wage_growth_rate,
          degrees: data.total_degrees_awarded_in_2015,
          workforce: data.total_people_in_work_foce,
          stem: data.is_stem,
          ready: true
        })  
    })

  }

  render() {

    var stem_value = null;

    if (this.state.ready) {
      if (this.state.stem > 0) {
        stem_value = "True";
      } else {
        stem_value = "False";
      }
    }

    return (
      <div className="container" style={{background: "white"}}>
       
            {/* Name of major */} 
            <div className="container" >
              <Jumbotron> <center>
                <h2> {this.state.name} </h2>
              </center></Jumbotron>
            </div>  

            {/* Top 5 Universities */} 
            <div className="container" >
              <center>
                <h3> Top 5 Universities </h3>
                <Top5 A_name={this.state.univ0_name} A_img={this.state.univ0_img}
                      B_name={this.state.univ1_name} B_img={this.state.univ1_img}
                      C_name={this.state.univ2_name} C_img={this.state.univ2_img}
                      D_name={this.state.univ3_name} D_img={this.state.univ3_img}
                      E_name={this.state.univ4_name} E_img={this.state.univ4_img} />
              </center>
            </div>

            {/* Top 5 Cities */} 
            <div className="container" >
              <center>
                <h3> Top 5 Cities </h3>
                <Top5 A_name={this.state.city0_name} A_img={this.state.city0_img}
                      B_name={this.state.city1_name} B_img={this.state.city1_img}
                      C_name={this.state.city2_name} C_img={this.state.city2_img}
                      D_name={this.state.city3_name} D_img={this.state.city3_img}
                      E_name={this.state.city4_name} E_img={this.state.city4_img} />
              </center>
            </div>

            {/* Average Wage, Wage Growth */} 
            <div className="container" style={{width:"85%"}}>
              <center>
              <Col sm={2}></Col>
              <Col sm={4}> 
                <Thumbnail className="thumbnail">
                  <p> Average Wage </p>
                  <h3> {this.state.wage} </h3>
                </Thumbnail>
              </Col>
              <Col sm={4}> 
                <Thumbnail className="thumbnail">
                  <p> Wage Growth </p>
                  <h3> {this.state.wage_growth}% </h3>
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
                  <h3> {this.state.degrees} </h3>
                </Thumbnail>
              </Col>
              <Col sm={4}> 
                <Thumbnail className="thumbnail">
                  <p> Workforce </p>
                  <h3> {this.state.workforce} </h3>
                </Thumbnail>
              </Col>
              <Col sm={4}> 
                <Thumbnail className="thumbnail">
                  <p> STEM </p>
                  <h3> {stem_value} </h3>
                </Thumbnail>
              </Col>
              </center>
            </div>

          </div>
      
      
      
    );
  }
}

export default majorInstance;
