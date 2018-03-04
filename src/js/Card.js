import React, { Component } from 'react';
import {Image, Col, Thumbnail} from 'react-bootstrap';
import { Link } from 'react-router-dom'


class Card extends Component {

	constructor(props) {
		super(props);
		this.state = {source: this.props.imgsrc};
	}
	
	

	render() {
		return (
		    <Col xs={6} md={4}>
				<Thumbnail>
					{/* img src needs to have a {local path} or {url}. DB needs to provide url of img. */}
					<Image src={`${this.props.imgsrc}`} style={{width:"100%", height:"250px"}}/>
					<h4><center><Link to={`/${this.props.model}/${this.props.name}`}>{this.props.name}</Link></center></h4>
					{/* Insert component with list of attributes of the model here */}
				</Thumbnail>
			</Col>
		);
	}
	
}

export default Card;
