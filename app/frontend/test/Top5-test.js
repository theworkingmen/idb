import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { shallow, mount } from 'enzyme'
import { expect } from 'chai'
import Top5 from '../src/js/Top5'



describe('(Component) Top5', () => {
  it('renders...', () => {
	const wrapper = shallow(<Top5 />);
    expect(wrapper).to.have.length(1);
  });
});
