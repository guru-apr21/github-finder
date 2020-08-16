import React from 'react';
import UserItem from './UserItem';
import PropTypes from 'prop-types';
import Spinner from './../layout/Spinner';

const Users = ({ users, loading }) => {
  if (loading) return <Spinner></Spinner>;
  else
    return (
      <div className='grid-3'>
        {users.map((user) => (
          <UserItem key={user.id} user={user}></UserItem>
        ))}
      </div>
    );
};

Users.propTypes = {
  users: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default Users;
