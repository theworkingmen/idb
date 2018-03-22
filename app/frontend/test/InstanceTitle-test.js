import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { shallow, mount } from 'enzyme'
import { expect } from 'chai'
import InstanceTitle from '../src/js/InstanceTitle'



describe('(Component) InstanceTitle', () => {
  it('renders...', () => {
	const wrapper = shallow(<InstanceTitle />);
    expect(wrapper).to.have.length(1);
  });
});
