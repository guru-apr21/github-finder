import React, { Component } from 'react';
import UserItem from './UserItem';

export class Users extends Component {
  state = {
    users: [
      {
        id: '1',
        login: 'mojombo',
        avatar: 'https://avatars0.githubusercontent.com/u/1?v=4',
        html_url: 'https://github.com/mojombo',
      },
      {
        id: '2',
        login: 'guru-apr21',
        avatar: 'https://github.com/guru-apr21.png',
        html_url: 'https://github.com/guru-apr21',
      },
      {
        id: '3',
        login: 'geetha-005',
        avatar: 'https://github.com/geetha005.png',
        html_url: 'https://github.com/geetha005',
      },
    ],
  };
  render() {
    return (
      <div style={userStyle}>
        {this.state.users.map((user) => (
          <UserItem key={user.id} user={user}></UserItem>
        ))}
      </div>
    );
  }
}

const userStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3,1fr)',
  gridGap: '1rem',
};

export default Users;
