import React, { Component } from 'react';
import { Jumbotron } from 'react-bootstrap';
import {Image, Grid, Row, Col, Thumbnail, Button, ButtonToolbar, Table} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../css/about.css';
import abel_pic from '../images/authors/abel_pic.jpg';
import sungsup_pic from '../images/authors/sungsup_pic.jpg';
import mitchell_pic from '../images/authors/mitchell_pic.jpg';
import neal_pic from '../images/authors/neal_pic.jpg';
import christian_pic from '../images/authors/christian_pic.jpg';

let request = require('request')
export default class About extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ready: false,
     total_commits: 0,
     total_issues: 0,
     members_stats: {},
   }
    }


    componentWillMount () {
      this.setState({ready: false})
       let commits_options = {method: 'GET',
         url: 'https://api.github.com/repos/theworkingmen/idb/stats/contributors'}
       request(commits_options, function (error, response, body) {
         if (error) {
           //
         }
         let members_data = {}
         members_data['abelhtt'] = {"commits":0, "issues":0}
         members_data['traylor1'] = {"commits":0, "issues":0}
         members_data['smcw66'] = {"commits":0, "issues":0}
         members_data['christian-onuogu'] = {"commits":0, "issues":0}
         members_data['NealFM'] = {"commits":0, "issues":0}

         let commitJSON = JSON.parse(body)
         let totalCommits = 0
         for (let i = 0; i < commitJSON.length; i++) {
           let curUserCount = commitJSON[i]['total']

           members_data[String(commitJSON[i]['author']['login'])]["commits"] = curUserCount
           totalCommits += curUserCount
         }

         this.setState({total_commits: totalCommits})

         var issues_options = { method: 'GET',
         url: 'https://api.github.com/repos/theworkingmen/idb/issues?state=all&per_page=100&page=' + String(1),
         qs: { state: 'all' },
         };

         request(issues_options, function (error, response, body) {
           if (error) {
             //
           }
           let issueJSON = JSON.parse(body)
           for (let i = 0; i < issueJSON.length; i++) {

             members_data[String(issueJSON[i]['user']['login'])]["issues"] += 1
           }

           this.setState({members_stats: members_data,
             total_issues: issueJSON.length})
         }.bind(this))

          this.setState({ready: true})
       }.bind(this))
     }

render () {
    let members = null
    if (this.state.ready) {
      members = this.members_stats;
    }
  return (
<div className ='container'>
<div className = 'introduction'>
<Jumbotron>
<logo> <center> Major Potential </center></logo>
<p></p>
  <intro ><center> A website that links universities, the cities where the universities are located,
  and job opportunities in cities for graduates in certain majors.</center> </intro>
<p></p>
<p></p>
</Jumbotron>
</div>

<div className = 'group_members'>
<block> <center> The Team </center> </block>
<p></p>
<Grid>
  <Row>
    <Col xs={6} md={4}>
    <Thumbnail>
      <Image src={mitchell_pic}
             style={{width:"100%", height:"250px"}}/>
      <h4><center>Mitchell Traylor</center></h4>
      <p>Role: Front-End, Report Author</p>
      <p>Bio - Computer Science third-year, with special focus on cybersecurity</p>
    </Thumbnail>
    </Col>
    <Col xs={6} md={4}>
    <Thumbnail>
      <Image src={sungsup_pic}
             style={{width:"100%", height:"250px"}}/>
      <h4><center>Sungsup Lee</center></h4>
      <p>Role: Back-End, Front-End</p>
      <p>Bio - Studies Computer Science at UT Austin.</p>
    </Thumbnail>
    </Col>
    <Col xs={6} md={4}>
      <Thumbnail>
        <Image src={abel_pic}
               style={{width:"100%", height:"250px"}}/>
        <h4><center>Abel Tesfaye</center></h4>
        <p>Role: Back-End, Front-End</p>
        <p>Bio - I am a junior Computer Science major at UT Austin.</p>
      </Thumbnail>
    </Col>
  </Row>
  <Row>
  <Col xs={6} md={4}>
  <Thumbnail>
    <Image src={neal_pic}
           style={{width:"100%", height:"250px"}}/>
    <h4><center>Neal Friesenhahn</center></h4>
    <p>Role: Web Hosting, API Design</p>
    <p>Bio - Studies Computer Science at UT Austin.</p>
  </Thumbnail>
  </Col>
  <Col xs={6} md={4}>
  <Thumbnail>
    <Image src={christian_pic}
           style={{width:"100%", height:"250px"}}/>
    <h4><center>Christian Onuogu</center></h4>
    <p>Role: Front-End</p>
    <p>Bio - Studies Computer Science at UT Austin.</p>
  </Thumbnail>
  </Col>
  </Row>
</Grid>
</div>

<div>
<Row>
<Col  xs={6} md={8}>
<Table>
  <tr>
    <th><h4> Github Stats </h4></th>
    <th><h4> Values </h4></th>
  </tr>
  <tr>
    <th>Number of Commits:</th>
    <th id="total_commits"> {this.state.total_commits} </th>
  </tr>
  <tr>
    <th>Number of Issues:</th>
    <th id="total_issues"> {this.state.total_issues}</th>
  </tr>
  <tr>
    <th>Number of Unit Tests:</th>
    <th> 0 </th>
  </tr>
</Table>
</Col>
</Row>
</div>

<div>
  <block_small> <p> </p> <center> Sources </center> <p></p></block_small>
    <a href="https://www.bls.gov/developers/api_signature_v2.html" class="list-group-item active">Bureau of Labor Statistics</a>
    <a href="https://www.census.gov/data/developers/data-sets/cbp-nonemp-zbp/cbp-api.html" class="list-group-item">United States Census Bureau</a>
    <a href="https://api.data.gov/docs/ed/" class="list-group-item">Department of Education</a>
</div>

<div>
<Row>


  <Col  xs={6} md={8}>
<Table>
  <tr>
    <th>
      <h3> Tools Used</h3>
    </th>
  </tr>
  <tr>
    <th>Amazon Beanstalk</th>
  </tr>
  <tr>
    <th>Amazon S3</th>
  </tr>
  <tr>
    <th>Slack</th>
  </tr>
  <tr>
    <th>React</th>
  </tr>
  <tr>
    <th>React Bootstrap</th>
  </tr>
  <tr>
    <th>Flask</th>
  </tr>
  <tr>
    <th>Travis-CI</th>
  </tr>
  <tr>
    <th>Github</th>
  </tr>
</Table>
  </Col>
</Row>

</div>

<div>
<center>
<block_small>  <p> </p> <p> </p> <center>Project Links</center> <p></p> </block_small>
 <Button>
 <a href = "https://github.com/theworkingmen/idb" > Github </a> </Button>
<p> </p>
 <Button> <a href = "https://theworkingmen.gitbooks.io/api/content/" > API </a></Button>
<p> </p>
<Button> <a href = "https://theworkingmen.gitbooks.io/major-potential/content/" > Report </a></Button>
<p></p> <p></p>

</center>
</div>

</div>

);};};
