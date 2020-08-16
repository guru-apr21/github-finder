import React, { Component } from 'react';
import Axios from 'axios';
import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/Users/Users';
import Search from './components/Users/Search';
import Alert from './components/layout/Alert';

class App extends Component {
  state = {
    users: [],
    loading: false,
    alert: null,
  };

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

  onClear = () => this.setState({ users: [], loading: false });

  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });

    setTimeout(() => {
      this.setState({ alert: null });
    }, 3000);
  };

  render() {
    const { users, loading } = this.state;
    return (
      <React.Fragment>
        <Navbar></Navbar>
        <div className='container'>
          <Alert alert={this.state.alert}></Alert>
          <Search
            onSearch={this.onSearch}
            onClear={this.onClear}
            showClear={users.length > 0 ? true : false}
            setAlert={this.setAlert}
          ></Search>
          <Users loading={loading} users={users}></Users>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
