// import posts from '../db.json';

export const initialState = {
  posts: {
    data: [],
    loading: {
      active: false,
      error: false,
    },
  },
  user: {
    id: '5e7726c41c9d440000a2674f',
    rights: 'admin',
    authenticated: true,
  },
};
