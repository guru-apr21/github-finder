import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Search = ({ setAlert, onSearch, showClear, onClear }) => {
  const [text, setText] = useState('');

  const onChange = (e) => setText(e.target.value);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!text) {
      setAlert(' Please enter something', 'light');
    } else {
      onSearch(text);
      setText('');
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type='text'
          placeholder='Search users...'
          name='text'
          value={text}
          onChange={onChange}
        ></input>
        <button className='btn btn-dark btn-block'>Search</button>
      </form>
      {showClear && (
        <button className='btn btn-light btn-block my-1' onClick={onClear}>
          Clear
        </button>
      )}
    </div>
  );
};

Search.propTypes = {
  onSearch: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  showClear: PropTypes.bool.isRequired,
  setAlert: PropTypes.func.isRequired,
};

export default Search;
