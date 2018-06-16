import React, { Component } from 'react'
import { Nav, NavText, SideNav } from 'react-sidenav';
import { Link } from 'react-router-dom';

export default class SideNavbar extends Component {
  render() {
    return (
      <div style={{background: '#2c3e50', color: '#FFF', width: 220}} id="navPaneLeft" hidden>
        <SideNav highlightColor='black' highlightBgColor='#00bcd4' defaultSelected='home'>
          <Nav id='home'>
            <NavText><Link to="/"> Home </Link></NavText>
          </Nav>
          <Nav id='patients'>
            <NavText> Patients </NavText>
            <Nav id='addNewPatient'>
              <NavText><Link to="/addNewPatient"> Add New Patient </Link></NavText>
            </Nav>
            <Nav id='viewAllPatients'>
              <NavText><Link to="/viewPatients"> View Patients </Link></NavText>
            </Nav>
          </Nav>
          <Nav id='products'>
            <NavText>  Products </NavText>
          </Nav>
          <Nav id='pharmacists'>
            <NavText> Pharmacists </NavText>
            <Nav id='registerPharmacist'>
              <NavText><Link to = "/registerPharmacist">Register Pharmacist</Link></NavText>
            </Nav>
            <Nav id='viewPharmacists'>
              <NavText><Link to = "/viewPharmacists">View Pharmacists</Link></NavText>
            </Nav>
          </Nav>
          <Nav id="reports">
            <NavText><Link to = "/printReport">Reports</Link></NavText>
          </Nav>
          <Nav id="reports">
            <NavText><Link to = "/addReport">Add Report</Link></NavText>
          </Nav>
        </SideNav>
      </div>
    )
  }
}

