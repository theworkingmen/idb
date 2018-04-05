import React, { Component } from 'react';
import {Image, Grid, Row, Col, Thumbnail, Button, Pagination, ButtonToolbar, DropdownButton, MenuItem} from 'react-bootstrap';
import { Link } from 'react-router-dom'
import Card from './Card.js';
import '../css/Flex.css';
import { RingLoader } from 'react-spinners';

{/* Use following url for default image: http://bit.ly/2CYI94d */}
{/* Grid automatically creates new rows for additional card components. */}

class Majors extends Component {
  constructor() {
    super();
    this.state = {
		majors: [],
        pages: [],
        page: 1,
        loading: true,
        sort: "name",
        order: "Asc",
        stem: "None",
        wage: "None"
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
	  if (Math.ceil(this.state.majors.length/20) < 10) {
		for (let number = 1; number <= Math.ceil(this.state.majors.length/20); number++) {
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
	  else if ((num + 5) > Math.ceil(this.state.majors.length/20)) {
		for (let number = Math.ceil(this.state.majors.length/20) - 9; number <= Math.ceil(this.state.majors.length/20); number++) {
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
	  if (num < Math.ceil(this.state.majors.length/20)) {
		items.push(<Pagination.Next onClick={this.changePage.bind(this, num + 1)}/>);
	  }
	  else {
		  items.push(<Pagination.Next disabled/>);
	  }
	  items.push(<Pagination.Last onClick={this.changePage.bind(this, Math.ceil(this.state.majors.length/20))}/>);
	  /*for (let number = 1; number <= Math.ceil(this.state.majors.length/20); number++) {
		items.push(
			<Pagination.Item active={number === active} onClick={this.changePage.bind(this, number)}>{number}</Pagination.Item>
		);
	  }*/
	  this.setState({page: num,
					 pages: items});

  }

  changeSort(sort) {
	  if (sort == "name") {
		  this.setState({sort: "name"});
	  }
	  else if (sort == "wage") {
		  this.setState({sort: "wage"});
	  }
	  else {
		  this.setState({sort: "work"});
	  }
	  fetch('http://api.majorpotential.me/majors_limited?sort_'+sort+'='+this.state.order+"&is_stem="+this.state.stem+"&wage="+this.state.wage)
	  .then(results => {
		  return results.json();
		}).then(data => {
			let majors = data.records.map((major) => {
                let average_wage = "Average Wage: $" + major.average_wage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
				return(<Card name={major.name} model='majors' domain={major.image_link} id={major.id} field={average_wage}>  </Card>)
			})
			let active = 1;
			let items = [];
			if (Math.ceil(majors.length/20) > 1) {
				items.push(<Pagination.First onClick={this.changePage.bind(this, 1)}/>);
				items.push(<Pagination.Prev disabled/>);
				for (let number = 1; number <= Math.min(10, Math.ceil(majors.length/20)); number++) {
					items.push(
						<Pagination.Item active={number === active} onClick={this.changePage.bind(this, number)}>{number}</Pagination.Item>
					);
				}
				items.push(<Pagination.Next onClick={this.changePage.bind(this, 2)}/>);
				items.push(<Pagination.Last onClick={this.changePage.bind(this, Math.ceil(majors.length/20))}/>);
			}
			this.setState({pages: items});
			this.setState({page: 1});
			this.setState({majors: majors});
            this.setState({loading: false});
		})
  }

  changeOrder(order) {
	  if (order == "Asc") {
		  this.setState({order: "Asc"});
	  }
	  else {
		  this.setState({order: "Desc"});
	  }
	  fetch('http://api.majorpotential.me/majors_limited?sort_'+this.state.sort+'='+order+"&is_stem="+this.state.stem+"&wage="+this.state.wage)
	  .then(results => {
		  return results.json();
		}).then(data => {
			let majors = data.records.map((major) => {
                let average_wage = "Average Wage: $" + major.average_wage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                return(<Card name={major.name} model='majors' domain={major.image_link} id={major.id} field={average_wage}>  </Card>)
			})
			let active = 1;
			let items = [];
			if (Math.ceil(majors.length/20) > 1) {
				items.push(<Pagination.First onClick={this.changePage.bind(this, 1)}/>);
				items.push(<Pagination.Prev disabled/>);
				for (let number = 1; number <= Math.min(10, Math.ceil(majors.length/20)); number++) {
					items.push(
						<Pagination.Item active={number === active} onClick={this.changePage.bind(this, number)}>{number}</Pagination.Item>
					);
				}
				items.push(<Pagination.Next onClick={this.changePage.bind(this, 2)}/>);
				items.push(<Pagination.Last onClick={this.changePage.bind(this, Math.ceil(majors.length/20))}/>);
			}
			this.setState({pages: items});
			this.setState({page: 1});
			this.setState({majors: majors});
            this.setState({loading: false});
		})
  }

  changeSTEM(stem) {
      this.setState({stem: stem});
	  fetch('http://api.majorpotential.me/majors_limited?sort_'+this.state.sort+'='+this.state.order+"&is_stem="+stem+"&wage="+this.state.wage)
	  .then(results => {
		  return results.json();
		}).then(data => {
			let majors = data.records.map((major) => {
                let average_wage = "Average Wage: $" + major.average_wage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                return(<Card name={major.name} model='majors' domain={major.image_link} id={major.id} field={average_wage}>  </Card>)
			})
			let active = 1;
			let items = [];
			if (Math.ceil(majors.length/20) > 1) {
				items.push(<Pagination.First onClick={this.changePage.bind(this, 1)}/>);
				items.push(<Pagination.Prev disabled/>);
				for (let number = 1; number <= Math.min(10, Math.ceil(majors.length/20)); number++) {
					items.push(
						<Pagination.Item active={number === active} onClick={this.changePage.bind(this, number)}>{number}</Pagination.Item>
					);
				}
				items.push(<Pagination.Next onClick={this.changePage.bind(this, 2)}/>);
				items.push(<Pagination.Last onClick={this.changePage.bind(this, Math.ceil(majors.length/20))}/>);
			}
			this.setState({pages: items});
			this.setState({page: 1});
			this.setState({majors: majors});
            this.setState({loading: false});
		})
  }

  resetSortFilter() {
	  this.setState({
        sort: "name",
        order: "Asc",
        stem: "None",
        wage: "None"
	});
	  fetch('http://api.majorpotential.me/majors_limited?sort_name=Asc&is_stem=None&wage=None')
	  .then(results => {
		  return results.json();
		}).then(data => {
			let majors = data.records.map((major) => {
                let average_wage = "Average Wage: $" + major.average_wage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                return(<Card name={major.name} model='majors' domain={major.image_link} id={major.id} field={average_wage}>  </Card>)
			})
			let active = 1;
			let items = [];
			if (Math.ceil(majors.length/20) > 1) {
				items.push(<Pagination.First onClick={this.changePage.bind(this, 1)}/>);
				items.push(<Pagination.Prev disabled/>);
				for (let number = 1; number <= Math.min(10, Math.ceil(majors.length/20)); number++) {
					items.push(
						<Pagination.Item active={number === active} onClick={this.changePage.bind(this, number)}>{number}</Pagination.Item>
					);
				}
				items.push(<Pagination.Next onClick={this.changePage.bind(this, 2)}/>);
				items.push(<Pagination.Last onClick={this.changePage.bind(this, Math.ceil(majors.length/20))}/>);
			}
			this.setState({pages: items});
			this.setState({page: 1});
			this.setState({majors: majors});
            this.setState({loading: false});
		})
  }

  componentDidMount() {
	  fetch('http://api.majorpotential.me/majors_limited?sort_'+this.state.sort+'='+this.state.order+"&is_stem="+this.state.stem+"&wage="+this.state.wage)
	  .then(results => {
		  return results.json();
		}).then(data => {
			let majors = data.records.map((major) => {
                let average_wage = "Average Wage: $" + major.average_wage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
				return(<Card name={major.name} model='majors' domain={major.image_link} id={major.id} field={average_wage}>  </Card>)
			})
			let active = 1;
			let items = [];
			if (Math.ceil(majors.length/20) > 1) {
				items.push(<Pagination.First onClick={this.changePage.bind(this, 1)}/>);
				items.push(<Pagination.Prev disabled/>);
				for (let number = 1; number <= Math.min(10, Math.ceil(majors.length/20)); number++) {
					items.push(
						<Pagination.Item active={number === active} onClick={this.changePage.bind(this, number)}>{number}</Pagination.Item>
					);
				}
				items.push(<Pagination.Next onClick={this.changePage.bind(this, 2)}/>);
				items.push(<Pagination.Last onClick={this.changePage.bind(this, Math.ceil(majors.length/20))}/>);
			}
			this.setState({pages: items});
			this.setState({majors: majors});
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
		display[i] = this.state.majors[((this.state.page - 1) * 20) + i]
	}

    return (
		<div>
		<Row>
			<Col xs={4}></Col>
			<Col xs	={6}>
			<ButtonToolbar>
				<DropdownButton title="Sort by">
					<MenuItem eventKey="1" onClick={this.changeSort.bind(this, "name")}>Name</MenuItem>
					<MenuItem eventKey="2" onClick={this.changeSort.bind(this, "wage")}>Average Wage</MenuItem>
					<MenuItem eventKey="3" onClick={this.changeSort.bind(this, "work")}>Workforce</MenuItem>
				</DropdownButton>
				<DropdownButton title="Order">
					<MenuItem eventKey="1" onClick={this.changeOrder.bind(this, "Asc")}>Ascending</MenuItem>
					<MenuItem eventKey="2" onClick={this.changeOrder.bind(this, "Desc")}>Descending</MenuItem>
				</DropdownButton>
				<DropdownButton title="Filter by STEM">
					<MenuItem eventKey="1" onClick={this.changeSTEM.bind(this, "None")}>None</MenuItem>
					<MenuItem eventKey="2" onClick={this.changeSTEM.bind(this, "yes")}>STEM</MenuItem>
					<MenuItem eventKey="3" onClick={this.changeSTEM.bind(this, "no")}>Non-STEM</MenuItem>
				</DropdownButton>
				<Button onClick={this.resetSortFilter.bind(this)}>
					Reset
				</Button>
			</ButtonToolbar>
			</Col>
		</Row>
		<Grid><Row className="flex-row">{display}</Row></Grid>
		<center><Pagination bsSize="large">{this.state.pages}</Pagination></center>
		</div>
		)
  }
}

export default Majors;
