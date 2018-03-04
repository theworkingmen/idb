import React, { Component } from 'react';
import { Jumbotron } from 'react-bootstrap';
import {Image, Grid, Row, Col, Thumbnail, Button, ButtonToolbar, Table} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../css/about.css';
import abel_pic from '../../images/authors/abel_pic.jpg';
import sungsup_pic from '../../images/authors/sungsup_pic.jpg';
import mitchell_pic from '../../images/authors/mitchell_pic.jpg';
import neal_pic from '../../images/authors/neal_pic.jpg';
import christian_pic from '../../images/authors/christian_pic.jpg';
import MembersCard from './MembersCard'

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
         members_data['abelhtt'] = {"name": "Abel Tesfaye",
                                    "role": "Back-End, Front-End",
                                    "bio" : "I am a junior Computer Science major studying at UT Austin.",
                                    "photo": abel_pic,
                                    "commits":0,
                                    "issues":0}
         members_data['traylor1'] = {"name": "Mitchell Traylor",
                                    "role": "Front-End, Report Author",
                                    "bio" : "Computer Science third-year, with special focus on cybersecurity.",
                                    "photo": mitchell_pic,
                                    "commits":0,
                                    "issues":0}
         members_data['smcw66'] = {"name": "Sungsup Lee",
                                    "role": "Front-End, Back-End",
                                    "bio" : "Studies Computer Science at UT Austin.",
                                    "photo": sungsup_pic,
                                    "commits":0,
                                    "issues":0}
         members_data['NealFM'] = {"name": "Neal Friesenhahn",
                                    "role": "Web Hosting, API Design",
                                    "photo": neal_pic,
                                    "bio" : "I am a junior Computer Science major.",
                                    "commits":0,
                                    "issues":0}
         members_data['christian-onuogu'] = {"name": "Christian Onuogu",
                                    "role": "Front-End",
                                    "bio" : "I am a junior Computer Science major.",
                                    "photo": christian_pic,
                                    "commits":0,
                                    "issues":0}

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
    let members_info = null
    if (this.state.ready) {
      members_info = <MembersCard members_info = {this.state.members_stats}/>;
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
  {members_info}
<p></p>

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
