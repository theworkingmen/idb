import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { shallow, mount } from 'enzyme'
import { expect } from 'chai'
import MembersCard from '../src/js/About/MembersCard'
import christian_pic from '../src/images/authors/christian_pic.jpg';



describe('(Component) MembersCard', () => {
  it('renders...', () => {
	const wrapper = shallow(<MembersCard member={Object.assign({},{
        "name": "Christian Onuogu",
        "role": "Front-End",
        "bio": "I am a sophomore Computer Science major.",
        "photo": christian_pic,
        "commits": 0,
        "issues": 0,
        "number_tests": 29
      })} />);
    expect(wrapper).to.have.length(1);
  });
});
