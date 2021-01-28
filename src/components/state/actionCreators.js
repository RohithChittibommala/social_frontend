import {
  ADD_POST,
  DELETE_POST,
  FETCHED_POSTS,
  FETCHED_USER_POSTS,
  LOGOUT,
  UPDATE_POST_DATA,
  UPDATE_TOTAL_POST_COUNT,
  UPDATE_USER_PROFILE,
  USER_LOGGED_IN,
  UPDATE_POST_PAGE_COUNT,
  UPDATE_USER_POST,
} from "./actionTypes";

export const userLoggedIn = (payload) => ({
  type: USER_LOGGED_IN,
  payload,
});

export const fetchedPosts = (payload) => ({
  type: FETCHED_POSTS,
  payload,
});

export const logoutUser = () => ({
  type: LOGOUT,
});

export const fetchedUserPosts = (payload) => ({
  type: FETCHED_USER_POSTS,
  payload,
});

export const addNewPost = (payload) => ({
  type: ADD_POST,
  payload,
});

export const deletePost = (payload) => ({
  type: DELETE_POST,
  payload,
});

export const updateUserData = (payload) => ({
  type: UPDATE_USER_PROFILE,
  payload,
});

export const updatePostData = (payload) => ({
  type: UPDATE_POST_DATA,
  payload,
});
export const updateTotalNoOfPosts = (payload) => ({
  type: UPDATE_TOTAL_POST_COUNT,
  payload,
});
export const updateCurrentPageCount = (payload) => ({
  type: UPDATE_POST_PAGE_COUNT,
  payload,
});

export const updateUserPost = (payload) => ({
  type: UPDATE_USER_POST,
  payload,
});
