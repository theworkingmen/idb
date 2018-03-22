import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { shallow, mount } from 'enzyme'
import { expect } from 'chai'
import Card from '../src/js/Card'



describe('(Component) Card', () => {
  it('renders...', () => {
	const wrapper = shallow(<Card />);
    expect(wrapper).to.have.length(1);
  });
});
