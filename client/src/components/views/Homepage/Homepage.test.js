import React from 'react';
import { shallow } from 'enzyme';
import { HomepageComponent } from './Homepage';

const now = new Date();
const mockProps = {
  user: {
    authenticated: false,
  },
  posts: [
    {
      id: 1,
      title: 'title',
      location: 'lodz',
      image: 'https://loremflickr.com/400/200/landscape,Turkey/all?lock=1',
      published: now,
    },
  ],
  loadPosts: () => console.log('func'),
};

describe('Component Homepage', () => {
  it('should render without crashing', () => {
    const component = shallow(<HomepageComponent {...mockProps} />);
    expect(component).toBeTruthy();
  });
});
