import React, { Component } from 'react'
import { Nav, NavText, SideNav } from 'react-sidenav';
import { Link } from 'react-router-dom';

export default class SideNavbar extends Component {
  render() {
    return (
      <div style={{background: '#2c3e50', color: '#FFF', width: 220}}>
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
          <Nav id='dispenseDrugs'>
            <NavText><Link to="/dispenseDrugs"> Dispense Drugs </Link></NavText>
          </Nav>
        </SideNav>
      </div>
    )
  }
}

