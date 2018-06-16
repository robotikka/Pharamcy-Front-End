import React, { Component } from "react";
import { FormControl, HelpBlock, FormGroup, ControlLabel, Button, DropdownButton, MenuItem } from 'react-bootstrap';
import axios from 'axios';

export default class AddNewDrug extends Component {
  constructor() {
    super();
    this.state = {
      drug: {},
      categories: [],
      suppliers: []
    }

    this.getCategories();
    this.getSuppliers();
  }

  componentWillMount() {
    console.log("ComponentWillMount")
    this.getCategories()
    this.getSuppliers()
  }

  presentAlert(message) {
    alert(message);
  }

  addNewDrug(e) {
    if (document.getElementById('name').value == "") {
      this.presentAlert('Name is required');
      e.preventDefault();
      return;
    } else if (document.getElementById('price').value == "") {
      this.presentAlert('Price is required');
      e.preventDefault();
      return;
    } else if (document.getElementById('dangerLevel').value == "") {
      this.presentAlert('Danger Level is required');
      e.preventDefault();
      return;
    } else if (document.getElementById('reorderLevel').value == "") {
      this.presentAlert('Reorder Level is required');
      e.preventDefault();
      return;
    } else if (document.getElementById('dosage').value == "") {
      this.presentAlert('Dosage is required');
      e.preventDefault();
      return;
    } else if (document.getElementById('frequency').value == "") {
      this.presentAlert('Frequency is required');
      e.preventDefault();
      return;
    }
    this.setState({
      drug: {
        categoryId: document.getElementById('categoryId').value,
        name: document.getElementById('name').value,
        price: document.getElementById('price').value,
        remarks: document.getElementById('remarks').value,
        dangerLevel: document.getElementById('dangerLevel').value,
        reorderLevel: document.getElementById('reorderLevel').value,
        dosage: document.getElementById('dosage').value,
        frequency: document.getElementById('frequency').value,
        supplier: document.getElementById('supplier').value,
      }
    }, () => {
      console.log(this.state.drug);
      this.postNewDrug();
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

  getSuppliers() {
    axios.get('http://localhost:3001/supplier/viewall').then(res => {
      this.setState({
        suppliers: res.data.supplier
      })
    })
  }

  postNewDrug() {
    console.log('postmethod')
    console.log(this.state.drug)
    axios.post('http://localhost:3001/drug/add', this.state.drug).then(() => {
      this.setState({
        drug: {}
      }, () => {
        alert('Drug added successfully');
        document.getElementById("addDrug").reset();
      });
    }).catch((err) => {
      console.log(err)
      alert('Error occrued - ', err, ' Please try again later');
    })
  }


  getValidateState(type) {
    // if (type === 'name') {
    //   if (!document.getElementById('name').value || !/^[A-Za-z\s]+$/.test(document.getElementById('name').value)) {
    //     return 'error';
    //   }
    // }
    //  else if (type === 'address') {
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
    return null;
  }

  render() {
    let categories = this.state.categories.map(category => {
      console.log(category)
      return (
        <option key={category._id} value={category._id}>{category.name}</option>
      )
    })
    let suppliers = this.state.suppliers.map(supplier => {
      console.log(supplier)
      return (
        <option key={supplier._id} value={supplier._id}>{supplier.companyName}</option>
      )
    })
    return (
      <div>
        <h3 class="box-title">Add New Drug</h3>
        <div>
          <form class="form-horizontal" id="addDrug" onSubmit={this.addNewDrug.bind(this)}>
            <div class="form-group">
              <label class="control-label col-sm-4">Category</label>
              <div class="col-sm-8">
                <select class="form-control" id="categoryId" >
                  {categories}
                </select>
              </div>
            </div>

            <div class="form-group">
              <label class="control-label col-sm-4">Name</label>
              <div class="col-sm-8">
                <input class="form-control" type="text" id="name" placeholder="Drug Name" />
              </div>
            </div>

            <div class="form-group">
              <label class="control-label col-sm-4">Unit Price</label>
              <div class="col-sm-8">
                <input class="form-control" type="number" id="price" placeholder="Unit Price" min="0" />
              </div>
            </div>

            <div class="form-group">
              <label class="control-label col-sm-4">Dosage</label>
              <div class="col-sm-8">
                <input class="form-control" type="text" id="dosage" placeholder="General Dosage" />
              </div>
            </div>

            <div class="form-group">
              <label class="control-label col-sm-4">Frequency</label>
              <div class="col-sm-8">
                <input class="form-control" type="text" id="frequency" placeholder="General Frequency" />
              </div>
            </div>

            <div class="form-group">
              <label class="control-label col-sm-4">Danger Level</label>
              <div class="col-sm-8">
                <input class="form-control" type="number" id="dangerLevel" placeholder="Danger Level" min="0" />
              </div>
            </div>

            <div class="form-group">
              <label class="control-label col-sm-4">Reorder Level</label>
              <div class="col-sm-8">
                <input class="form-control" type="number" id="reorderLevel" placeholder="Reorder Level" min="0" />
              </div>
            </div>

            <div class="form-group">
              <label class="control-label col-sm-4">Remarks</label>
              <div class="col-sm-8">
                <input class="form-control" type="text" id="remarks" placeholder="Remarks" />
              </div>
            </div>

            <div class="form-group">
              <label class="control-label col-sm-4">Supplier</label>
              <div class="col-sm-8">
                <select class="form-control" id="supplier">
                  {suppliers}
                </select>
              </div>
            </div>

            <div class="form-group">

              <div class="col-sm-8 col-sm-offset-4">
                <button class="btn btn-success" onClick={this.addNewDrug.bind(this)}>Save</button>

                <button class="btn btn-warning" type="reset">Clear</button>
              </div>
            </div>
          </form>
        </div>
      </div >
    );
  }
}
