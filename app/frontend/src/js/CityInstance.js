import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import {Image} from 'react-bootstrap';
import InstanceTitle from './InstanceTitle.js';
import Map from './Map.js';
import '../css/App.css';
import cityData from '../scrapers/cities.json'

class CityInstance extends Component {

	
	
	render() {
		return (
		    <div className="container" style={{background:'white'}}>
		       <InstanceTitle name={cityData[this.props.match.params.index].city_name}/>
		       <center><Image src={cityData[this.props.match.params.index].city_image} style={{width:"18em", height:"19em"}} onError={(e)=>{e.target.src="https://goo.gl/NvPJj6"}}/></center>
		       <p id="population"> Population: {cityData[this.props.match.params.index].population_in_county}  </p>
		       <p id="med_income"> Median Income: ${cityData[this.props.match.params.index].median_household_income_in_county} </p>
		       <p id="unemployment rate"> Unemployment Rate: {cityData[this.props.match.params.index].violent_crime_in_county} </p>
		       <p id="college_education_rate"> College Education Rate: {cityData[this.props.match.params.index].people_with_college_education_in_county} </p>
		       <p id="high_school_graduation_rate"> High School Graduation Rate: {cityData[this.props.match.params.index].high_school_graduation_rate_in_county} </p>
		       <p id="crime_rate"> Violent Crime Rate per 100,000 people per year: {cityData[this.props.match.params.index].violent_crime_in_county} </p>
		       <p id="primary_care_physicians"> Number of People per Primary Care Physician: {cityData[this.props.match.params.index].primary_care_physicians_in_county} </p>
		       <p id="motor_vehicle_deaths"> Motor Vehicle Deaths per 100,000 people per year: {cityData[this.props.match.params.index].motor_vehicle_crash_deaths_in_county} </p>
		          
		    </div>
		);
	}
}

export default CityInstance;
