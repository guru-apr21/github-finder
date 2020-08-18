import React, { Component, Fragment } from 'react';
import './App.css';
import Axios from 'axios';
import Navbar from './components/layout/Navbar';
import Users from './components/Users/Users';
import Search from './components/Users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import User from './components/Users/User';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

class App extends Component {
  state = {
    users: [],
    repos: [],
    user: {},
    loading: false,
    alert: null,
  };

  //Get users from github api
  onSearch = async (text) => {
    this.setState({ loading: true });

    const {
      data: { items },
    } = await Axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.GITHUB_FINDER_CLIENT_ID}&client_secret=${process.env.GITHUB_FINDER_CLIENT_SECRET}`
    );

    this.setState({
      users: items,
      loading: false,
    });
  };

  //get details of single user from github api
  getUser = async (username) => {
    this.setState({ loading: true });

    const { data } = await Axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.GITHUB_FINDER_CLIENT_ID}&client_secret=${process.env.GITHUB_FINDER_CLIENT_SECRET}`
    );

    this.setState({
      user: data,
      loading: false,
    });
  };

  //Get details of users repos
  getUserRepos = async (username) => {
    this.setState({ loading: true });

    const res = await Axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.GITHUB_FINDER_CLIENT_ID}&client_secret=${process.env.GITHUB_FINDER_CLIENT_SECRET}`
    );

    this.setState({
      repos: res.data,
      loading: false,
    });
  };

  //Clear users state
  onClear = () => this.setState({ users: [], loading: false });

  //Set alert if nothing is given
  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });

    setTimeout(() => {
      this.setState({ alert: null });
    }, 3000);
  };

  render() {
    const { users, loading, user, repos } = this.state;
    return (
      <Router>
        <Fragment>
          <Navbar></Navbar>
          <div className='container'>
            <Alert alert={this.state.alert}></Alert>
            <Switch>
              <Route
                exact
                path='/'
                render={(props) => (
                  <Fragment>
                    <Search
                      onSearch={this.onSearch}
                      onClear={this.onClear}
                      showClear={users.length > 0 ? true : false}
                      setAlert={this.setAlert}
                    ></Search>
                    <Users loading={loading} users={users}></Users>
                  </Fragment>
                )}
              ></Route>
              <Route exact path='/about' component={About}></Route>
              <Route
                exact
                path='/user/:login'
                render={(props) => (
                  <User
                    {...props}
                    user={user}
                    getUser={this.getUser}
                    loading={loading}
                    getUserRepos={this.getUserRepos}
                    repos={repos}
                  ></User>
                )}
              ></Route>
            </Switch>
          </div>
        </Fragment>
      </Router>
    );
  }
}

export default App;
