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
});
