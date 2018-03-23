import React from 'react'
import { MemoryRouter, Link} from 'react-router-dom'
import { shallow, mount } from 'enzyme'
import { expect } from 'chai'
import {Image} from 'react-bootstrap';
import Top5 from '../src/js/Top5'



describe('(Component) Top5', () => {
  it('renders...', () => {
	const wrapper = shallow(<Top5 />);
    expect(wrapper).to.have.length(1);
  });
  
  it('renders 5 images', () => {
	const wrapper = shallow(<Top5 />);
    expect(wrapper.find(Image)).to.have.length(5);
  });
  
  it('renders 5 links', () => {
	const wrapper = shallow(<Top5 />);
    expect(wrapper.find(Link)).to.have.length(5);
  });
});
