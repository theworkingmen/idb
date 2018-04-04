import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { shallow, mount } from 'enzyme'
import { expect } from 'chai'
import Search from '../src/js/Search'



describe('(Component) Search', () => {
  it('renders...', () => {
	const wrapper = shallow(<Search match={{params:{id:'Texas'}}}/>);
    expect(wrapper).to.have.length(1);
  });
});
