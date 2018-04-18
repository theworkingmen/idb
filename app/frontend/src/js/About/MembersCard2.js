import React, { Component } from 'react';
import {Image, Grid, Row, Col, Thumbnail} from 'react-bootstrap';
import '../../css/about.css';

export default class MembersCard2 extends Component {
  render () {
    return (
      <Col xs={6} md={4}>
        <Thumbnail className='members'>
          <Image src={this.props.member["photo"]}
                 style={{width:"100%", height:"250px"}}/>
          <h4><center>{this.props.member["name"]}</center></h4>
          <p>Role: {this.props.member["role"]}</p>
          <p>Bio - {this.props.member["bio"]}</p>
          <p>Number of Commits: {this.props.member["commits"]}</p>
          <p>Number of Issues: {this.props.member["issues"]}</p>
          <p>Number of unit tests: {this.props.member["number_tests"]}</p>
        </Thumbnail>
      </Col>
    )
  }
}
