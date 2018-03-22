import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { shallow, mount } from 'enzyme'
import { expect } from 'chai'
import MajorInstance from '../src/js/MajorInstance'



describe('(Component) MajorInstance', () => {
  it('renders...', () => {
	const someData = {params:'test'};
	const wrapper = shallow(<MemoryRouter><MajorInstance match={someData}/></MemoryRouter>);
    expect(wrapper).to.have.length(1);
  });
});
