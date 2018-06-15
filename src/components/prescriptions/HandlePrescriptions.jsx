import React, { Component } from 'react'
import AddDrugToPrescription from './AddDrugToPrescription';
import ViewPrescriptionDrugs from './ViewPrescriptionDrugs';

export default class HandlePrescriptions extends Component {
  constructor() {
    super()
    this.state = {
      drugs: []
    }
  }

  addDrug(newDrug) {
    let currentDrugs = this.state.drugs;
    currentDrugs.push(newDrug);
    console.log('hee', currentDrugs)
    this.setState({
      drugs: currentDrugs
    })
  }

  // removeDrug(index) {
  //   let drugs = this.state.drugs;
  //   drugs.splice(index, 1);
  //   this.setState({
  //     drugs: drugs
  //   })
  // }

  render() {
    return (
      <div>
        <AddDrugToPrescription addDrug={this.addDrug.bind(this)} />
      </div>
    )
  }
}
