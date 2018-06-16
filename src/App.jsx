import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import Navbar from './components/common/navbar'
import SideNav from './components/common/sidenav'

import Home from './components/home'
import About from './components/about'

import AddNewPatient              from './components/patients/AddNewPatient'
import Patients                   from './components/patients/Patients'
import AddDrugToPrescription      from './components/prescriptions/AddDrugToPrescription'
import HandlePrescriptions        from './components/prescriptions/HandlePrescriptions'
import AddPharmacists             from './components/pharmacists/AddPharmacist'
import ViewPharmacists            from './components/pharmacists/pharmacists'
import ViewReports                from './components/reports/reports'
import LoginServices              from './components/loginService/loginService'
import PrintReport                from './components/reports/genReport'
import AddReport                  from './components/reports/reports'

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
              <Route path="/registerPharmacist" render = { props=>{
                return <AddPharmacists/>
              }}/>
              <Route path="/viewPharmacists" render = { props=>{
                return <ViewPharmacists/>
              }}/>
              <Route path="/reports" render = { props=>{
                return <ViewReports/>
              }}/>
              <Route path="/login" render = { props=>{
                return <LoginServices/>
              }}/>
              <Route path="/printReport" render = { props=>{
                return <PrintReport  />
              }}/>
              <Route path="/addReport" render = { props=>{
                return <AddReport/>
              }}/>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
