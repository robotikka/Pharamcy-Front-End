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
            <Nav id='viewAllPatients'>
              <NavText><Link to="/viewPatients"> View Patients </Link></NavText>
            </Nav>
            <Nav id='addNewPatient'>
              <NavText><Link to="/addNewPatient"> Add New Patient </Link></NavText>
            </Nav>
          </Nav>

          <Nav id='drugs'>
            <NavText> Drugs </NavText>
            <Nav id='addNewDrug'>
              <NavText><Link to="/addNewDrug"> Add New Drug </Link></NavText>
            </Nav>
            <Nav id='viewmanageDrugs'>
              <NavText><Link to="/manageDrugs"> Manage Drugs </Link></NavText>
            </Nav>
          </Nav>

          <Nav id='dispenseDrugs'>
            <NavText><Link to="/dispenseDrugs"> Dispense Drugs </Link></NavText>
          </Nav>
          <Nav id='pharmacists'>
            <NavText> Pharmacists </NavText>
            <Nav id='registerPharmacist'>
              <NavText><Link to = "/registerPharmacist">Register Pharmacist</Link></NavText>
            </Nav>
            <Nav id='viewPharmacists'>
              <NavText><Link to = "/viewPharmacists">Manage Pharmacists</Link></NavText>
            </Nav>
          </Nav>
          <Nav id='Reports'>
            <NavText> Reports </NavText>
            <Nav id="reports">
              <NavText><Link to = "/printReports">Print Reports</Link></NavText>
            </Nav>
            <Nav id="addreports">
              <NavText><Link to = "/addReport">Add Report</Link></NavText>
            </Nav>
            </Nav>



          <Nav id='orders'>
            <NavText> Orders </NavText>
            <Nav id='newOrder'>
              <NavText><Link to="/newOrder">New Order </Link></NavText>
            </Nav>
            <Nav id='viewOrder'>
              <NavText><Link to="/viewOrder"> View Orders</Link></NavText>
            </Nav>
          </Nav>

          <Nav id='supplier'>
            <NavText> Supplier </NavText>
            <Nav id='viewSupplier'>
              <NavText><Link to="/viewSupplier">Add Supplier </Link></NavText>
            </Nav>
            <Nav id='addSupplier'>
              <NavText><Link to="/addSupplier"> View Suppliers</Link></NavText>
            </Nav>
          </Nav>

          <Nav id='inventory'>
            <NavText> Inventory </NavText>
            <Nav id='viewStock'>
              <NavText><Link to="/viewStock">View Stock</Link></NavText>
            </Nav>
            <Nav id='updateStock'>
              <NavText><Link to="/updateStock">Update Stock</Link></NavText>
            </Nav>
          </Nav>

        </SideNav>
      </div>
    )
  }
}

