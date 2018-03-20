import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import Splash from './Splash.js';
import Colleges from './Colleges.js';
import Cities from './Cities.js';
import Majors from './Majors.js';
import About from './About/About.js';
import MajorInstance from './MajorInstance.js';
import CityInstance from './CityInstance.js';
import CollegeInstance from './CollegeInstance.js';

class Router extends Component {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path='/' component={Splash}/>
          <Route exact path='/colleges' component={Colleges}/>
          <Route exact path='/colleges/:name' component={CollegeInstance}/>
          <Route exact path='/cities' component={Cities}/>
          <Route exact path='/cities/:name' component={CityInstance}/>
          <Route exact path='/majors' component={Majors}/>
          <Route exact path='/majors/:name' component={MajorInstance}/>
          <Route path='/about' component={About}/>
        </Switch>
      </main>
    )
  }

}

export default Router;
