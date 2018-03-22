import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { shallow, mount } from 'enzyme'
import { expect } from 'chai'
import Cities from '../src/js/Cities'



describe('(Component) Cities', () => {
  it('renders...', () => {
	const wrapper = shallow(<Cities />);
    expect(wrapper).to.have.length(1);
  });
});
