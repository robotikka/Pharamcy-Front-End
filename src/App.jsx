import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import Navbar from './components/common/navbar'
import SideNav from './components/common/sidenav'

import Home from './components/home'
import About from './components/about'

class App extends Component {
  render() {
    return (
      <Router>
        {/* <div>
          <div>
          <Route exact path="/" render={props => {
            return <Home />
          }} />
          <Route path="/about" render={props => {
            return <About />
          }} />
          </div>
        </div> */}
        <div>
        <Navbar />
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={{ width: 220 }}>
            <SideNav />
          </div>
          <div style={{ padding: 20 }}>
            <Route exact path="/" render={props => {
              return <Home />
            }} />
            <Route path="/about" render={props => {
              return <About />
            }} />
          </div>
        </div>
        </div>
      </Router>
    );
  }
}

export default App;
