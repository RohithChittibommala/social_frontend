import {
  ADD_POST,
  FETCHED_POSTS,
  LOGOUT,
  USER_LOGGED_IN,
  FETCHED_USER_POSTS,
  DELETE_POST,
  UPDATE_USER_PROFILE,
  UPDATE_POST_DATA,
  UPDATE_TOTAL_POST_COUNT,
  UPDATE_POST_PAGE_COUNT,
  UPDATE_USER_POST,
} from "./actionTypes";
import { intialState } from "./Store";

export const reducer = (state, action = {}) => {
  switch (action.type) {
    case USER_LOGGED_IN:
      return {
        ...state,
        user: action.payload,
        isAuthenicated: action.payload?.isVerified,
        isFirstLoad: false,
      };
    case ADD_POST:
      return {
        ...state,
        posts: [...state.posts, action.payload],
        userPosts: [...state.userPosts, action.payload],
      };
    case LOGOUT:
      return intialState;
    case FETCHED_POSTS:
      return { ...state, posts: state.posts.concat(action.payload) };
    case FETCHED_USER_POSTS:
      return { ...state, userPosts: action.payload };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post?._id !== action.payload),
        userPosts: state.userPosts.filter(
          (post) => post._id !== action.payload
        ),
      };
    case UPDATE_USER_PROFILE:
      return { ...state, user: action.payload };
    case UPDATE_POST_DATA:
      return (() => {
        const postIndex = state.posts.findIndex(
          (post) => post._id === action.payload?._id
        );
        const newPosts = [...state.posts];
        newPosts[postIndex] = action.payload;
        return { ...state, posts: newPosts };
      })();

    case UPDATE_TOTAL_POST_COUNT:
      return { ...state, noOfPostsInDB: action.payload };
    case UPDATE_POST_PAGE_COUNT:
      return { ...state, currentPageCount: state.currentPageCount + 1 };
    case UPDATE_USER_POST:
      return (() => {
        const postIndex = state.userPosts.findIndex(
          (post) => post._id === action.payload?._id
        );
        const newPosts = [...state.userPosts];
        newPosts[postIndex] = action.payload;
        return { ...state, userPosts: newPosts };
      })();
    default:
      return state;
  }
};
