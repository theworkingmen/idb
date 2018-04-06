import React, { Component } from 'react';
import {Image, Grid, Row, Col, Thumbnail, Pagination, Button, ButtonToolbar, DropdownButton, MenuItem} from 'react-bootstrap';
import { Link } from 'react-router-dom'
import Card from './Card.js';
import '../css/Flex.css';
import { RingLoader } from 'react-spinners';

{/* Use following url for default image: http://bit.ly/2CYI94d */}
{/* Grid automatically creates new rows for additional card components. */}

class Cities extends Component {
  constructor() {
    super();
    this.state = {
		cities: [],
		pages: [],
		page: 1,
        loading: true,
        sort: "name",
        order: "Asc",
        state: "None"
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
	  if (Math.ceil(this.state.cities.length/20) < 10) {
		for (let number = 1; number <= Math.ceil(this.state.cities.length/20); number++) {
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
	  else if ((num + 5) > Math.ceil(this.state.cities.length/20)) {
		for (let number = Math.ceil(this.state.cities.length/20) - 9; number <= Math.ceil(this.state.cities.length/20); number++) {
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
	  if (num < Math.ceil(this.state.cities.length/20)) {
		items.push(<Pagination.Next onClick={this.changePage.bind(this, num + 1)}/>);
	  }
	  else {
		  items.push(<Pagination.Next disabled/>);
	  }
	  items.push(<Pagination.Last onClick={this.changePage.bind(this, Math.ceil(this.state.cities.length/20))}/>);
	  /*for (let number = 1; number <= Math.ceil(this.state.cities.length/20); number++) {
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
	  else {
		  this.setState({sort: "pop"});
	  }
	  fetch('http://api.majorpotential.me/cities_limited?sort_'+sort+'='+this.state.order+"&state="+this.state.state)
	  .then(results => {
		  return results.json();
		}).then(data => {
			let cities = data.records.map((city) => {
                let population_prop = city.population;
                if (population_prop === null){
                    population_prop = "Population: data unavailable"
                }
                else{
                    population_prop = "Population: " + population_prop.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                }
				return(<Card name={city.city_name} model='cities' domain={city.city_image_link} id={city.id} field = {population_prop} >  </Card>)
			})
			let active = 1;
			let items = [];
			if (Math.ceil(cities.length/20) > 1) {
				items.push(<Pagination.First onClick={this.changePage.bind(this, 1)}/>);
				items.push(<Pagination.Prev disabled/>);
				for (let number = 1; number <= Math.min(10, Math.ceil(cities.length/20)); number++) {
					items.push(
						<Pagination.Item active={number === active} onClick={this.changePage.bind(this, number)}>{number}</Pagination.Item>
					);
				}
				items.push(<Pagination.Next onClick={this.changePage.bind(this, 2)}/>);
				items.push(<Pagination.Last onClick={this.changePage.bind(this, Math.ceil(cities.length/20))}/>);
			}
			this.setState({pages: items});
			this.setState({page: 1});
			this.setState({cities: cities});
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
	  fetch('http://api.majorpotential.me/cities_limited?sort_'+this.state.sort+'='+order+"&state="+this.state.state)
	  .then(results => {
		  return results.json();
		}).then(data => {
			let cities = data.records.map((city) => {
                let population_prop = city.population;
                if (population_prop === null){
                    population_prop = "Population: data unavailable"
                }
                else{
                    population_prop = "Population: " + population_prop.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                }
				return(<Card name={city.city_name} model='cities' domain={city.city_image_link} id={city.id} field = {population_prop} >  </Card>)
			})
			let active = 1;
			let items = [];
			if (Math.ceil(cities.length/20) > 1) {
				items.push(<Pagination.First onClick={this.changePage.bind(this, 1)}/>);
				items.push(<Pagination.Prev disabled/>);
				for (let number = 1; number <= Math.min(10, Math.ceil(cities.length/20)); number++) {
					items.push(
						<Pagination.Item active={number === active} onClick={this.changePage.bind(this, number)}>{number}</Pagination.Item>
					);
				}
				items.push(<Pagination.Next onClick={this.changePage.bind(this, 2)}/>);
				items.push(<Pagination.Last onClick={this.changePage.bind(this, Math.ceil(cities.length/20))}/>);
			}
			this.setState({pages: items});
			this.setState({page: 1});
			this.setState({cities: cities});
            this.setState({loading: false});
		})
  }

  changeState(state) {
	  this.setState({state: state});
	  fetch('http://api.majorpotential.me/cities_limited?sort_'+this.state.sort+'='+this.state.order+"&state="+state)
	  .then(results => {
		  return results.json();
		}).then(data => {
			let cities = data.records.map((city) => {
                let population_prop = city.population;
                if (population_prop === null){
                    population_prop = "Population: data unavailable"
                }
                else{
                    population_prop = "Population: " + population_prop.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                }
                return(<Card name={city.city_name} model='cities' domain={city.city_image_link} id={city.id} field = {population_prop} >  </Card>)
			})
			let active = 1;
			let items = [];
			if (Math.ceil(cities.length/20) > 1) {
				items.push(<Pagination.First onClick={this.changePage.bind(this, 1)}/>);
				items.push(<Pagination.Prev disabled/>);
				for (let number = 1; number <= Math.min(10, Math.ceil(cities.length/20)); number++) {
					items.push(
						<Pagination.Item active={number === active} onClick={this.changePage.bind(this, number)}>{number}</Pagination.Item>
					);
				}
				items.push(<Pagination.Next onClick={this.changePage.bind(this, 2)}/>);
				items.push(<Pagination.Last onClick={this.changePage.bind(this, Math.ceil(cities.length/20))}/>);
			}
			this.setState({pages: items});
			this.setState({page: 1});
			this.setState({cities: cities});
            this.setState({loading: false});
		})
  }

  createStates(){
	  let state = [["Alabama", "AL"], ["Alaska", "AK"], ["Arizona", "AZ"], ["Arkansas", "AR"],
	   ["California", "CA"], ["Colorado", "CO"], ["Connecticut", "CT"], ["Delaware", "DE"],
	   ["Florida", "FL"], ["Georgia", "GA"], ["Hawaii", "HI"], ["Idaho", "ID"], ["Illinois", "IL"],
	   ["Indiana", "IN"], ["Iowa", "IA"], ["Kansas", "KS"], ["Kentucky", "KY"], ["Louisiana", "LA"],
	   ["Maine", "ME"], ["Maryland", "MD"], ["Massachusetts", "MA"], ["Michigan", "MI"], ["Minnesota", "MN"],
	   ["Missouri", "MO"], ["Montana", "MT"], ["Nebraska", "NE"], ["Nevada", "NV"], ["New Hampshire", "NH"],
	   ["New Jersey", "NJ"], ["New Mexico", "NM"], ["New York", "NY"], ["North Carolina", "NC"],
	   ["North Dakota", "ND"], ["Ohio", "OH"], ["Oklahoma", "OK"], ["Oregon", "OR"], ["Pennsylvania", "PA"],
	   ["Rhode Island", "RI"], ["South Carolina", "SC"], ["South Dakota", "SD"], ["Tennessee", "TN"],
	   ["Texas", "TX"], ["Utah", "UT"], ["Vermont", "VT"], ["Washington", "WA"], ["West Virginia", "WV"],
	   ["Wisconsin", "WI"], ["Wyoming", "WY"], ["Puerto Rico", "PR"], ["District of Columbia", "DC"]]
	  let items = []
	  for (let i = 0; i < state.length; i++) {
		  items.push(<MenuItem eventKey={i} onClick={this.changeState.bind(this, state[i][1])}>{state[i][0]}</MenuItem>);
	  }
	  return items
  }

  resetSortFilter() {
	  this.setState({
        sort: "name",
        order: "Asc",
        state: "None"
	});
	  fetch('http://api.majorpotential.me/cities_limited?sort_name=Asc&state=None')
	  .then(results => {
		  return results.json();
		}).then(data => {
			let cities = data.records.map((city) => {
                let population_prop = city.population;
                if (population_prop === null){
                    population_prop = "Population: data unavailable"
                }
                else{
                    population_prop = "Population: " + population_prop.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                }
				return(<Card name={city.city_name} model='cities' domain={city.city_image_link} id={city.id} field = {population_prop} >  </Card>)
			})
			let active = 1;
			let items = [];
			if (Math.ceil(cities.length/20) > 1) {
				items.push(<Pagination.First onClick={this.changePage.bind(this, 1)}/>);
				items.push(<Pagination.Prev disabled/>);
				for (let number = 1; number <= Math.min(10, Math.ceil(cities.length/20)); number++) {
					items.push(
						<Pagination.Item active={number === active} onClick={this.changePage.bind(this, number)}>{number}</Pagination.Item>
					);
				}
				items.push(<Pagination.Next onClick={this.changePage.bind(this, 2)}/>);
				items.push(<Pagination.Last onClick={this.changePage.bind(this, Math.ceil(cities.length/20))}/>);
			}
			this.setState({pages: items});
			this.setState({page: 1});
			this.setState({cities: cities});
            this.setState({loading: false});
		})
  }


  componentDidMount() {
	  fetch('http://api.majorpotential.me/cities_limited?sort_'+this.state.sort+'='+this.state.order+"&state="+this.state.state)
	  .then(results => {
		  return results.json();
		}).then(data => {
			let cities = data.records.map((city) => {
                let population_prop = city.population;
                if (population_prop === null){
                    population_prop = "Population: data unavailable"
                }
                else{
                    population_prop = "Population: " + population_prop.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                }
				return(<Card name={city.city_name} model='cities' domain={city.city_image_link} id={city.id} field = {population_prop} >  </Card>)
			})
			let active = 1;
			let items = [];
			if (Math.ceil(cities.length/20) > 1) {
				items.push(<Pagination.First onClick={this.changePage.bind(this, 1)}/>);
				items.push(<Pagination.Prev disabled/>);
				for (let number = 1; number <= Math.min(10, Math.ceil(cities.length/20)); number++) {
					items.push(
						<Pagination.Item active={number === active} onClick={this.changePage.bind(this, number)}>{number}</Pagination.Item>
					);
				}
				items.push(<Pagination.Next onClick={this.changePage.bind(this, 2)}/>);
				items.push(<Pagination.Last onClick={this.changePage.bind(this, Math.ceil(cities.length/20))}/>);
			}
			this.setState({pages: items});
			this.setState({cities: cities});
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
		display[i] = this.state.cities[((this.state.page - 1) * 20) + i]
	}

    return (
		<div>
		<Row>
			<Col xs={4}></Col>
			<Col xs	={6}>
			<ButtonToolbar>
				<DropdownButton title="Sort by">
					<MenuItem eventKey="1" onClick={this.changeSort.bind(this, "name")}>Name</MenuItem>
					<MenuItem eventKey="2" onClick={this.changeSort.bind(this, "pop")}>Population</MenuItem>
				</DropdownButton>
				<DropdownButton title="Order">
					<MenuItem eventKey="1" onClick={this.changeOrder.bind(this, "Asc")}>Ascending</MenuItem>
					<MenuItem eventKey="2" onClick={this.changeOrder.bind(this, "Desc")}>Descending</MenuItem>
				</DropdownButton>
				<DropdownButton title="Filter by State">
					<MenuItem eventKey="1" onClick={this.changeState.bind(this, "None")}>None</MenuItem>
					{this.createStates()}
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

export default Cities;
