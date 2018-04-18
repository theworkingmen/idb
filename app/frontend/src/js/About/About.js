import React, { Component } from 'react';
import { Jumbotron } from 'react-bootstrap';
import {Grid, Row, Col, Table} from 'react-bootstrap';
import '../../css/about.css';
import abel_pic from '../../images/authors/abel_pic.jpg';
import sungsup_pic from '../../images/authors/sungsup_pic.jpg';
import mitchell_pic from '../../images/authors/mitchell_pic.jpg';
import neal_pic from '../../images/authors/neal_pic.jpg';
import christian_pic from '../../images/authors/christian_pic.jpg';
import MembersCard from './MembersCard'
import MembersCard2 from './MembersCard2'
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
        "bio": "I am a sophomore Computer Science major.",
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

      this.setState({total_commits: totalCommits})

      var issues_options = {
        method: 'GET',
        url: 'https://api.github.com/repos/theworkingmen/idb/issues?state=all&per_page=100&page=' + String(1),
        qs: {state: 'all'},
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

      this.setState({ready: true})
    }.bind(this))
  }

  render() {

      if (this.state.ready === false){
         return <Grid><Row className="spin"><RingLoader
             color={'#123abc'}
             loading={this.state.loading}
             size="100"
           /> </Row></Grid>;
       }

      let members_info = null
      
      if (this.state.ready === true) {
        /*members_info = <MembersCard members_info = {this.state.members_stats}/>;*/
        var member = Object.assign({},this.state.members_stats['smcw66']);
        
        return (
          <div className ="container" style={{background: "white"}}>
            <div className ='container'>
            <div className = 'introduction'>
              <Jumbotron>
              <logo> <center> About Us </center></logo>
              <p></p>
                <intro ><center> Major Potential is a website that links Universities, Cities, and Majors. We envision our website to 
                provide important information for users who are trying to find information about 4 year universities in the United States.
                </center> </intro>
              <p></p>
              <p></p>
              </Jumbotron>
            </div>

            <div>
              <block_small> <center> The Team </center> </block_small>
              <Grid>
                <MembersCard2 member={Object.assign({},this.state.members_stats['traylor1'])}></MembersCard2>
                <MembersCard2 member={Object.assign({},this.state.members_stats['smcw66'])}></MembersCard2>
                <MembersCard2 member={Object.assign({},this.state.members_stats['abelhtt'])}></MembersCard2>
                <Col sm={2} md={2} lg={2}></Col>
                <MembersCard2 member={Object.assign({},this.state.members_stats['NealFM'])}></MembersCard2>
                <MembersCard2 member={Object.assign({},this.state.members_stats['christian-onuogu'])}></MembersCard2>
              </Grid>
              
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
              <block_small> <center> Sources </center> </block_small>
              <Grid>
                <Row>
                <Col sm={1} md={1} lg={1} style={{width:"12.5%"}}></Col>
                <ToolCard name="Bureau of Labor Statistics" 
                          image="https://logo.clearbit.com/bls.gov" 
                          src="https://www.bls.gov/developers/api_signature_v2.html"></ToolCard>
                <ToolCard name="U.S. Census Bureau" 
                          image="https://logo.clearbit.com/census.gov" 
                          src="https://www.census.gov/data/developers/data-sets/cbp-nonemp-zbp/cbp-api.html"></ToolCard>
                <ToolCard name="Department of Education" 
                          image="https://logo.clearbit.com/data.gov" 
                          src="https://api.data.gov/docs/ed/"></ToolCard>
                </Row>
                <Row>
                <Col sm={1} md={1} lg={1} style={{width:"12.5%"}}></Col>
                <ToolCard name="The Integrated Postsecondary Education Data System" 
                          image="https://logo.clearbit.com/nces.ed.gov" 
                          src="https://nces.ed.gov/ipeds/"></ToolCard>
                <ToolCard name="Data USA API" 
                          image="https://logo.clearbit.com/datausa.io" 
                          src="https://datausa.io/about/datasets/"></ToolCard>
                <ToolCard name="Google Maps API" 
                          image="https://goo.gl/PxL8TL" 
                          src="https://developers.google.com/maps/"></ToolCard>
                </Row>
              </Grid>
            </div>

            <div>

              <block_small> <center> Tools Used </center> </block_small>
              <Grid> 
                <ToolCard name="Amazon Web Services" 
                          image="https://logo.clearbit.com/aws.training" 
                          src="https://aws.amazon.com"
                          about="Server Hosting"></ToolCard>
                <ToolCard name="Python" 
                          image="https://logo.clearbit.com/python.org" 
                          src="https://www.python.org"
                          about="Backend Development"></ToolCard>
                <ToolCard name="Flask" 
                          image="https://i.lensdump.com/i/TDYNA.png" 
                          src="http://flask.pocoo.org"
                          about="Backend Python Library"></ToolCard>          
                <ToolCard name="Slack" 
                          image="https://logo.clearbit.com/slack.com" 
                          src="https://slack.com"
                          about="Communication"></ToolCard>
                <ToolCard name="React" 
                          image="https://logo.clearbit.com/reactjsday.it" 
                          src="https://reactjs.org"
                          about="Frontend Development"></ToolCard>
                <ToolCard name="React Bootstrap" 
                          image="https://goo.gl/R75VBm" 
                          src="https://react-bootstrap.github.io"
                          about="Frontend CSS"></ToolCard>
                <ToolCard name="React Router" 
                          image="https://goo.gl/m9JCBZ" 
                          src="https://reacttraining.com/react-router/"
                          about="Library of Navigational React Components"></ToolCard> 
                <ToolCard name="React Highlight Words" 
                          image="https://goo.gl/Kfuctr" 
                          src="http://bvaughn.github.io/react-highlight.js/"
                          about="Syntaxt highlighting Library"></ToolCard>                    
                <ToolCard name="SQLalchemy" 
                          image="https://logo.clearbit.com/sqlalchemy.org" 
                          src="http://flask-sqlalchemy.pocoo.org/2.3/"
                          about="Object Relational Mapping LIbrary for Database Connection"></ToolCard>
                <ToolCard name="Travis-CI" 
                          image="https://logo.clearbit.com/travis-ci.com" 
                          src="https://travis-ci.org"
                          about="Continuous Integration"></ToolCard>
                <ToolCard name="Github" 
                          image="https://logo.clearbit.com/github.com" 
                          src="https://github.com"
                          about="Version Control and Project Management"></ToolCard>
                <ToolCard name="Postman" 
                          image="https://logo.clearbit.com/getpostman.com" 
                          src="https://www.getpostman.com"
                          about="API Design and Testing"></ToolCard>       
                <Col sm={1} md={1} lg={1} style={{width:"12.5%"}}></Col>
                <ToolCard name="Selenium" 
                          image="https://logo.clearbit.com/seleniumhq.org" 
                          src="https://www.seleniumhq.org"
                          about="GUI Testing"></ToolCard>
                <ToolCard name="Mocha" 
                          image="https://goo.gl/4G7jTa" 
                          src="https://mochajs.org"
                          about="Frontend Testing"></ToolCard>
                <ToolCard name="Babel" 
                          image="https://logo.clearbit.com/babeljs.io" 
                          src="https://babeljs.io/"
                          about="JavaScript Pre-Compiler"></ToolCard>
                
                          
              </Grid>
            </div>

            <div>
              <center>
              <block_small> <center>Project Links</center> </block_small>
              <Grid>
                <Col sm={1} md={1} lg={1} style={{width:"12.5%"}}></Col>
                <ToolCard name="Github" 
                          image="https://logo.clearbit.com/github.com" 
                          src="https://github.com/theworkingmen/idb"></ToolCard>
                <ToolCard name="API" 
                          image="https://d30y9cdsu7xlg0.cloudfront.net/png/8220-200.png" 
                          src="https://theworkingmen.gitbooks.io/api/content/"></ToolCard>
                <ToolCard name="Gitbook Report" 
                          image="https://logo.clearbit.com/gitbook.com" 
                          src="https://theworkingmen.gitbooks.io/report/"></ToolCard>                    
              </Grid>
              </center>
            </div>

            </div>
          </div>

)};};};
