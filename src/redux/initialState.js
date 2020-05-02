export const initialState = {
  posts: {
    data: {},
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