import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { shallow, mount } from 'enzyme'
import { expect } from 'chai'
import Majors from '../src/js/Majors'



describe('(Component) Majors', () => {
  it('renders...', () => {
	const wrapper = shallow(<Majors />);
    expect(wrapper).to.have.length(1);
  });
  
  it('should have an initial state', function () {
    const wrapper = shallow(<Majors/>);
    expect(wrapper.state().sort).to.equal("name");
    expect(wrapper.state().order).to.equal("Asc");
    expect(wrapper.state().stem).to.equal("None");
    expect(wrapper.state().wage).to.equal("None");
    expect(wrapper.state().loading).to.equal(true);
    expect(wrapper.state().page).to.equal(1);
  });
});
