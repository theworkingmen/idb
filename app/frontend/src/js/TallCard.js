import React, { Component } from 'react';
import {Image, Col, Thumbnail} from 'react-bootstrap'
import Highlighter from "react-highlight-words";
import { Link } from 'react-router-dom';


class TallCard extends Component {

	constructor(props) {
		super(props);

	}

	/* default img src = https://goo.gl/NvPJj6 */

	render() {
		return (

		    <Col xs={12} sm={3} md={3} lg={3}>
		    	<Link to={`/${this.props.model}/${this.props.id}`}>
				<Thumbnail style={{height:"25em"}}>
					{/* img src needs to have a {local path} or {url}. DB needs to provide url of img. */}
					<center>
						<Image 	src={this.props.domain}
								style={{width:"14em", height:"14em"}}
								onError={(e)=>{e.target.src="https://goo.gl/NvPJj6"}}/>
					</center>
					{/*<Image src={`${this.props.imgsrc}`} style={{width:"100%", height:"100%"}}/>*/}
					<h4><center style={{justifyContent:"center", height:"4em"}}><Highlighter
					highlightClassName="YourHighlightClass"
					searchWords={[this.props.highlight]}
					autoEscape={true}
					textToHighlight={this.props.name}
					/></center></h4>
					<h6><center style={{justifyContent:"center"}}>{this.props.field1}</center></h6>
					<h6><center style={{justifyContent:"center"}}>{this.props.field2}</center></h6>
					<h6><center style={{justifyContent:"center"}}>{this.props.field3}</center></h6>
					<h6><center style={{justifyContent:"center"}}>{this.props.field4}</center></h6>
					<h6><center style={{justifyContent:"center"}}>{this.props.field5}</center></h6>

					{/* Insert component with list of attributes of the model here */}
				</Thumbnail>
				</Link>
			</Col>
		);
	}

}

export default TallCard;
