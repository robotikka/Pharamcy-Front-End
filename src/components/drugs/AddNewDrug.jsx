import React, { Component } from "react";
import { FormControl, HelpBlock, FormGroup, ControlLabel, Button, DropdownButton, MenuItem } from 'react-bootstrap';
import axios from 'axios';

export default class AddNewDrug extends Component {
  constructor() {
    super();
    this.state = {
      drug: {},
      categories: []
    }

    this.getCategories();
  }

  componentWillMount() {
    this.getCategories()
  }

  presentAlert(message) {
    alert(message);
  }

  addNewDrug(e) {
    if (!this.category.value) {
      this.presentAlert('Category is required');
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
      drug: {
        drugId: this.drugId.value,
        categoryId: this.categoryId.value,
        name: this.drugName.value,
        price: this.price.value,
        remark: this.remark.value,
        dangerLevel: this.dangerLevel.value,
        reorderLevel: this.reorderLevel.value,
        dosage: this.dosage.value,
        frequency: this.frequency.value,
        supplier: this.supplier.value,

        "drugId": 2,
        "categoryId": 1,
        "name": "Panadol",
        "price": 2.5,
        "remark": "",
        "dangerLevel": 15,
        "reorderLevel": 75,
        "dosage": "2",
        "frequency": "once every 8 hours"
      }
    }, () => {
      console.log(this.state.drug);
      this.postNewPatient();
    })

    e.preventDefault();
  }

  getCategories() {
    axios.get('http://localhost:3001/drugCategory/view').then(res => {
      this.setState({
        categories: res.data.drugCategories
      })
    })
  }

  postNewPatient() {
    console.log('postmethod')
    axios.post('http://localhost:3001/drug/add', this.state.drug).then(() => {
      this.setState({
        patient: {}
      }, () => {
        alert('Patient added successfully');
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
    let categories = this.state.categories.map(category => {
      console.log(category)
      return (
        <option value={category.categoryId}>{category.name}</option>
      )
    })
    return (
      <form onSubmit={this.addNewDrug.bind(this)}>
        <FormGroup>
          <ControlLabel>Category</ControlLabel>
          <select
            // bsStyle={title.toLowerCase()}
            // title="Category"
            // key={i}
            id="Category"
          >
            {/* <MenuItem eventKey="1">Action</MenuItem>
            <MenuItem eventKey="2">Another action</MenuItem> */}
            {categories}
          </select>
        </FormGroup>

        <FormGroup
          validationState={this.getValidateState('name')}
        >
          <ControlLabel>Name</ControlLabel>
          <FormControl
            type="text"
            placeholder="Drug Name"
            inputRef={(ref) => { this.drugName = ref }}
            ref="drugName"
          />
          <FormControl.Feedback />
        </FormGroup>

        <FormGroup
          validationState={this.getValidateState('price')}
        >
          <ControlLabel>Unit Price</ControlLabel>
          <FormControl
            type="number"
            placeholder="Unit Price"
            inputRef={(ref) => { this.price = ref }}
            ref="price"
          />
          <FormControl.Feedback />
        </FormGroup>

        <FormGroup
          validationState={this.getValidateState('dosage')}
        >
          <ControlLabel>Dosage</ControlLabel>
          <FormControl
            type="text"
            placeholder="Dosage"
            inputRef={(ref) => { this.dosage = ref }}
            ref="dosage"
          />
          <FormControl.Feedback />
        </FormGroup>

        <FormGroup
          validationState={this.getValidateState('frequency')}
        >
          <ControlLabel>Frequency</ControlLabel>
          <FormControl
            type="text"
            placeholder="Frequency"
            inputRef={(ref) => { this.frequency = ref }}
            ref="frequency"
          />
          <FormControl.Feedback />
        </FormGroup>

        <FormGroup
          validationState={this.getValidateState('dangerLevel')}
        >
          <ControlLabel>Danger Level</ControlLabel>
          <FormControl
            type="number"
            placeholder="Danger Level"
            inputRef={(ref) => { this.dangerLevel = ref }}
            ref="dangerLevel"
          />
          <FormControl.Feedback />
        </FormGroup>

        <FormGroup
          validationState={this.getValidateState('reorderLevel')}
        >
          <ControlLabel>Reorder Level</ControlLabel>
          <FormControl
            type="number"
            placeholder="Reorder Level"
            inputRef={(ref) => { this.reorderLevel = ref }}
            ref="reorderLevel"
          />
          <FormControl.Feedback />
        </FormGroup>

        <FormGroup
          validationState={this.getValidateState('remark')}
        >
          <ControlLabel>Remarks</ControlLabel>
          <FormControl
            type="text"
            placeholder="Remarks"
            inputRef={(ref) => { this.remark = ref }}
            ref="remark"
          />
          <FormControl.Feedback />
        </FormGroup>

        <FormGroup
          validationState={this.getValidateState('reorderLevel')}
        >
          <ControlLabel>Supplier</ControlLabel>
          <FormControl
            type="text"
            placeholder="Supplier"
            inputRef={(ref) => { this.supplier = ref }}
            ref="supplier"
          />
          <FormControl.Feedback />
        </FormGroup>


        <Button type="submit">Save</Button>
      </form>
    );
  }
}
