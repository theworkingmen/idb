import React, { Component } from 'react';
import {Image, Col, Thumbnail} from 'react-bootstrap';
import { Link } from 'react-router-dom'


class Card extends Component {

	constructor(props) {
		super(props);

	}
	
	/* default img src = https://goo.gl/NvPJj6 */

	render() {
		return (
			
		    <Col xs={12} sm={3} md={3} lg={3}>
		    	<Link to={`/${this.props.model}/${this.props.id}`}>
				<Thumbnail style={{height:"20em"}}>
					{/* img src needs to have a {local path} or {url}. DB needs to provide url of img. */}
					<center>
						<Image 	src={this.props.domain} 
								style={{width:"14em", height:"14em"}} 
								onError={(e)=>{e.target.src="https://goo.gl/NvPJj6"}}/>
					</center>
					{/*<Image src={`${this.props.imgsrc}`} style={{width:"100%", height:"100%"}}/>*/}
					<h4><center style={{justifyContent:"center"}}>{this.props.name}</center></h4>

					{/* Insert component with list of attributes of the model here */}
				</Thumbnail>
				</Link>
			</Col>
		);
	}
	
}

export default Card;
