import React, { Component } from 'react';
import {Image, Grid, Row, Col, Thumbnail} from 'react-bootstrap';
import '../../css/about.css';

export default class MembersCard extends Component {
  render () {
    let stat_map = Object.keys(this.props.members_info).map((item) =>

    <Col xs={6} md={4}>
    <Thumbnail className='members'>
      <Image src={this.props.members_info[item]["photo"]}
             style={{width:"100%", height:"250px"}}/>
      <h4><center>{this.props.members_info[item]["name"]}</center></h4>
      <p>Role: {this.props.members_info[item]["role"]}</p>
      <p>Bio - {this.props.members_info[item]["bio"]}</p>
      <p>Number of Commits: {this.props.members_info[item]["commits"]}</p>
      <p>Number of Issues: {this.props.members_info[item]["issues"]}</p>
      <p>Number of unit tests: {this.props.members_info[item]["number_tests"]}</p>
    </Thumbnail>
    </Col>
    )

    return (
      <Grid>
        <Row>
          {stat_map}
        </Row>
      </Grid>
    )
  }
}
