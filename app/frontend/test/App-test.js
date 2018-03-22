import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { shallow, mount } from 'enzyme'
import { expect } from 'chai'
import App from '../src/js/App'
import NavigationBar from '../src/js/NavigationBar.js';
import Router from '../src/js/Router.js';



describe('(Component) App', () => {
  it('renders...', () => {
	const wrapper = shallow(<App />);
    expect(wrapper).to.have.length(1);
  });
  
  it('renders a NavigationBar', () => {
	const wrapper = shallow(<App />);
    expect(wrapper.find(NavigationBar)).to.have.length(1);
  });
  
  it('renders a Router', () => {
	const wrapper = shallow(<App />);
    expect(wrapper.find(Router)).to.have.length(1);
  });
});
