import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import {Jumbotron, Row, Col, Thumbnail, Button, Image } from 'react-bootstrap';
import '../css/App.css';


export default class Top5 extends Component {

	render() {
		return(
			<div>
				<Col sm={1}></Col>	
				<Col sm={2}> 
					<Thumbnail style={{background:"light-blue", height:"11em",  }}>
					  <p> {this.props.A_name} </p>
					  <Image src={this.props.A_img} style={{height:"6.5em", width: "100%"}}/>
					</Thumbnail>
				</Col>
				<Col sm={2}> 
					<Thumbnail style={{background:"light-blue", height:"11em",  }}>
					  <p> {this.props.B_name} </p>
					  <Image src={this.props.B_img} style={{height:"6.5em", width: "100%"}}/>
					</Thumbnail>
				</Col>
				<Col sm={2}> 
					<Thumbnail style={{background:"light-blue", height:"11em",  }}>
					  <p> {this.props.C_name} </p>
					  <Image src={this.props.C_img} style={{height:"6.5em", width: "100%"}}/>
					</Thumbnail>
				</Col>
				<Col sm={2}> 
					<Thumbnail style={{background:"light-blue", height:"11em",  }}>
					  <p> {this.props.D_name} </p>
					  <Image src={this.props.D_img} style={{height:"6.5em", width: "100%"}}/>
					</Thumbnail>
				</Col>
				<Col sm={2}> 
					<Thumbnail style={{background:"light-blue", height:"11em",  }}>
					  <p> {this.props.E_name} </p>
					  <Image src={this.props.E_img} style={{height:"6.5em", width: "100%"}}/>
					</Thumbnail>
				</Col>
				<Col sm={1}></Col>
			</div>
		);
	}


}