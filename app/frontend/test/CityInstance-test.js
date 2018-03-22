import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { shallow, mount } from 'enzyme'
import { expect } from 'chai'
import CityInstance from '../src/js/CityInstance'



describe('(Component) CityInstance', () => {
  it('renders...', () => {
	const someData = {params:'test'};
	const wrapper = shallow(<MemoryRouter><CityInstance match={someData}/></MemoryRouter>);
    expect(wrapper).to.have.length(1);
  });
});
