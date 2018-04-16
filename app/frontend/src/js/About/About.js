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
import { RingLoader } from 'react-spinners';
import ToolCard from './ToolCard.js';

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

  componentWillMount() {
    this.setState({
      ready: false
    })
    let commits_options = {
      method: 'GET',
      url: 'https://api.github.com/repos/theworkingmen/idb/stats/contributors'
    }
    request(commits_options, function(error, response, body) {
      if (error) {
        //
      }
      let members_data = {}
      members_data['traylor1'] = {
        "name": "Mitchell Traylor",
        "role": "Back-End, Testing",
        "bio": "Computer Science third-year, with special focus on cybersecurity.",
        "photo": mitchell_pic,
        "commits": 0,
        "issues": 0,
        "number_tests": 23
      }
      members_data['smcw66'] = {
        "name": "Sungsup Lee",
        "role": "Front-End",
        "bio": "Studies Computer Science at UT Austin.",
        "photo": sungsup_pic,
        "commits": 0,
        "issues": 0,
        "number_tests": 0
      }
      members_data['abelhtt'] = {
        "name": "Abel Tesfaye",
        "role": "Back-End, Front-End",
        "bio": "I am a junior Computer Science major studying at UT Austin.",
        "photo": abel_pic,
        "commits": 0,
        "issues": 0,
        "number_tests": 13
      }
      members_data['NealFM'] = {
        "name": "Neal Friesenhahn",
        "role": "Web Hosting, API Design",
        "photo": neal_pic,
        "bio": "I am a junior Computer Science major.",
        "commits": 0,
        "issues": 0,
        "number_tests": 28
      }
      members_data['christian-onuogu'] = {
        "name": "Christian Onuogu",
        "role": "Front-End",
        "bio": "I am a junior Computer Science major.",
        "photo": christian_pic,
        "commits": 0,
        "issues": 0,
        "number_tests": 29
      }

      let commitJSON = JSON.parse(body)
      let totalCommits = 0
      for (let i = 0; i < commitJSON.length; i++) {
        let curUserCount = commitJSON[i]['total']

        members_data[String(commitJSON[i]['author']['login'])]["commits"] = curUserCount
        totalCommits += curUserCount
      }

      this.setState({
        total_commits: totalCommits
      })

      var issues_options = {
        method: 'GET',
        url: 'https://api.github.com/repos/theworkingmen/idb/issues?state=all&per_page=100&page=' + String(1),
        qs: {
          state: 'all'
        },
      };

      request(issues_options, function(error, response, body) {
        if (error) {
          //
        }
        let issueJSON = JSON.parse(body)
        for (let i = 0; i < issueJSON.length; i++) {

          if (members_data[String(issueJSON[i]['user']['login'])] === undefined)
            continue;

          members_data[String(issueJSON[i]['user']['login'])]["issues"] += 1
        }

        this.setState({
          members_stats: members_data,
          total_issues: issueJSON.length
        })
      }.bind(this))

      this.setState({
        ready: true
      })
    }.bind(this))
  }

  render() {

      if (this.state.ready == false){
         return <Grid><Row className="spin"><RingLoader
             color={'#123abc'}
             loading={this.state.loading}
             size="100"

           /> </Row></Grid>;
       }

      let members_info = null
      if (this.state.ready == true) {
        members_info = <MembersCard members_info = {
          this.state.members_stats
        }
        />;
    return (
      <div className ="container" style={{background: "white"}}>
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

        <div>
          <block_small> <center> The Team </center> </block_small>
            {members_info}
          <p></p>
        </div>

        <div>
          <Row>
          <block_small> <center>GitHub Stats </center> </block_small>
          <Col  xs={6} md={8}>
          <Table>
            <tr>
              <th><h4> Stat </h4></th>
              <th><h4> Value </h4></th>
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
              <th> 93 </th>
            </tr>
          </Table>
          </Col>
          </Row>
        </div>

        <div>
          <block_small> <p> </p> <center> Sources </center> <p></p></block_small>
          <Grid>
            <ToolCard name="Bureau of Labor Statistics" 
                      image="" 
                      src="https://www.bls.gov/developers/api_signature_v2.html"></ToolCard>
            <ToolCard name="U.S. Census Bureau" 
                      image="" 
                      src="https://www.census.gov/data/developers/data-sets/cbp-nonemp-zbp/cbp-api.html"></ToolCard>
            <ToolCard name="Department of Education" 
                      image="" 
                      src="https://api.data.gov/docs/ed/"></ToolCard>
            <ToolCard name="The Integrated Postsecondary Education Data System" 
                      image="" 
                      src="https://nces.ed.gov/ipeds/"></ToolCard>
            <Col xs={12} sm={3} md={3} lg={3}></Col>
            <ToolCard name="Data USA API" 
                      image="" 
                      src="https://datausa.io/about/datasets/"></ToolCard>
            <ToolCard name="Google Maps API" 
                      image="" 
                      src="https://developers.google.com/maps/"></ToolCard>
          </Grid>
        </div>

        <div>

          <block_small> <center> Tools Used </center> </block_small>
          <Grid> 
            <ToolCard name="Amazon Beanstalk" 
                      image="" 
                      src=""></ToolCard>
            <ToolCard name="Amazon RDS" 
                      image="" 
                      src=""></ToolCard>
            <ToolCard name="Slack" 
                      image="" 
                      src=""></ToolCard>
            <ToolCard name="React" 
                      image="" 
                      src=""></ToolCard>
            <ToolCard name="React Bootstrap" 
                      image="" 
                      src=""></ToolCard>
            <ToolCard name="Flask" 
                      image="" 
                      src=""></ToolCard>
            <ToolCard name="SQLalchemy" 
                      image="" 
                      src=""></ToolCard>
            <ToolCard name="Travis-CI" 
                      image="" 
                      src=""></ToolCard>
            <ToolCard name="Github" 
                      image="" 
                      src=""></ToolCard>
            <ToolCard name="Postman" 
                      image="" 
                      src=""></ToolCard>
            <ToolCard name="Selenium" 
                      image="" 
                      src=""></ToolCard>
            <ToolCard name="Mocha" 
                      image="" 
                      src=""></ToolCard>
          </Grid>
        </div>

        <div>
          <center>
          <block_small> <center>Project Links</center> </block_small>
          <Grid>
            <ToolCard name="Github" 
                      image="" 
                      src="https://github.com/theworkingmen/idb"></ToolCard>
            <ToolCard name="API" 
                      image="https://theworkingmen.gitbooks.io/api/content/" 
                      src=""></ToolCard>
            <ToolCard name="Gitbook Report" 
                      image="https://theworkingmen.gitbooks.io/report/" 
                      src=""></ToolCard>                    
          </Grid>
          </center>
        </div>

        </div>
      </div>

)};};};
