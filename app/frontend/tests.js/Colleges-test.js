import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { shallow, mount } from 'enzyme'
import { expect } from 'chai'
import Colleges from '../src/js/Colleges'



describe('(Component) Colleges', () => {
  it('renders...', () => {
	const wrapper = shallow(<Colleges />);
    expect(wrapper).to.have.length(1);
  });
});
