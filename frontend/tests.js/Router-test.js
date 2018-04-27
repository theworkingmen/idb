import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { shallow, mount } from 'enzyme'
import { expect } from 'chai'
import Router from '../src/js/Router'



describe('(Component) Router', () => {
  it('renders...', () => {
	const wrapper = shallow(<Router />);
    expect(wrapper).to.have.length(1);
  });
});
