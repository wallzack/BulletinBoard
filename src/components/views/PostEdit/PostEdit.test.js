import React from 'react';
import { shallow } from 'enzyme';
import { PostEditComponent } from './PostEdit';

const mockProps = {
  post: {
    id: 1,
    content: 'TIDAL Premium subsription for 1 year. Great sound quality, hours of good music, check it out',
    title: 'title',
    location: 'lodz',
    image: 'https://loremflickr.com/400/200/landscape,Turkey/all?lock=1',
    email: 'john.doe@example.com',
    phone: '5683573746',
    price: '50.00',
  },
  user: {
    authenticated: true,
  },
};

describe('Component PostEdit', () => {
  it('should render without crashing', () => {
    const component = shallow(<PostEditComponent {...mockProps} />);
    expect(component).toBeTruthy();
  });
});