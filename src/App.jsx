import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import Navbar from './components/common/navbar'
import SideNav from './components/common/sidenav'

import Home from './components/home'
import About from './components/about'
import Order from './components/orders/newOrder'
import ViewOrder from './components/orders/viewOrder'
import ViewSupplier from './components/supplier/viewSuppliers'
import AddSupplier from './components/supplier/addSupplier'
import ViewStock from './components/inventory/viewStock'
import UpdateStock from './components/inventory/updateStock'


import AddNewPatient              from './components/patients/AddNewPatient'
import Patients                   from './components/patients/Patients'
import AddDrugToPrescription      from './components/prescriptions/AddDrugToPrescription'
import HandlePrescriptions        from './components/prescriptions/HandlePrescriptions'
import AddPharmacists             from './components/pharmacists/AddPharmacist'
import ViewPharmacists            from './components/pharmacists/pharmacists'
import ViewReports                from './components/reports/reports'
import LoginServices              from './components/loginService/loginService'
import AddNewPatient from './components/patients/AddNewPatient'
import Patients from './components/patients/Patients'
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
                return <Home />
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
              <Route path="/orders" render={props => {
                return <Order />
              }} />
              <Route path="/dispenseDrugs" render={props => {
                return <HandlePrescriptions />
              }} />
                <Route path="/newOrder" render={props => {
                    return <Order />
                }} />

                <Route path="/viewOrder" render={props => {
                    return <ViewOrder />
                }} />

                <Route path="/viewSupplier" render={props => {
                    return <ViewSupplier />
                }} />
                <Route path="/addSupplier" render={props => {
                    return <AddSupplier />
                }} />

                <Route path="/ViewStock" render={props => {
                    return <ViewStock />
                }} />
                <Route path="/UpdateStock" render={props => {
                    return <UpdateStock />
                }} />


            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
