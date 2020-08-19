import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import { Repos } from '../repos/Repos';
import PropTypes from 'prop-types';

export class User extends Component {
  componentDidMount() {
    this.props.getUser(this.props.match.params.login);
    this.props.getUserRepos(this.props.match.params.login);
  }

  static propTypes = {
    getUser: PropTypes.func.isRequired,
    getUserRepos: PropTypes.func.isRequired,
    repos: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
  };

  render() {
    const {
      name,
      login,
      html_url,
      avatar_url,
      company,
      bio,
      blog,
      hireable,
      loaction,
      followers,
      following,
      public_repos,
      public_gists,
    } = this.props.user;

    const { loading, repos } = this.props;

    if (loading) return <Spinner></Spinner>;

    return (
      <Fragment>
        <Link to='/' className='btn btn-light'>
          Back To Search
        </Link>
        Hireable:{' '}
        {hireable ? (
          <i className='fa fa-check text-success'></i>
        ) : (
          <i className='fa fa-times-circle text-danger'></i>
        )}
        <div className='card grid-2'>
          <div className='all-center'>
            <img
              src={avatar_url}
              alt='avatar'
              className='round-img'
              style={{ width: '150px' }}
            ></img>
            <h1>{name}</h1>
            <p>Location: {loaction || '-'}</p>
          </div>
          <div>
            {bio && (
              <Fragment>
                <h3>Bio</h3>
                <p>{bio}</p>
              </Fragment>
            )}
            <a href={html_url} className='btn btn-dark my-1'>
              Visit Github profile
            </a>
            <ul>
              <li>{login && <Fragment>Login: {login}</Fragment>}</li>
              <li>{company && <Fragment>Company: {company}</Fragment>}</li>
              <li>
                {blog && (
                  <Fragment>
                    Website: <a href={blog}>{blog}</a>
                  </Fragment>
                )}
              </li>
            </ul>
          </div>
        </div>
        <div className='card text-center'>
          <div className='badge badge-primary'>Followers:{followers}</div>
          <div className='badge badge-success'>Following:{following}</div>
          <div className='badge badge-danger'>Public Repos:{public_repos}</div>
          <div className='badge badge-light'>Public Gists:{public_gists}</div>
        </div>
        <Repos repos={repos}></Repos>
      </Fragment>
    );
  }
}

export default User;
