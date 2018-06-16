import React, { Component } from 'react'
import { Form, FormGroup, ControlLabel, FormControl, Button, Table } from 'react-bootstrap';
import axios from 'axios';

export default class AddDrugToPrescription extends Component {
  constructor() {
    super()
    this.state = {
      drugs: [],
      drugObj: [],
      drugList: [],
      totalAmount: 0
    }
    this.getDrugs()
  }

  getDrugs() {
    axios.get('http://localhost:3001/drug/view').then((res) => {
      console.log(res)
      this.setState({
        drugs: res.data.drugs
      })
    })
  }

  addDrugToCart(e) {
    if (!this.prescribedDrugQty.value) {
      alert('Quatnity can not be zero');
      e.preventDefault()
      return;
    }
    let currentObjIndex = this.state.drugObj.findIndex((element) => {
      return element.id == this.prescribedDrug.value;
    })

    console.log('currentObjIndex', currentObjIndex);

    if (currentObjIndex < 0) {
      let drugIndex = this.state.drugs.findIndex((element) => {
        return element._id == this.prescribedDrug.value;
      })
      console.log('drugIndex', this.state.drugs)
      let newDrugObj = {
        id: this.prescribedDrug.value,
        displayObj: {
          name: this.state.drugs[drugIndex].name,
          qty: this.prescribedDrugQty.value,
          amount: this.state.drugs[drugIndex].price * this.prescribedDrugQty.value
        }
      }
      let currentDrugObject = this.state.drugObj;
      currentDrugObject.push(newDrugObj);
      this.setState({
        drugObj: currentDrugObject
      })
    }
    else {
      let drugIndex = this.state.drugs.findIndex((element) => {
        return element._id == this.prescribedDrug.value;
      })
      let currentDrugObject = this.state.drugObj[currentObjIndex];
      let newDrugObj = {
        id: currentDrugObject.id,
        displayObj: {
          name: currentDrugObject.displayObj.name,
          qty: +this.prescribedDrugQty.value + +currentDrugObject.displayObj.qty,
          amount: +currentDrugObject.displayObj.amount + +this.state.drugs[drugIndex].price * +this.prescribedDrugQty.value
        }
      }
      let currentDrugObjects = this.state.drugObj;
      currentDrugObjects[currentObjIndex] = newDrugObj;
      this.setState({
        drugObj: currentDrugObjects
      })
    }

    let currentDrugList = this.state.drugList;
    currentDrugList.push(this.prescribedDrug.value);
    this.setState({
      drugList: currentDrugList
    })

    this.calculateTotal()
    e.preventDefault();
  }

  removeDrug(i) {
    let currentDrugObjects = this.state.drugObj;
    if (i > -1) {
      currentDrugObjects.splice(i, 1);
    }
    this.setState({
      drugObj: currentDrugObjects
    })

    let drugId = this.state.drugObj[i].id;
    let currentDrugList = this.state.drugList;
    if (drugId > -1) {
      currentDrugList.splice(drugId, 1);
    }

    this.setState({
      drugList: currentDrugList
    })

    this.calculateTotal()

  }

  calculateTotal() {
    let total = 0;
    this.state.drugObj.forEach(element => {
      total = total + element.displayObj.amount;
    })

    this.setState({
      totalAmount: total
    })
  }

  confirmPayment() {
    this.props.doPayment(this.state.drugObj, this.state.drugList, this.state.totalAmount)
  }

  render() {
    let drugs = this.state.drugs.map(drug => {
      return (
        <option key={drug._id} value={drug._id}>{drug.name}</option>
      )
    })

    let drugtr = this.state.drugObj.map((drug, i) => {
      console.log('drug', drug)
      return <tr key={i}>
        <td>{drug.displayObj.name}</td>
        <td>{drug.displayObj.qty}</td>
        <td>{drug.displayObj.amount}</td>
        <td>
          <Button
            bsStyle="danger"
            bsSize="xsmall"
            onClick={this.removeDrug.bind(this, i)}
          >
            Delete
            </Button>
        </td>
      </tr>;
    })

    return (

      <div>
        <form onSubmit={this.addDrugToCart.bind(this)}>
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
            </tr>
          </thead>
          <tbody>
            {drugtr}
            <tr>
            <td>Total Amount</td>
            <td>{this.state.totalAmount}</td>
            </tr>
          </tbody>
        </Table>;

        <Button bsStyle="primary" onClick={this.confirmPayment.bind(this)}>Confirm Payment</Button>

      </div>
    )
  }
}
