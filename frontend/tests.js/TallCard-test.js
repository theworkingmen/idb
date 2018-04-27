import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { shallow, mount } from 'enzyme'
import { expect } from 'chai'
import TallCard from '../src/js/TallCard'



describe('(Component) TallCard', () => {
  it('renders...', () => {
	const wrapper = shallow(<TallCard name="test" highlight={["test"]}/>);
    expect(wrapper).to.have.length(1);
  });
});
