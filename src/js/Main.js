import React from 'react';
import { Switch, Route } from 'react-router-dom'
import Splash from './Splash.js';
import Colleges from './Colleges.js';
import Cities from './Cities.js';
import Majors from './Majors.js';
import About from './About.js';
import MajorInstance from './MajorInstance.js';

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Splash}/>
      <Route path='/colleges' component={Colleges}/>
      <Route path='/cities' component={Cities}/>
      <Route exact path='/majors' component={Majors}/>
      <Route exact path='/majors/:name' component={MajorInstance}/>
      <Route path='/about' component={About}/>
    </Switch>
  </main>
);

export default Main;
