import React, { Component } from 'react'
import { Form, FormGroup, ControlLabel, FormControl, Button, Table } from 'react-bootstrap';
import ViewPrescriptionDrugs from './ViewPrescriptionDrugs'

export default class AddDrugToPrescription extends Component {
  constructor() {
    super()
    this.state = {
      drugs: [
        {
          _id: 1,
          name: 'Penadol',
          price: 20
        },
        {
          _id: 2,
          name: 'Piriton',
          price: 15
        }
      ],
      prescriptionDrugs: []
    }
  }

  addDrug(e) {
    let drugObj = this.state.drugs.find(drugItem => {
      console.log(this.prescribedDrug.value)
      if (drugItem._id == this.prescribedDrug.value) {
        return drugItem;
      }
    });
    let newDrug = {
      drug: drugObj,
      qty: this.prescribedDrugQty.value,
      amount: drugObj.price * this.prescribedDrugQty.value
    }
    let currentDrugs = this.state.prescriptionDrugs;
    currentDrugs.push(newDrug);
    this.setState({
      prescriptionDrugs: currentDrugs
    })
    // this.props.addDrug(newDrug)
    e.preventDefault();
  }

  render() {
    let drugs = this.state.drugs.map(drug => {
      return (
        <option key={drug._id} value={drug._id}>{drug.name}</option>
      )
    })

    let drugtr = this.state.prescriptionDrugs.map((drug, i) => {
      console.log('drug', drug)
      return (
        <tr key={i}>
          <td>{drug.drug.name}</td>
          <td>{drug.qty}</td>
          <td>{drug.amount}</td>
        </tr>
      )
    })

    return (
      
      <div>
        <form onSubmit={this.addDrug.bind(this)}>
          <FormGroup controlId="formControlsSelect">
            <ControlLabel>Drug</ControlLabel>
            <FormControl
              componentClass="select"
              placeholder="select"
              inputRef={(ref) => { this.prescribedDrug = ref }}
            >
              {drugs}
            </FormControl>
          </FormGroup>

          <FormGroup controlId="formInlineName">
            <ControlLabel>Qty</ControlLabel>
            <FormControl
              type="number"
              placeholder="Jane Doe"
              inputRef={(ref) => { this.prescribedDrugQty = ref }}
            />
          </FormGroup>

          <Button type="submit">Add</Button>
        </form>

        <Table responsive>
          <thead>
            <tr>
              <th>Drug</th>
              <th>Qty</th>
              <th>Amount</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {drugtr}
          </tbody>
        </Table>;
      </div>
    )
  }
}
