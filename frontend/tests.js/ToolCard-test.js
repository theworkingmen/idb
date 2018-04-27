import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { shallow, mount } from 'enzyme'
import { expect } from 'chai'
import ToolCard from '../src/js/About/ToolCard'



describe('(Component) ToolCard', () => {
  it('renders...', () => {
	const wrapper = shallow(<ToolCard />);
    expect(wrapper).to.have.length(1);
  });
});
