import React, { useReducer } from "react";
import GithubContext from "./GithubContext";
import Axios from "axios";
import GithubReducer from "./GithubReducer";
import {
  GET_REPOS,
  GET_USER,
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
} from "../types";

let githubCLientId;
let githubClientSecret;

if (process.env.NODE_ENV !== "production") {
  githubCLientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
  githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
  githubCLientId = process.env.GITHUB_CLIENT_ID;
  githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}
const GithubState = (props) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  //Search Users
  const searchUsers = async (text) => {
    setLoading();

    const {
      data: { items },
    } = await Axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${githubCLientId}&client_secret=${githubClientSecret}`
    );

    dispatch({
      type: SEARCH_USERS,
      payload: items,
    });
  };

  //Get details of single users
  const getUser = async (username) => {
    setLoading();

    const { data } = await Axios.get(
      `https://api.github.com/users/${username}?client_id=${githubCLientId}&client_secret=${githubClientSecret}`
    );

    dispatch({
      type: GET_USER,
      payload: data,
    });
  };

  //Get details of user's repos
  const getUserRepos = async (username) => {
    setLoading();

    const { data } = await Axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${githubCLientId}&client_secret=${githubClientSecret}`
    );

    dispatch({
      type: GET_REPOS,
      payload: data,
    });
  };

  //Clear users state
  const onClear = () => {
    dispatch({ type: CLEAR_USERS });
  };

  //Set loading in state
  const setLoading = () => {
    dispatch({ type: SET_LOADING });
  };

  return (
    <GithubContext.Provider
      value={{
        user: state.user,
        users: state.users,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        getUser,
        getUserRepos,
        onClear,
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
