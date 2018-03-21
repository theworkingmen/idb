import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import {Col, Thumbnail, Image, OverlayTrigger, Tooltip} from 'react-bootstrap';
import '../css/Top5.css';


export default class Top5 extends Component {

	render() {


		
		

		return(
			<div>
				<Col sm={1}></Col>	
				<Col sm={2}> 
					<OverlayTrigger placement="bottom" overlay={<Tooltip>{this.props.A_name}</Tooltip>}>
					
					  <Image className="top5" src={this.props.A_img} thumbnail />
					
					</OverlayTrigger>
				</Col>
				<Col sm={2}> 
					<OverlayTrigger placement="bottom" overlay={<Tooltip>{this.props.B_name}</Tooltip>}>
					
					  <Image className="top5" src={this.props.B_img} thumbnail />
					
					</OverlayTrigger>
				</Col>
				<Col sm={2}> 
					<OverlayTrigger placement="bottom" overlay={<Tooltip>{this.props.C_name}</Tooltip>}>
					
					  <Image className="top5" src={this.props.C_img} thumbnail />
					
					</OverlayTrigger>
				</Col>
				<Col sm={2}> 
					<OverlayTrigger placement="bottom" overlay={<Tooltip>{this.props.D_name}</Tooltip>}>
					
					  <Image className="top5" src={this.props.D_img} thumbnail />
					
					</OverlayTrigger>
				</Col>
				<Col sm={2}> 
					<OverlayTrigger placement="bottom" overlay={<Tooltip>{this.props.E_name}</Tooltip>}>
					
					  <Image className="top5" src={this.props.E_img} thumbnail />
					
					</OverlayTrigger>
				</Col>
				<Col sm={1}></Col>
			</div>
		);
	}


}