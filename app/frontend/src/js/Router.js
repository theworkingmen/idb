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
import notFound from './error404.js';

class Router extends Component {

  render() {

    return (
      <main>
        <Switch>
          <Route exact path='/' component={Splash}/>
          <Route exact path='/colleges' component={Colleges}/>
          <Route exact path='/colleges/:id' component={CollegeInstance}/>
          <Route exact path='/cities' component={Cities}/>
          <Route exact path='/cities/:id' component={CityInstance}/>
          <Route exact path='/majors' component={Majors}/>
          <Route exact path='/majors/:id' component={MajorInstance}/>
          <Route exact path='/about' component={About}/>
          <Route exact path='/*' component={notFound}/>
        </Switch>
      </main>
    )
  }

}

export default Router;
