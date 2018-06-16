import React, { Component } from 'react'
import AddDrugToPrescription from './AddDrugToPrescription';
import SelectPatient from './SelectPatient';
import axios from 'axios';
export default class HandlePrescriptions extends Component {
  constructor() {
    super()
    this.state = {
      drugs: [],
      selectedPatient: ''
    }
  }

  setPatient(patient) {
    if (patient) {
      this.setState({
        selectedPatient: patient
      }, () => {
        console.log(this.state.selectedPatient)
      })
    }
  }
  

  doPayment(drugsObj, drugList, totalAmount) {
    console.log(drugsObj)
    console.log(drugList)
    console.log(totalAmount)
    console.log(this.state.selectedPatient)

    if(!this.state.selectedPatient) {
      alert('Please select a patient');
      return;
    }
    if(drugList.length < 1) {
      alert('Please add drugs to continue');
      return;
    }

    let drugs = [];
    drugsObj.forEach(element => {
      drugs.push(
        {
          drug: element.id,
          qty: element.displayObj.qty
        }
      )
    });

    console.log('drugs' ,drugs)
    this.submitPayment(drugs, totalAmount)
    // this.submitPrescription(drugList);
  }

  submitPrescription(drugList) {
    axios.post('http://localhost:3001/prescriptions', {
      "prescription": drugList,
      "patient": this.state.selectedPatient
    }).then((res) => {
      console.log(res);
    }).catch(err => {
      console.log(err)
    })
  }

  submitPayment(drugs, total) {
    axios.post('http://localhost:3001/payments', {
      "patient": this.state.selectedPatient,
      "drugs": drugs,
      "total": total
    }).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  }

  render() {
    return (
      <div>
        <SelectPatient selectPatient={this.setPatient.bind(this)} />
        <AddDrugToPrescription doPayment={this.doPayment.bind(this)} />
      </div>
    )
  }
}
