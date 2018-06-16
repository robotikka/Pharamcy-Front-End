import React, { Component } from 'react'
import { Table, Button } from 'react-bootstrap';
import axios from 'axios';

import ViewPatientHistory from '../prescriptions/ViewPatientHistory'

export default class Patients extends Component {
  constructor() {
    super()

    this.state = {
      patients: [],
      history: {},
      name: '',
      drugs: [],
      date: ''
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

  getHistory(id) {
    axios.get('http://localhost:3001/prescriptions/'+ id).then(res => {
      console.log(res.data.prescription)
      this.setState({
        history: res.data.prescription.prescriptions,
        name: res.data.prescription.patient.name,
        drugs: res.data.prescription.prescriptions.drugs,
        date: res.data.prescription.prescriptions.date
      })
    }).catch(err => {
      console.log(err)
    })
  }

  render() {
    let patients = this.state.patients.map(patient => {
      return (
        <tr key={patient._id}>
          <td>{patient.name}</td>
          <td>{patient.address}</td>
          <td>{patient.NIC}</td>
          <td>{patient.contactNumber}</td>
          <td>{patient.dateOfBirth}</td>
          <td><Button bsStyle="primary" bsSize="xsmall" onClick={this.getHistory.bind(this, patient._id)} >History</Button></td>
          {/* <td><Button bsStyle="danger" bsSize="xsmall">Edit</Button></td> */}
        </tr>
      )
    })

    return (
      <div>
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

        <ViewPatientHistory history={this.state.history} name={this.state.name}/>

      </div>
    )
  }
}
