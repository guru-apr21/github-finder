import React, { Component } from 'react';

class UserItem extends Component {
  render() {
    const { avatar, html_url, login } = this.props.user;
    return (
      <div className='card text-center'>
        <img src={avatar} className='round-img' style={{ width: '60px' }}></img>

        <h3>{login}</h3>
        <div>
          <a href={html_url} className='btn btn-dark btn-sm my-1'>
            More
          </a>
        </div>
      </div>
    );
  }
}

export default UserItem;