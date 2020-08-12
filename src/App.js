import React, { Component } from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/Users/Users';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar></Navbar>
        <div className='container'>
          <Users></Users>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
