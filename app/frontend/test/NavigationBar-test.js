import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { shallow, mount } from 'enzyme'
import { expect } from 'chai'
import NavigationBar from '../src/js/NavigationBar'



describe('(Component) NavigationBar', () => {
  it('renders...', () => {
	const wrapper = shallow(<NavigationBar />);
    expect(wrapper).to.have.length(1);
  });
});
