import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { shallow, mount } from 'enzyme'
import { expect } from 'chai'
import Map from '../src/js/Map'



describe('(Component) Map', () => {
  it('renders...', () => {
	const wrapper = shallow(<Map />);
    expect(wrapper).to.have.length(1);
  });
});
