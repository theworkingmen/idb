import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import {Col, Thumbnail, Image, OverlayTrigger, Tooltip} from 'react-bootstrap';
import '../css/Top5.css';


export default class Top5 extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      ready: false
    };

  }

  render() {

    return(
      <div>
        <Col sm={1}></Col>  
        <Col sm={2}> 
          
          <Link to={`/${this.props.model}/${this.props.A_id}`}>
            <OverlayTrigger placement="bottom" overlay={<Tooltip>{this.props.A_name}</Tooltip>}>
              <Image  className="top5" src={this.props.A_img} thumbnail />
            </OverlayTrigger>
          </Link>
          
        </Col>
        <Col sm={2}> 
          
          <Link to={`/${this.props.model}/${this.props.B_id}`}>
            <OverlayTrigger placement="bottom" overlay={<Tooltip>{this.props.B_name}</Tooltip>}>
              <Image className="top5" src={this.props.B_img} thumbnail />
            </OverlayTrigger>
          </Link>
          
        </Col>
        <Col sm={2}> 
          
          <Link to={`/${this.props.model}/${this.props.C_id}`}>
            <OverlayTrigger placement="bottom" overlay={<Tooltip>{this.props.C_name}</Tooltip>}>
              <Image className="top5" src={this.props.C_img} thumbnail />
            </OverlayTrigger>
          </Link>
          
        </Col>
        <Col sm={2}> 
          
          <Link to={`/${this.props.model}/${this.props.D_id}`}>
            <OverlayTrigger placement="bottom" overlay={<Tooltip>{this.props.D_name}</Tooltip>}>
              <Image className="top5" src={this.props.D_img} thumbnail />
            </OverlayTrigger>
          </Link>
          
        </Col>
        <Col sm={2}> 
          
          <Link to={`/${this.props.model}/${this.props.E_id}`}>
            <OverlayTrigger placement="bottom" overlay={<Tooltip>{this.props.E_name}</Tooltip>}>
              <Image className="top5" src={this.props.E_img} thumbnail />
            </OverlayTrigger>
          </Link>
          
        </Col>
        <Col sm={1}></Col>
      </div>
    );
  }


}