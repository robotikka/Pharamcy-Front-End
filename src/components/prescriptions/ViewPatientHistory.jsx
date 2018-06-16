import React, { Component } from 'react'
import { Modal } from 'react-bootstrap';

export default class ViewPatientHistory extends Component {
  constructor(props) {
    super(props)

    this.state = {
      history: {}
    }

  }
  render() {
    let hist;
    if (this.props.history.length > 0) {
      hist = this.props.history.map((element, i) => {
        let innerDrug = element.drugs.map((drug, i) => {
          return (
            <li key={i}>
              <p>{drug.name}</p>
            </li>
          )
        })
        console.log(element.date)
        return (
          <div key={i}>
            <strong>{element.date}</strong>
            <ul>
              {innerDrug}
            </ul>
          </div>
        )
      })
    }
    return (
      <div>
        <h5>{this.props.name}</h5>
        {hist}
      </div>
    )
  }
}
