import React from 'react';
import { shallow } from 'enzyme';
import { PostComponent } from './Post';

const mockProps = {
  post: {
    id: 1,
    content: 'TIDAL Premium subsription for 1 year. Great sound quality, hours of good music, check it out',
    title: 'title',
    location: 'lodz',
    image: 'https://loremflickr.com/400/200/landscape,Turkey/all?lock=1',
    published: 'today',
    updated: 'today',
    email: 'john.doe@example.com',
    phone: '5683573746',
    price: '50.00',
  },
  user: {
    authenticated: true,
  },
};


describe('Component Post', () => {
  it('should render without crashing', () => {
    const component = shallow(<PostComponent {...mockProps} />);
    expect(component).toBeTruthy();
  });
});