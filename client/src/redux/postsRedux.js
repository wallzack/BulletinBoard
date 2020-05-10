import axios from 'axios';
import { API_URL } from '../config';

/* selectors */
export const getAll = ({ posts }) => posts.data;

export const getPostById = ({ posts }, postId) => {
  const filteredPost = posts.data.filter(post => post.id == postId);
  return filteredPost.length ? filteredPost[0] : { error: true };
};

/* action name creator */
const reducerName = 'posts';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const FETCH_START = createActionName('FETCH_START');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const FETCH_ERROR = createActionName('FETCH_ERROR');
const ADD_POST = createActionName('ADD_POST');
const LOAD_POSTS = createActionName('LOAD_POSTS');

/* action creators */
export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });
export const addPost = payload => ({ payload, type: ADD_POST });
export const loadPosts = payload => ({ payload, type: LOAD_POSTS });

/* thunk creators */
export const loadPostsRequest = () => {
  return async dispatch => {

    dispatch(fetchStarted({ name: LOAD_POSTS }));
    try {
      let res = await axios.get(`${API_URL}/`);

      dispatch(loadPosts(res.data));
      dispatch(fetchSuccess({ name: LOAD_POSTS }));

    } catch (e) {
      dispatch(fetchError({ name: LOAD_POSTS, error: e.message }));
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
    default:
      return statePart;
  }
};