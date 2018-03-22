import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { shallow, mount } from 'enzyme'
import { expect } from 'chai'
import Chart from '../src/js/Chart'



describe('(Component) Chart', () => {
  it('renders...', () => {
	const wrapper = shallow(<Chart />);
    expect(wrapper).to.have.length(1);
  });
});
