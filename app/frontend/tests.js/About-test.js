import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { shallow, mount } from 'enzyme'
import { expect } from 'chai'
import About from '../src/js/About/About'



describe('(Component) About', () => {
  it('renders...', () => {
	const wrapper = shallow(<About />);
    expect(wrapper).to.have.length(1);
  });
});
