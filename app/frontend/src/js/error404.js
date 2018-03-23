import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Chart from './Chart.js';
import {Jumbotron, Row, Col, Thumbnail, Button } from 'react-bootstrap';

  export default class error404 extends Component {


    render() {
      return  (
        <div className="container">
          <center>
          <Jumbotron> 
            <h1> Error 404 </h1> 
            <p> this is not the page you're looking for... </p>
          </Jumbotron>
          </center>
        </div>

      )
    }
  }