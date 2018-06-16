import React, { Component } from "react";
import { FormControl, HelpBlock, FormGroup, ControlLabel, Button, Form } from 'react-bootstrap';
import axios from 'axios';

export default class AddNewPatient extends Component {
  constructor() {
    super();
    this.state = {
      patient: {}
    }
  }

  presentAlert(message) {
    alert(message);
  }

  addNewUser(e) {
    if (!this.patientName.value) {
      this.presentAlert('Name is required');
      e.preventDefault();
      return;
    } else if (!this.patientAddress.value) {
      this.presentAlert('Address is required');
      e.preventDefault();
      return;
    } else if (!this.patientNIC.value) {
      this.presentAlert('NIC is required');
      e.preventDefault();
      return;
    } else if (!this.patientDOB.value) {
      this.presentAlert('Date of birth is required');
      e.preventDefault();
      return;
    } else if (!this.patientContactNo.value) {
      this.presentAlert('Contact number is required');
      e.preventDefault();
      return;
    }
    this.setState({
      patient: {
        name: this.patientName.value,
        address: this.patientAddress.value,
        nic: this.patientNIC.value,
        DOB: this.patientDOB.value,
        number: this.patientContactNo.value,
      }
    }, () => {
      console.log(this.state.patient);
      this.postNewPatient();
    })
    
    e.preventDefault();
  }

  

  postNewPatient() {
    console.log('postmethod')
    axios.post('http://localhost:3001/patients', this.state.patient).then(() => {
      this.setState({
        patient: {}
      }, () => {
        alert('Patient added successfully');
        this.patientName.value ='';
        this.patientAddress.value = '';
        this.patientNIC.value = '';
        this.patientDOB.value = '';
        this.patientContactNo.value = '';
      });
    }).catch((err) => {
      console.log(err)
      alert('Error occrued - ', err, ' Please try again later');
    })
  }

  getValidateState(type) {
    // if (type === 'name') {
    //   if (!this.state.name || !/^[A-Za-z\s]+$/.test(this.state.name)) {
    //     return 'error';
    //   }
    // } else if (type === 'address') {
    //   if (!this.state.address) {
    //     return 'error';
    //   }
    // } else if (type === 'nic') {
    //   if (!this.state.nic || !/^[0-9]{9}[vVxX]$/.test(this.state.nic)) {
    //     return 'error';
    //   }
    // } else if (type === 'dob') {
    //   if (!this.state.dob) {
    //     return 'error';
    //   }
    // } else if (type === 'contact') {
    //   if (!this.state.contactNo || !/(^(1?)(\s?)([\s]?)((\(\d{3}\))|(\d{3}))([\s]?)([\s-]?)(\d{3})([\s-]?)(\d{4})+$)/.test(this.state.contactNo)) {
    //     return 'error';
    //   }
    // }
    // return null;
  }

  render() {
    return (
      <Form onSubmit={this.addNewUser.bind(this)}>
        <FormGroup
          validationState={this.getValidateState('name')}
        >
          <ControlLabel>Name</ControlLabel>
          <FormControl
            type="text"
            placeholder="Enter text"
            inputRef={(ref) => {this.patientName = ref}}
            ref="patientName"
          />
          <FormControl.Feedback />
        </FormGroup>
        
        <FormGroup
          validationState={this.getValidateState('address')}
        >
          <ControlLabel>Address</ControlLabel>
          <FormControl
          componentClass="textarea"
            type="text"
            placeholder="Enter text"
            inputRef={(ref) => {this.patientAddress = ref}}
            ref="patientAddress"
          />
          <FormControl.Feedback />
        </FormGroup>

        <FormGroup
          validationState={this.getValidateState('nic')}
        >
          <ControlLabel>NIC</ControlLabel>
          <FormControl
            type="text"
            placeholder="Enter text"
            inputRef={(ref) => {this.patientNIC = ref}}
            ref="patientNIC"
          />
          <FormControl.Feedback />
        </FormGroup>

        <FormGroup
          validationState={this.getValidateState('dob')}
        >
          <ControlLabel>Date of birth</ControlLabel>
          <FormControl
            type="date"
            placeholder="Enter text"
            inputRef={(ref) => {this.patientDOB = ref}}
            ref="patientDOB"
          />
          <FormControl.Feedback />
        </FormGroup>

        <FormGroup
          validationState={this.getValidateState('contact')}
        >
          <ControlLabel>Contact Number</ControlLabel>
          <FormControl
            type="tel"
            placeholder="Enter text"
            inputRef={(ref) => {this.patientContactNo = ref}}
            ref="patientContactNo"
          />
          <FormControl.Feedback />
        </FormGroup>

        <Button type="submit">Save</Button>
      </Form>
    );
  }
}
