import React, { useState, useContext } from "react";
import GithubContext from "./../../context/github/GithubContext";
import AlertContext from "./../../context/alert/AlertContext";

const Search = () => {
  const [text, setText] = useState("");

  const githubContext = useContext(GithubContext);

  const alertContext = useContext(AlertContext);

  const { searchUsers, onClear, users } = githubContext;

  const showClear = users.length > 0 ? true : false;

  const onChange = (e) => setText(e.target.value);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!text) {
      alertContext.setAlert(" Please enter something", "light");
    } else {
      searchUsers(text);
      setText("");
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Search users..."
          name="text"
          value={text}
          onChange={onChange}
        ></input>
        <button className="btn btn-dark btn-block">Search</button>
      </form>
      {showClear && (
        <button className="btn btn-light btn-block my-1" onClick={onClear}>
          Clear
        </button>
      )}
    </div>
  );
};

export default Search;
