import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { shallow, mount } from 'enzyme'
import { expect } from 'chai'
import NavigationBar from '../src/js/NavigationBar'



describe('(Component) NavigationBar', () => {
  it('renders...', () => {
	const wrapper = shallow(<NavigationBar />);
    expect(wrapper).to.have.length(1);
  });
  
  it('should have an initial state', function () {
    const wrapper = shallow(<NavigationBar/>);
    expect(wrapper.state().search).to.equal("search");
    expect(wrapper.state().redirect).to.equal(false);
    expect(wrapper.state().value).to.equal("");
  });
});
