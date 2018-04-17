import React, { Component } from 'react';
import {Image, Col, Thumbnail} from 'react-bootstrap';


class ToolCard extends Component {

	/* default img src = https://goo.gl/NvPJj6 */

	render() {
		return (

		    <Col xs={12} sm={3} md={3} lg={3}>
		    	
				<Thumbnail 	style={{height:"14em"}}
							href ={this.props.src}>
					{/* img src needs to have a {local path} or {url}. DB needs to provide url of img. */}
					<center>
						<Image 	src={this.props.image}
								onError={(e)=>{e.target.src="https://goo.gl/NvPJj6"}}
								style={{width:"10em", height:"10em"}}/>
					</center>
					<h4><center style={{justifyContent:"center"}}>{this.props.name}</center></h4>
				</Thumbnail>
				
			</Col>
		);
	}

}

export default ToolCard;
