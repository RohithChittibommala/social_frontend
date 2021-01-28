import React, { createContext, useReducer } from "react";
import { reducer } from "./reducer";
export const intialState = {
  user: {},
  posts: [],
  isFirstLoad: true,
  userPosts: [],
  isAuthenicated: false,
  currentPageCount: 0,
  noOfPostsInDB: 100,
};
export const Store = createContext(intialState);

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, intialState);
  return (
    <Store.Provider value={[state, dispatch]}>{props.children}</Store.Provider>
  );
}
