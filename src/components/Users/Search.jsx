import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Search extends Component {
  state = {
    text: '',
  };

  static propTypes = {
    onSearch: PropTypes.func.isRequired,
    onClear: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired,
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();

    if (!this.state.text) {
      this.props.setAlert(' Please enter something', 'light');
    } else {
      this.props.onSearch(this.state.text);
      this.setState({ text: '' });
    }
  };

  render() {
    const { showClear, onClear } = this.props;
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input
            type='text'
            placeholder='Search users...'
            name='text'
            value={this.state.text}
            onChange={this.onChange}
          ></input>
          <input
            type='submit'
            value='Search'
            className='btn btn-dark btn-block'
          ></input>
        </form>
        {showClear && (
          <button className='btn btn-light btn-block' onClick={onClear}>
            Clear
          </button>
        )}
      </div>
    );
  }
}

export default Search;
