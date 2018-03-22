import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { shallow, mount } from 'enzyme'
import { expect } from 'chai'
import CollegeInstance from '../src/js/CollegeInstance'



describe('(Component) CollegeInstance', () => {
  it('renders...', () => {
	const wrapper = shallow(<CollegeInstance match={{params:{id:'144005'}}}/>);
    expect(wrapper).to.have.length(1);
  });
});
