import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { shallow, mount } from 'enzyme'
import { expect } from 'chai'
import Splash from '../src/js/Splash'



describe('(Component) Splash', () => {
  it('renders...', () => {
	const wrapper = shallow(<Splash />);
    expect(wrapper).to.have.length(1);
  });
});
