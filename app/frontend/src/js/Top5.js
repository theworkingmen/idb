import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import {Jumbotron, Row, Col, Thumbnail, Button } from 'react-bootstrap';
import '../css/App.css';


export default class Top5 extends Component {

	/*
	prop.A
	prop.B
	prop.C
	prop.D
	prop.E
	*/

	render() {
		return(
			<div>
				<Col sm={1}></Col>	
				<Col sm={2}> 
					<Thumbnail style={{background:"light-blue", height:"7em"}}>
					  <p> {this.props.A} </p>
					</Thumbnail>
				</Col>
				<Col sm={2}> 
					<Thumbnail style={{background:"light-blue", height:"7em"}}>
					  <p> {this.props.B} </p>
					</Thumbnail>
				</Col>
				<Col sm={2}> 
					<Thumbnail style={{background:"light-blue", height:"7em"}}>
					  <p> {this.props.C} </p>
					</Thumbnail>
				</Col>
				<Col sm={2}> 
					<Thumbnail style={{background:"light-blue", height:"7em"}}>
					  <p> {this.props.D} </p>
					</Thumbnail>
				</Col>
				<Col sm={2}> 
					<Thumbnail style={{background:"light-blue", height:"7em"}}>
					  <p> {this.props.E} </p>
					</Thumbnail>
				</Col>
				<Col sm={1}></Col>
			</div>
		);
	}


}