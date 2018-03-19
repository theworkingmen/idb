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
			
		    <Col xs={12} sm={4} md={4}>
				<Thumbnail style={{height:"24em"}}>
					{/* img src needs to have a {local path} or {url}. DB needs to provide url of img. */}
					<center>
					{this.props.model==="colleges" ? 
						(<Image src={`https://logo-core.clearbit.com/${this.props.domain}?size=500`} style={{width:"18em", height:"19em"}} onError={(e)=>{e.target.src="https://goo.gl/NvPJj6"}}/>) 
						: (<Image src={this.props.domain} style={{width:"18em", height:"19em"}} onError={(e)=>{e.target.src="https://goo.gl/NvPJj6"}}/>)}
					</center>
					{/*<Image src={`${this.props.imgsrc}`} style={{width:"100%", height:"100%"}}/>*/}
					<h4><center><Link to={`/${this.props.model}/${this.props.name}`}>{this.props.name}</Link></center></h4>
					{/* Insert component with list of attributes of the model here */}
				</Thumbnail>
			</Col>
		);
	}
	
}

export default Card;
