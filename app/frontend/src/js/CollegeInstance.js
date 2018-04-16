import React, { Component } from 'react';
import Chart from './Chart.js';
import {Jumbotron, Col, Thumbnail} from 'react-bootstrap';
import notFound from './error404.js';
import Map from './Map.js';
import Top5 from './Top5.js';


class CollegeInstance extends Component {
  constructor() {
    super();
    this.state = {
      ready: false,
    };

  }

  componentWillMount() {
    var api = "http://api.majorpotential.me/universities/";
    api += this.props.match.params.id;
    fetch(api)
    .then(results => {
      if (!results.ok) {
            throw Error(results.statusText);
        }
      return results.json();
    }).then(data => {
       this.setState({
          name: data.name,
          city: data.city.split(",")[0],
          city_id: data.city_id,
          state: data.state,
          website: "http://" + data.website,
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
          major0_id: data.majors[0].id,
          major1_id: data.majors[1].id,
          major2_id: data.majors[2].id,
          major3_id: data.majors[3].id,
          major4_id: data.majors[4].id,
          demo_0: data.demographics_asian,
          demo_1: data.demographics_black,
          demo_2: data.demographics_hispanic,
          demo_3: data.demographics_other,
          demo_4: data.demographics_white,
          gender: data.enrolled_women,
          univ_type: data.uni_type,
          tuition_in: data.state_tuition.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          tuition_out: data.oos_tuition.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          longitude: data.longitude,
          latitude: data.latitude,
          ready: true
        })
    })
  }

  componentDidCatch() {
    this.setState({
      valid:false
    })
  }


  render() {

    if (this.state.valid === false) {
      return {notFound};
    }

    let demographics_chart = null;
    let gender_chart = null;
    let gmap = null;
    if (this.state.ready) {
        demographics_chart =
              <Chart  data=
                    { {
                      labels: ['White', 'Asian', 'Black', 'Hispanic', 'Other'],
                      datasets:[
                        {
                          label:'Demographics',
                          data:[
                            this.state.demo_4,
                            this.state.demo_0,
                            this.state.demo_1,
                            this.state.demo_2,
                            this.state.demo_3
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
                legendPosition="right"
                />;
      gender_chart =
              <Chart  data=
                    { {
                      labels: ['Female', 'Male'],
                      datasets:[
                        {
                          label:'Gender Ratio',
                          data:[
                            this.state.gender,
                            1-this.state.gender
                          ],
                          backgroundColor:[
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(54, 162, 235, 0.6)',
                          ]
                        }
                      ]
                    } }
                titleText="Gender Ratio"
                legendPosition="right"
                />;
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
              <h3> <a href={ `/cities/${this.state.city_id}`}> {this.state.city} </a> </h3>
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
              <h3> <a href= {this.state.website} target="_blank"> link </a> </h3>
            </Thumbnail>
          </Col>
          </center>
        </div>

        {/* Top 5 Majors */}
        <div className="container" >
          <div className="InstanceContainer">
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
        </div>

        {/* Demographics and Gender Ratio (Doughnut Charts) */}
        <div className="container" >
          <div className="InstanceContainer">
          <Col sm={1}></Col>
          <Col sm={5}>
            {demographics_chart}
          </Col>
          <Col sm={5}>
            {gender_chart}
          </Col>
          </div>
        </div>

        {/* Univ. Type, Tuitions */}
        <div className="container" style={{width:"85%"}}>
          <div className="InstanceContainer">
          <center>
          <h3> Other Information </h3>
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
        </div>

        {/* GMap */}
        <div className="container" >
          <div className="InstanceContainer">
          <center>{gmap}</center>
          </div>
        </div>

      </div>
    );
  }
}

export default CollegeInstance;
