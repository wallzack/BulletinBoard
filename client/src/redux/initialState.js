import posts from '../db.json';

export const initialState = {
  posts: {
    data: posts,
    loading: {
      active: false,
      error: false,
    },
  },
  user: {
    rights: '',
    authenticated: true,
  },
};