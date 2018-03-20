import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import {Jumbotron, Row, Col, Thumbnail, Button, Image } from 'react-bootstrap';
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
					<Thumbnail style={{background:"light-blue", height:"11em",  }}>
					  <p> {this.props.A} </p>
					  <Image src={"https://goo.gl/NvPJj6"} style={{height:"6.5em", width: "100%"}}/>
					</Thumbnail>
				</Col>
				<Col sm={2}> 
					<Thumbnail style={{background:"light-blue", height:"11em",  }}>
					  <p> {this.props.B} </p>
					  <Image src={"https://goo.gl/NvPJj6"} style={{height:"6.5em", width: "100%"}}/>
					</Thumbnail>
				</Col>
				<Col sm={2}> 
					<Thumbnail style={{background:"light-blue", height:"11em",  }}>
					  <p> {this.props.C} </p>
					  <Image src={"https://goo.gl/NvPJj6"} style={{height:"6.5em", width: "100%"}}/>
					</Thumbnail>
				</Col>
				<Col sm={2}> 
					<Thumbnail style={{background:"light-blue", height:"11em",  }}>
					  <p> {this.props.D} </p>
					  <Image src={"https://goo.gl/NvPJj6"} style={{height:"6.5em", width: "100%"}}/>
					</Thumbnail>
				</Col>
				<Col sm={2}> 
					<Thumbnail style={{background:"light-blue", height:"11em",  }}>
					  <p> {this.props.E} </p>
					  <Image src={"https://goo.gl/NvPJj6"} style={{height:"6.5em", width: "100%"}}/>
					</Thumbnail>
				</Col>
				<Col sm={1}></Col>
			</div>
		);
	}


}