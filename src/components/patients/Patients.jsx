import React, { Component } from 'react'
import { Table, Button } from 'react-bootstrap';
import axios from 'axios';

export default class Patients extends Component {
  constructor() {
    super()

    this.state = {
      patients: []
    }

    this.getPaitents();
  }

  componentWillMount() {
    this.getPaitents()
  }

  getPaitents() {
    axios.get('http://localhost:3001/patients').then(res => {
      this.setState({
        patients: res.data.patients
      })
    })
  }

  render() {
    let patients = this.state.patients.map(patient => {
      console.log(patient)
      return (
        <tr key={patient._id}>
          <td>{patient.name}</td>
          <td>{patient.address}</td>
          <td>{patient.NIC}</td>
          <td>{patient.contactNumber}</td>
          <td>{patient.dateOfBirth}</td>
          {/* <td><Button bsStyle="danger" bsSize="xsmall">Delete</Button></td>
          <td><Button bsStyle="danger" bsSize="xsmall">Edit</Button></td> */}
        </tr>
      )
    })
    return (
      <Table responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>NIC</th>
            <th>Contact No</th>
            <th>Birthdate</th>
          </tr>
        </thead>
        <tbody>
          {patients}
        </tbody>
      </Table>
    )
  }
}
