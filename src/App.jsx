import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import Navbar from './components/common/navbar'
import SideNav from './components/common/sidenav'

import Home from './components/home'
import About from './components/about'
import Order from './components/order'

import AddNewPatient from './components/patients/AddNewPatient'
import Patients from './components/patients/Patients'
import AddDrugToPrescription from './components/prescriptions/AddDrugToPrescription'
import HandlePrescriptions from './components/prescriptions/HandlePrescriptions'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ width: 220 }}>
              <SideNav />
            </div>
            <div style={{ padding: 20 }}>
              <Route exact path="/" render={props => {
                return <HandlePrescriptions />
              }} />
              <Route path="/addNewPatient" render={props => {
                return <AddNewPatient />
              }} />
              <Route path="/viewPatients" render={props => {
                return <Patients />
              }} />
                <Route path="/orders" render={props => {
                    return <Order />
                }} />

            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
