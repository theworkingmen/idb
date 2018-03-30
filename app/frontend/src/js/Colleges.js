import React, { Component } from 'react';
import {Image, Grid, Row, Col, Thumbnail, Pagination} from 'react-bootstrap';
import { Link } from 'react-router-dom'
import Card from './Card.js';
import '../css/Flex.css';
import { RingLoader } from 'react-spinners';


{/* Use following url for default image: http://bit.ly/2CYI94d */}
{/* Grid automatically creates new rows for additional card components. */}

class Colleges extends Component {
  constructor() {
    super();
    this.state = {
		colleges: [],
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
	  if (Math.ceil(this.state.colleges.length/20) < 10) {
		for (let number = 1; number <= Math.ceil(this.state.colleges.length/20); number++) {
			items.push(
				<Pagination.Item active={number === active} onClick={this.changePage.bind(this, number)}>{number}</Pagination.Item>
			);
		}
	  }
	  else if ((num - 5) < 1) {
		for (let number = 1; number <= 10; number++) {
			items.push(
			<	Pagination.Item active={number === active} onClick={this.changePage.bind(this, number)}>{number}</Pagination.Item>
			);
		}
	  }
	  else if ((num + 5) > Math.ceil(this.state.colleges.length/20)) {
		for (let number = Math.ceil(this.state.colleges.length/20) - 9; number <= Math.ceil(this.state.colleges.length/20); number++) {
			items.push(
			<	Pagination.Item active={number === active} onClick={this.changePage.bind(this, number)}>{number}</Pagination.Item>
			);
		}
	  }
	  else  {
		for (let number = num - 5; number < num + 5; number++) {
			items.push(
			<	Pagination.Item active={number === active} onClick={this.changePage.bind(this, number)}>{number}</Pagination.Item>
			);
		}
	  }
	  if (num < Math.ceil(this.state.colleges.length/20)) {
		items.push(<Pagination.Next onClick={this.changePage.bind(this, num + 1)}/>);
	  }
	  else {
		  items.push(<Pagination.Next disabled/>);
	  }
	  items.push(<Pagination.Last onClick={this.changePage.bind(this, Math.ceil(this.state.colleges.length/20))}/>);
	  /*for (let number = 1; number <= Math.ceil(this.state.colleges.length/20); number++) {
		items.push(
			<Pagination.Item active={number === active} onClick={this.changePage.bind(this, number)}>{number}</Pagination.Item>
		);
	  }*/
	  this.setState({page: num,
					 pages: items});

  }

  componentDidMount() {
	  fetch('http://api.majorpotential.me/universities_limited')
	  .then(results => {
		  return results.json();
		}).then(data => {
			let colleges = data.records.map((college) => {
				return(<Card name={college.name} model='colleges' domain={college.image_link} id={college.id}>  </Card>)
			})
			let active = 1;
			let items = [];
			if (Math.ceil(colleges.length/20) > 1) {
				items.push(<Pagination.First onClick={this.changePage.bind(this, 1)}/>);
				items.push(<Pagination.Prev disabled/>);
				for (let number = 1; number <= Math.min(10, Math.ceil(colleges.length/20)); number++) {
					items.push(
						<Pagination.Item active={number === active} onClick={this.changePage.bind(this, number)}>{number}</Pagination.Item>
					);
				}
				items.push(<Pagination.Next onClick={this.changePage.bind(this, 2)}/>);
				items.push(<Pagination.Last onClick={this.changePage.bind(this, Math.ceil(colleges.length/20))}/>);
			}
			this.setState({pages: items});
			this.setState({colleges: colleges});
            this.setState({loading: false});
		})


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
		display[i] = this.state.colleges[((this.state.page - 1) * 20) + i]
	}

    return (
		<div>
		<Grid><Row className="flex-row">{display}</Row></Grid>
		<center><Pagination bsSize="large">{this.state.pages}</Pagination></center>
		</div>
		)
  }
}

export default Colleges;
