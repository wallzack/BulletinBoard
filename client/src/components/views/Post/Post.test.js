import React from 'react';
import { shallow } from 'enzyme';
import { PostComponent } from './Post';

const now = new Date();
const mockProps = {
  post: {
    id: 1,
    content: 'TIDAL Premium subsription for 1 year. Great sound quality, hours of good music, check it out',
    title: 'title',
    location: 'lodz',
    user: {
      id: 'jgg49j64hndfH75',
    },
    image: 'https://loremflickr.com/400/200/landscape,Turkey/all?lock=1',
    published: now,
    updated: now,
    email: 'john.doe@example.com',
    phone: '5683573746',
    price: '50.00',
    status: 'Published',
  },
  user: {
    authenticated: true,
    id: 'jgg49j64hndfH75',
  },
};


describe('Component Post', () => {
  it('should render without crashing', () => {
    const component = shallow(<PostComponent {...mockProps} />);
    expect(component).toBeTruthy();
  });
});
