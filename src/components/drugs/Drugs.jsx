import React, { Component } from 'react'
import { Table } from 'react-bootstrap';
import axios from 'axios';

export default class Drugs extends Component {
  constructor() {
    super()

    this.state = {
      drugs: []
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

  render() {
    let drugs = this.state.drugs.map(drug => {
      console.log(drug)
      return (
        <tr key={drug._id}>
          <td>{drug.name}</td>
          <td>{drug.categoryId}</td>
          <td>{drug.price}</td>
          <td>{drug.supplier}</td>
          <td>{drug.remarks}</td>
        </tr>
      )
    })
    return (
      <Table responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Supplier</th>
            <th>Remarks</th>
          </tr>
        </thead>
        <tbody>
          {drugs}
        </tbody>
      </Table>
    )
  }
}
