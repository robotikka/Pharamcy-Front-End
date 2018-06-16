import React, { Component } from 'react'
import axios from 'axios';
import { FormGroup, ControlLabel, FormControl, Button, Form } from 'react-bootstrap'


export default class SelectPatient extends Component {
  constructor() {
    super()

    this.state = {
      patients: [],
      selectedPatient: ''
    }
    this.getPaitents()
  }

  getPaitents() {
    axios.get('http://localhost:3001/patients').then(res => {
      this.setState({
        patients: res.data.patients,
      })
    })
  }

  setPatient(e) {
    let index = this.state.patients.findIndex(x => {
      if (x._id == this.patientId.value) {
        return x.name;
      }
    })
    this.setState({
      selectedPatient: this.state.patients[index].name
    })
    this.props.selectPatient(this.patientId.value)
    e.preventDefault()
  }

  render() {
    let patientOptions = this.state.patients.map(patient => {
      return (
        <option key={patient._id} value={patient._id}>{patient.name}</option>
      )
    })

    return (
      <div>
        <Form inline onSubmit={this.setPatient.bind(this)}>
          <FormGroup controlId="formInlineName">
            <ControlLabel>Name</ControlLabel>{' '}
            <FormControl
              componentClass="select"
              placeholder="select"
              inputRef={(ref) => { this.patientId = ref }}
            >
              {patientOptions}
            </FormControl>
          </FormGroup>{' '}
          <Button type="submit">Select</Button>
        </Form>

        <p>Selected Patient</p>
        <h5>{this.state.selectedPatient}</h5>
      </div>
    )
  }
}
