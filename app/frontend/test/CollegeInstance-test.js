import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { shallow, mount } from 'enzyme'
import { expect } from 'chai'
import CollegeInstance from '../src/js/CollegeInstance'



describe('(Component) CollegeInstance', () => {
  it('renders...', () => {
	const someData = {params:'test'};
	const wrapper = shallow(<MemoryRouter><CollegeInstance match={someData} /></MemoryRouter>);
    expect(wrapper).to.have.length(1);
  });
});
