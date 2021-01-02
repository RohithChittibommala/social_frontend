import React, { useReducer } from "react";
export const ADD_POST = "ADD_POST";
export const intialState = {
  posts: [],
  userPosts: [],
};

export const userReducer = (state, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        posts: [...state.posts, action.payload],
        userPosts: [...state.userPosts, action.payload],
      };
    default:
      return state;
  }
};
