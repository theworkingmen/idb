import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { shallow, mount } from 'enzyme'
import { expect } from 'chai'
import error404 from '../src/js/error404'



describe('(Component) error404', () => {
  it('renders...', () => {
	const wrapper = shallow(<error404 />);
    expect(wrapper).to.have.length(1);
  });
});
