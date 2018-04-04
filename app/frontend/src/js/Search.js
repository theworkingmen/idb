import React, { Component } from 'react';
import {Image, Grid, Row, Col, Thumbnail, Pagination} from 'react-bootstrap';
import { Link } from 'react-router-dom'
import Card from './Card.js';
import TallCard from './TallCard.js';
import '../css/Flex.css';
import { RingLoader } from 'react-spinners';

{/* Use following url for default image: http://bit.ly/2CYI94d */}
{/* Grid automatically creates new rows for additional card components. */}

class Search extends Component {
  constructor() {
    super();
    this.state = {
		results: [],
		pages: [],
		page: 1,
        loading: true
	};

  }

  changePage(num) {
	  let active = num;
	  let items = [];
	  items.push(<Pagination.First onClick={this.changePage.bind(this, 1)}/>);
	  if (num > 1) {
		items.push(<Pagination.Prev onClick={this.changePage.bind(this, num - 1)}/>);
	  }
	  else {
		  items.push(<Pagination.Prev disabled/>);
	  }
	  if (Math.ceil(this.state.results.length/20) < 10) {
		for (let number = 1; number <= Math.ceil(this.state.results.length/20); number++) {
			items.push(
				<Pagination.Item active={number === active} onClick={this.changePage.bind(this, number)}>{number}</Pagination.Item>
			);
		}
	  }
	  else if ((num - 5) < 1) {
		for (let number = 1; number <= 10; number++) {
			items.push(
			<Pagination.Item active={number === active} onClick={this.changePage.bind(this, number)}>{number}</Pagination.Item>
			);
		}
	  }
	  else if ((num + 5) > Math.ceil(this.state.results.length/20)) {
		for (let number = Math.ceil(this.state.results.length/20) - 9; number <= Math.ceil(this.state.results.length/20); number++) {
			items.push(
			<Pagination.Item active={number === active} onClick={this.changePage.bind(this, number)}>{number}</Pagination.Item>
			);
		}
	  }
	  else  {
		for (let number = num - 5; number < num + 5; number++) {
			items.push(
			<Pagination.Item active={number === active} onClick={this.changePage.bind(this, number)}>{number}</Pagination.Item>
			);
		}
	  }
	  if (num < Math.ceil(this.state.results.length/20)) {
		items.push(<Pagination.Next onClick={this.changePage.bind(this, num + 1)}/>);
	  }
	  else {
		  items.push(<Pagination.Next disabled/>);
	  }
	  items.push(<Pagination.Last onClick={this.changePage.bind(this, Math.ceil(this.state.results.length/20))}/>);
	  /*for (let number = 1; number <= Math.ceil(this.state.cities.length/20); number++) {
		items.push(
			<Pagination.Item active={number === active} onClick={this.changePage.bind(this, number)}>{number}</Pagination.Item>
		);
	  }*/
	  this.setState({page: num,
					 pages: items});

  }

  runSearch(searchprop) {
  	fetch('http://127.0.0.1:5000/search/'+searchprop)
	  .then(results => {
		  return results.json();
		}).then(data => {
			let cityResults = data.records.Cities.map((city) => {
				return(<TallCard name={city.name} model='cities' domain={city.image_link} id={city.id} field = "test" highlight={searchprop}>  </TallCard>)
			})
			let majorResults = data.records.Majors.map((major) => {
				return(<TallCard name={major.name} model='majors' domain={major.image_link} id={major.id} field="" highlight={searchprop}>  </TallCard>)
			})
			let collegeResults = data.records.Universities.map((college) => {
				return(<TallCard name={college.name} model='colleges' domain={college.image_link} id={college.id} field={college.type} highlight={searchprop}>  </TallCard>)
			})
			let active = 1;
			let results = cityResults.concat(majorResults).concat(collegeResults);
			let items = [];
			if (Math.ceil(results.length/20) > 1) {
				items.push(<Pagination.First onClick={this.changePage.bind(this, 1)}/>);
				items.push(<Pagination.Prev disabled/>);
				for (let number = 1; number <= Math.min(10, Math.ceil(results.length/20)); number++) {
					items.push(
						<Pagination.Item active={number === active} onClick={this.changePage.bind(this, number)}>{number}</Pagination.Item>
					);
				}
				items.push(<Pagination.Next onClick={this.changePage.bind(this, 2)}/>);
				items.push(<Pagination.Last onClick={this.changePage.bind(this, Math.ceil(results.length/20))}/>);
			}
			this.setState({pages: items});
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

  if (this.state.loading == true){
     return <Grid><Row className="spin"><RingLoader
         color={'#123abc'}
         loading={this.state.loading}
         size="100"

       /> </Row></Grid>;
   }

	let display = []
	for (let i = 0; i < 20; i++) {
		display[i] = this.state.results[((this.state.page - 1) * 20) + i]
	}

    return (
		<div>
		<Grid><Row className="flex-row">{display}</Row></Grid>
		<center><Pagination bsSize="large">{this.state.pages}</Pagination></center>
		</div>
		)
  }
}

export default Search;
