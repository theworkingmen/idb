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
					<Image src={"https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/City_of_London_skyline_from_London_City_Hall_-_Sept_2015_-_Crop_Aligned.jpg/1200px-City_of_London_skyline_from_London_City_Hall_-_Sept_2015_-_Crop_Aligned.jpg"} style={{width:"100%", height:"250px"}}/>
					<h4><center><Link to={`/${this.props.model}/${this.props.name}`}>{this.props.name}</Link></center></h4>
					{/* Insert component with list of attributes here */}
				</Thumbnail>
			</Col>
		);
	}
	
}

export default Card;
