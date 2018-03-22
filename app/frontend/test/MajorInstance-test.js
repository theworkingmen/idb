import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { shallow, mount } from 'enzyme'
import { expect } from 'chai'
import MajorInstance from '../src/js/MajorInstance'



describe('(Component) MajorInstance', () => {
  it('renders...', () => {
	const wrapper = shallow(<MajorInstance match={{params:{id:'0101'}}}/>);
    expect(wrapper).to.have.length(1);
  });
});
