export const ADD_POST = "ADD_POST";
export const USER_LOGGED_IN = "USER_LOGGED_IN";
export const FETCHED_POSTS = "FETCHED_POSTS";
export const LOGOUT = "LOGOUT";
export const FETCHED_USER_POSTS = "FETCHED_USER_POSTS";
export const DELETE_POST = "DELETE_POST";
export const UPDATE_USER_DATA = "UPDATE_USER_DATA";

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
  type: UPDATE_USER_DATA,
  payload,
});
