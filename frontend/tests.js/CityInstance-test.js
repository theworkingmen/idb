import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { shallow, mount } from 'enzyme'
import { expect } from 'chai'
import CityInstance from '../src/js/CityInstance'



describe('(Component) CityInstance', () => {
  it('renders...', () => {
	const wrapper = shallow(<CityInstance match={{params:{id:'31000US38540'}}}/>);
    expect(wrapper).to.have.length(1);
  });
});
