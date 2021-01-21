import {
  ADD_POST,
  FETCHED_POSTS,
  LOGOUT,
  USER_LOGGED_IN,
  FETCHED_USER_POSTS,
  DELETE_POST,
  UPDATE_USER_DATA,
} from "./actionTypes";
import { intialState } from "./Store";

export const reducer = (state, action) => {
  switch (action.type) {
    case USER_LOGGED_IN:
      return { ...state, user: action.payload, isAuthenicated: true };
    case ADD_POST:
      return {
        ...state,
        posts: [...state.posts, action.payload],
        userPosts: [...state.userPosts, action.payload],
      };
    case LOGOUT:
      return intialState;
    case FETCHED_POSTS:
      return { ...state, posts: action.payload };
    case FETCHED_USER_POSTS:
      return { ...state, userPosts: action.payload };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
        userPosts: state.userPosts.filter(
          (post) => post._id !== action.payload
        ),
      };
    case UPDATE_USER_DATA:
      return { ...state, user: action.payload };
    default:
      return state;
  }
};
