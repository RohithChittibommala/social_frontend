import {
  ADD_POST,
  FETCHED_POSTS,
  LOGOUT,
  USER_LOGGED_IN,
  FETCHED_USER_POSTS,
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
    default:
      return state;
  }
};
