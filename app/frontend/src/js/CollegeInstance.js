import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import InstanceTitle from './InstanceTitle.js';
import Chart from './Chart.js';
import {Jumbotron, Row, Col } from 'react-bootstrap';
import Map from './Map.js';
import '../css/App.css';


class CollegeInstance extends Component {

  constructor(){
    super();
    this.state = {
      chartData:{}
    }
  }

  componentWillMount(){
    this.getChartData();
  }

  getChartData(){
    // Ajax calls here
    this.setState({
      chartData:{
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
      }
    });
  }
  
  render() {
    return (

      <div className="container" style={{background: "white"}}>
       
        {/* Name of University */} 
        <div className="container">
        </div>  

        {/*city, state, website link*/} 
        <div className="container">
        </div>

        {/* Top 5 Majors */} 
        <div className="container">
        </div>
        
        {/* Demographics and Gender Ratio (Doughnut Charts) */} 
        <div className="container">
        </div>

        {/* Univ. Type, Tuitions */} 
        <div className="container">
        </div>

        {/* GMap */} 
        <div className="container">
          <center style={{padding:"2em"}}><Map center={[30.2672, -97.7431]} zoom={11} /></center>
        </div>
        
      </div>
    );
  }
}

export default CollegeInstance;
