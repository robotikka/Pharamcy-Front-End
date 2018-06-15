import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

export default class ViewPrescriptionDrugs extends Component {
  constructor() {
    super()
  }

  render() {
    let drug = this.props.drugs.find((drug, i) => {
      console.log(drug)
      return (
        <tr key={i}>
          <td>{drug.drug.name}</td>
          <td>{drug.qty}</td>
          <td>{drug.amount}</td>
        </tr>
      )
    })

    return <Table responsive>
    <thead>
      <tr>
        <th>Drug</th>
        <th>Qty</th>
        <th>Amount</th>
        <th>Remove</th>
      </tr>
    </thead>
    <tbody>
      {drug}
    </tbody>
  </Table>;
  }
}
