import React, { Component } from 'react';
import {Image, Grid, Row, Col, Thumbnail, Pagination, ButtonToolbar, DropdownButton, MenuItem} from 'react-bootstrap';
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
        loading: true,
        sort: "name",
        order: "Asc",
        state: "None",
        type: "None"
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
				<Pagination.Item active={number === active} onClick={this.changePage.bind(this, number)}>{number}</Pagination.Item>
			);
		}
	  }
	  else if ((num + 5) > Math.ceil(this.state.colleges.length/20)) {
		for (let number = Math.ceil(this.state.colleges.length/20) - 9; number <= Math.ceil(this.state.colleges.length/20); number++) {
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

    changeSort(sort) {
	  if (sort == "name") {
		  this.setState({sort: "name"});
	  }
	  else {
		  this.setState({sort: "tut"});
	  }
	  fetch('http://127.0.0.1:5000/universities_limited?sort_'+sort+'='+this.state.order+"&state="+this.state.state+"&type="+this.state.type)
	  .then(results => {
		  return results.json();
		}).then(data => {
			let colleges = data.records.map((college) => {
				return(<Card name={college.name} model='colleges' domain={college.image_link} id={college.id} field={college.type} >  </Card>)
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

  changeOrder(order) {
	  if (order == "Asc") {
		  this.setState({order: "Asc"});
	  }
	  else {
		  this.setState({order: "Desc"});
	  }
	  fetch('http://127.0.0.1:5000/universities_limited?sort_'+this.state.sort+'='+order+"&state="+this.state.state+"&type="+this.state.type)
	  .then(results => {
		  return results.json();
		}).then(data => {
			let colleges = data.records.map((college) => {
				return(<Card name={college.name} model='colleges' domain={college.image_link} id={college.id} field={college.type}>  </Card>)
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

  changeState(state) {
	  this.setState({state: state});
	  fetch('http://127.0.0.1:5000/universities_limited?sort_'+this.state.sort+'='+this.state.order+"&state="+state+"&type="+this.state.type)
	  .then(results => {
		  return results.json();
		}).then(data => {
			let colleges = data.records.map((college) => {
				return(<Card name={college.name} model='colleges' domain={college.image_link} id={college.id} field={college.type}>  </Card>)
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

  changeType(type) {
	  this.setState({type: type});
	  fetch('http://127.0.0.1:5000/universities_limited?sort_'+this.state.sort+'='+this.state.order+"&state="+this.state.state+"&type="+type)
	  .then(results => {
		  return results.json();
		}).then(data => {
			let colleges = data.records.map((college) => {
				return(<Card name={college.name} model='colleges' domain={college.image_link} id={college.id} field={college.type}>  </Card>)
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
	   ["Wisconsin", "WI"], ["Wyoming", "WY"]]
	  let items = []
	  for (let i = 0; i < state.length; i++) {
		  items.push(<MenuItem eventKey={i} onClick={this.changeState.bind(this, state[i][1])}>{state[i][0]}</MenuItem>);
	  }
	  return items
  }

  componentDidMount() {
	  fetch('http://127.0.0.1:5000/universities_limited?sort_'+this.state.sort+'='+this.state.order+"&state="+this.state.state+"&type="+this.state.type)
	  .then(results => {
		  return results.json();
		}).then(data => {
			let colleges = data.records.map((college) => {
				return(<Card name={college.name} model='colleges' domain={college.image_link} id={college.id} field={college.type}>  </Card>)
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
		<Row>
			<Col xs={4}></Col>
			<Col xs	={6}>
			<ButtonToolbar>
				<DropdownButton title="Sort by">
					<MenuItem eventKey="1" onClick={this.changeSort.bind(this, "name")}>Name</MenuItem>
					<MenuItem eventKey="2" onClick={this.changeSort.bind(this, "tut")}>In-State Tuition</MenuItem>
				</DropdownButton>
				<DropdownButton title="Order">
					<MenuItem eventKey="1" onClick={this.changeOrder.bind(this, "Asc")}>Ascending</MenuItem>
					<MenuItem eventKey="2" onClick={this.changeOrder.bind(this, "Desc")}>Descending</MenuItem>
				</DropdownButton>
				<DropdownButton title="Filter by State">
					<MenuItem eventKey="1" onClick={this.changeState.bind(this, "None")}>None</MenuItem>
					{this.createStates()}
				</DropdownButton>
				<DropdownButton title="Filter by Type">
					<MenuItem eventKey="0" onClick={this.changeType.bind(this, "None")}>None</MenuItem>
					<MenuItem eventKey="1" onClick={this.changeType.bind(this, "private")}>Private</MenuItem>
					<MenuItem eventKey="2" onClick={this.changeType.bind(this, "public")}>Public</MenuItem>
				</DropdownButton>
			</ButtonToolbar>
			</Col>
		</Row>
		<Grid><Row className="flex-row">{display}</Row></Grid>
		<center><Pagination bsSize="large">{this.state.pages}</Pagination></center>


		</div>
		)
  }
}

export default Colleges;
