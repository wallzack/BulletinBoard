import axios from 'axios';
import { API_URL } from '../config';

/* selectors */
export const getAll = ({ posts }) => posts.data;

export const getPostById = ({ posts }, postId) => {
  const filteredPost = posts.data.filter(post => post._id === postId);
  return filteredPost.length ? filteredPost[0] : { error: true };
};

export const getPostsByUser = ({ posts, user }) => {
  const usersPost = posts.data.filter(post => post.user === user.id);
  return usersPost;
};

/* action name creator */
const reducerName = 'posts';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const FETCH_START = createActionName('FETCH_START');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const FETCH_ERROR = createActionName('FETCH_ERROR');
const ADD_POST = createActionName('ADD_POST');
const UPDATE_POST = createActionName('UPDATE_POST');

/* action creators */
export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });
export const addPost = payload => ({ payload, type: ADD_POST });
export const updatePost = payload => ({ payload, type: UPDATE_POST });

/* thunk creators */
export const loadPostsRequest = (/* { posts } */) => {
  /* if (!posts || !posts.data && !posts.loading.active) { */
  return async dispatch => {
    dispatch(fetchStarted());
    try {
      let res = await axios.get(`${API_URL}/posts`);
      dispatch(fetchSuccess(res.data));
    } catch (e) {
      dispatch(fetchError(e.message || true));
    }
  };
  /* } */
};

export const addPostRequest = (data) => {
  return async dispatch => {
    dispatch(fetchStarted());
    try {
      let res = await axios.post(
        `${API_URL}/posts`,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      dispatch(addPost(res.data));
    } catch (e) {
      dispatch(fetchError(e.message));
    }
  };
};

export const updatePostRequest = (id, data) => {
  return async dispatch => {
    dispatch(fetchStarted());
    try {
      let res = await axios.put(
        `${API_URL}/post/${id}`,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      dispatch(updatePost(res.data));
    } catch (e) {
      dispatch(fetchError(e.message));
    }
  };
};

/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case FETCH_START: {
      return {
        ...statePart,
        loading: {
          active: true,
          error: false,
        },
      };
    }
    case FETCH_SUCCESS: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        data: action.payload,
      };
    }
    case FETCH_ERROR: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: action.payload,
        },
      };
    }
    case ADD_POST: {
      return {
        ...statePart,
        data: [...statePart.data, { ...action.payload }],
        loading: {
          active: false,
          error: false,
        },
      };
    }
    case UPDATE_POST: {
      return {
        ...statePart,
        data: [
          statePart.data.map(
            post => post._id === action.payload._id ? action.payload : post
          )],
        loading: {
          active: false,
          error: false,
        },
      };
    }
    default:
      return statePart;
  }
};