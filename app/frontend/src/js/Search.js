import React, { Component } from 'react';
import {Grid, Row, Pagination, Label} from 'react-bootstrap';
import TallCard from './TallCard.js';
import '../css/Flex.css';
import { RingLoader } from 'react-spinners';

class Search extends Component {
	
  /* Use following url for default image: http://bit.ly/2CYI94d 
	Grid automatically creates new rows for additional card components. */
	
  constructor() {
    super();
    this.state = {
		results: [],
		pages: [],
		page: 1,
        loading: true,
        pageCount: 0
	};

  }

  changePage(num) {
	  let active = num;
	  let items = [];

	  items.push(<Pagination.First onClick={this.changePage.bind(this, 1)} key="first"/>);
	  if (num > 1) {
		items.push(<Pagination.Prev onClick={this.changePage.bind(this, num - 1)} key="prev"/>);
	  }
	  else {
		  items.push(<Pagination.Prev disabled key="prev"/>);
	  }

	  let start = 0;
	  let end   = 0;
	  

	  if (this.state.pageCount < 10) {
	  	start = 1;
	  	end = this.state.pageCount;
	  }
	  else if ((num - 5) < 1) {
	  	start = 1;
	  	end = 10;
	  }
	  else if ((num + 5) > this.state.pageCount) {
	  	start = this.state.pageCount - 9;
	  	end = this.state.pageCount;
	  }
	  else  {
	  	start = num - 5;
	  	end = num + 4;
	  }

	  for (let number = start; number <= end; number++) {
		items.push(
			<Pagination.Item active={number === active} onClick={this.changePage.bind(this, number)} key={number}>{number}</Pagination.Item>
		);
	  }

	  if (num < this.state.pageCount) {
		items.push(<Pagination.Next onClick={this.changePage.bind(this, num + 1)} key="next"/>);
	  }
	  else {
		  items.push(<Pagination.Next disabled key="next"/>);
	  }
	  items.push(<Pagination.Last onClick={this.changePage.bind(this, this.state.pageCount)} key="last"/>);

	  this.setState({page: num,
					 pages: items});

  }

  runSearch(searchprop) {
  	fetch('http://api.majorpotential.me/search/'+searchprop)
	  .then(results => {
		  return results.json();
		}).then(data => {
			let cityResults = data.records.Cities.map((city) => {
				return(<TallCard name={city.name} model='cities' domain={city.image_link} id={city.id} highlight={searchprop.split(" ")}
												 field1={city.county} field2="" field3={"Population: " + city.population} key={city.id}> </TallCard>)
			})
			let majorResults = data.records.Majors.map((major) => {
				return(<TallCard name={major.name} model='majors' domain={major.image_link} id={major.id} highlight={searchprop.split(" ")}
												 field1="" field2="" field3={"Avg Wage: " + major.average_wage} key={major.id}> </TallCard>)
			})
			let collegeResults = data.records.Universities.map((college) => {
				return(<TallCard name={college.name} model='colleges' domain={college.image_link} id={college.id} highlight={searchprop.split(" ")}
												 field1={college.state} field2={college.type} key={college.id}>  </TallCard>)
			})
			let active = 1;
			let results = cityResults.concat(majorResults).concat(collegeResults);
			let items = [];
			this.setState({pageCount: Math.ceil(results.length/20)});
			if (this.state.pageCount > 1) {
				items.push(<Pagination.First onClick={this.changePage.bind(this, 1)} key="first"/>);
				items.push(<Pagination.Prev disabled key="prev"/>);
				for (let number = 1; number <= Math.min(10, this.state.pageCount); number++) {
					items.push(
						<Pagination.Item active={number === active} onClick={this.changePage.bind(this, number)} key={number}>{number}</Pagination.Item>
					);
				}
				items.push(<Pagination.Next onClick={this.changePage.bind(this, 2)} key="next"/>);
				items.push(<Pagination.Last onClick={this.changePage.bind(this, Math.ceil(results.length/20))} key="last"/>);
			}
			this.setState({pages: items});
			this.setState({page: 1});
			this.setState({results: results});
            this.setState({loading: false});
		})
  }

  componentDidMount() {
    this.runSearch(this.props.match.params.id);
  }

  componentWillReceiveProps (nextProps) {
    this.runSearch(nextProps.match.params.id);
  }

  render() {

  if (this.state.loading === true){
     return <Grid><Row className="spin"><RingLoader
         color={'#123abc'}
         loading={this.state.loading}
         size={100}

       /> </Row></Grid>;
   }

	let display = []
	for (let i = 0; i < 20; i++) {
		display[i] = this.state.results[((this.state.page - 1) * 20) + i]
	}

	var ret = null
	if (this.state.results.length === 0){
		ret = (<div className="container" style={{backgroundColor:"white"}}><center><h1>No search results found</h1></center></div>)
	}
	else {
		ret = (
		<div>
        <Row>
          <center><h3>
            <Label className="college">University</Label>
            <Label className='city'>City</Label>
            <Label className='major'>Major</Label>
          </h3></center>
         </Row>

		<Grid><Row className="flex-row">{display}</Row></Grid>
		<center><Pagination bsSize="large">{this.state.pages}</Pagination></center>
		</div>
		)
	}

    return ret
  }
}

export default Search;
