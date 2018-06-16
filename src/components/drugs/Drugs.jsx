import React, { Component } from 'react'
import axios from 'axios';

export default class Drugs extends Component {
  constructor() {
    super()

    this.state = {
      drugs: [],
      editingDrug: {},
      editingDrugId: {}
    }

    this.getDrugs();
  }

  componentWillMount() {
    this.getDrugs()
  }

  getDrugs() {
    axios.get('http://localhost:3001/drug/view').then(res => {
      this.setState({
        drugs: res.data.drugs
      })
    })
  }

  deleteDrug(drugId) {
    if (window.confirm("Please press OK to delete the drug")) {
      console.log('delete method on ' + drugId)
      axios.delete('http://localhost:3001/drug/delete/' + drugId).then(() => {
        this.getDrugs();
        alert('Drug deleted successfully');
      }).catch((err) => {
        console.log(err)
        alert('Error occrued - ', err, ' Please try again later');
      })
    } else {
      return
    }
  }

  updateDrug() {
    axios.put('http://localhost:3001/drug/update/' + this.state.editingDrugId, this.state.editingDrug).then(() => {
      this.setState({
        editingDrug: {},
        editingDrugId: {}
      }, () => {
        this.getDrugs();
        alert('Drug updated successfully');
        document.getElementById("updateDrug").reset();
      });
    }).catch((err) => {
      console.log(err)
      alert('Error occrued - ', err, ' Please try again later');
    })
  }

  editDrug() {
    if (document.getElementById('name').value == "") {
      this.presentAlert('Name is required');
      return;
    } else if (document.getElementById('price').value == "") {
      this.presentAlert('Price is required');
      return;
    } else if (document.getElementById('dangerLevel').value == "") {
      this.presentAlert('Danger Level is required');
      return;
    } else if (document.getElementById('reorderLevel').value == "") {
      this.presentAlert('Reorder Level is required');
      return;
    } else if (document.getElementById('dosage').value == "") {
      this.presentAlert('Dosage is required');
      return;
    } else if (document.getElementById('frequency').value == "") {
      this.presentAlert('Frequency is required');
      return;
    }
    this.setState({
      editingDrug: {
        price: document.getElementById('price').value,
        remarks: document.getElementById('remarks').value,
        dangerLevel: document.getElementById('dangerLevel').value,
        reorderLevel: document.getElementById('reorderLevel').value,
        dosage: document.getElementById('dosage').value,
        frequency: document.getElementById('frequency').value,
      }
    }, () => {
      this.updateDrug();
    })
  }

  presentAlert(message) {
    alert(message);
  }

  setEditingDrug(drug) {
    document.getElementById("name").value = drug.name
    document.getElementById("price").value = drug.price
    document.getElementById("dosage").value = drug.dosage
    document.getElementById("frequency").value = drug.frequency
    document.getElementById("dangerLevel").value = drug.dangerLevel
    document.getElementById("reorderLevel").value = drug.reorderLevel
    document.getElementById("remarks").value = drug.remarks

    this.setState({
      editingDrug: drug,
      editingDrugId: drug._id
    })
  }

  render() {
    let drugs = this.state.drugs.map(drug => {
      return (
        <tr key={drug._id}>
          <td>{drug.name}</td>
          <td>{drug.categoryId.name}</td>
          <td>{drug.price}</td>
          <td>{drug.supplier.companyName}</td>
          <td>{drug.remarks}</td>
          <td><button class="btn btn-warning" onClick={this.setEditingDrug.bind(this, drug)} data-toggle="modal" data-target="#updateModel">Edit</button></td>
          <td><button class="btn btn-danger" onClick={this.deleteDrug.bind(this, drug._id)}>Delete</button></td>
        </tr>
      )
    })

    return (
      <div>
        <h3 class="box-title">Current Drugs</h3>
        <div>
          <table class="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Supplier</th>
                <th>Remarks</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {drugs}
            </tbody>
          </table>
        </div>

        <div id="updateModel" class="modal fade" role="dialog">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Edit Drug: {this.state.editingDrug.name}</h4>
              </div>
              <div class="modal-body">
                <form class="form-horizontal" id="updateDrug" onSubmit={this.editDrug.bind(this)}>

                  <div class="form-group">
                    <label class="control-label col-sm-4">Name</label>
                    <div class="col-sm-8">
                      <input class="form-control" type="text" id="name" placeholder="Drug Name" disabled="disabled" />
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

                </form>

                <div class="col-sm-8 col-sm-offset-4">
                  <button class="btn btn-success" data-dismiss="modal" onClick={this.editDrug.bind(this)}>Update</button>
                  <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
