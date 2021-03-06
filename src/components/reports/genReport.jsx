import React, { Component }                                             from 'react'
import { Form, FormGroup, ControlLabel, FormControl, Button, Table }    from 'react-bootstrap';
import URL                                                         from '../../Config.app'    
import axios from 'axios';
import Reports from './reports';

export default class GenerateReport extends Component {
  constructor() {
    super()
    this.state = {
      reports: []
    }
  }

  // addReport(e){
  //     this.getInventory();
  //     e.preventDefault();
  // }

getreports(){
  axios.get(URL.NODE_API+"/reports", {headers:{'crossDomain':true}}).then(
    (recieved)=>{
        console.log(recieved);
        if(recieved.status===200){
            console.log("report Data :"+recieved.data.message+"<><>");
            recieved.data.message.forEach(element => {
                console.log("id: "+element.id+
                "\nname: "+element.name+
                "\ntype: "+element.type+
                "\ndescription: "+element.description+
                "\ndeleted: "+element.deleted);

                this.setState({
                  reports: [{
                    name: element.name,
                    type: element.type,
                    description:element.description,
                    deleted: element.deleted
                  }]
                }, () => {
                  console.log(this.state.reports);
                
                })
                    
            });
        }
    }).catch(
      err=>{
        console.log(err);
      }
    )
}

  genReport(e){
    e.preventDefault();

      axios.post(URL.NODE_API+"/reports",
      {
        id: this.reportId.value,
        name:this.reportName.value,
        type: this.reportType.value,
        description:this.reportDescription.value

      }).then(
        (results)=>{
          console.log(results);
            if(results["status"]===200){
                alert("report added");

                this.setState({
                  reports: [{
                    id: this.reportId.value,
                    type: this.reportType.value,
                    description:this.reportDescription.value,
                    name:this.reportName.value
                  }]
                }, () => {
                  console.log(this.state.reports);
                  
                })
            }
        }
      ).catch(
        err=>{
          console.log(err);
          alert(err.message);
        }
      )
  }
 
  render() {
 
    let reports = this.state.reports.map(value => {
      console.log(value)
      return (
        <tr key={this.reportId}>
          <td>{value.id}</td>
          <td>{value.name}</td>
          <td>{value.type}</td>
          <td>{value.description}</td>

        </tr>
      )
    })
    return (
      
      <div>
        <h3>
          Report Add
        </h3>
        <form onSubmit={this.genReport.bind(this)}>


          <FormGroup controlId="formInlineName">
            <ControlLabel>Report ID</ControlLabel>
            <FormControl
              type="Number"
              placeholder="Enter text"
              inputRef={(ref) => {this.reportId = ref}}
              ref="reporId"
            />
              
            <FormControl.Feedback/>
          </FormGroup>

          <FormGroup controlId="formInlineName">
            <ControlLabel>Name</ControlLabel>
            <FormControl
              type="text"
              placeholder="Report|Name"
              inputRef={(ref) => { this.reportName = ref }}
              ref="reportName"
            />
          </FormGroup>

          <FormGroup controlId="formInlineName">
            <ControlLabel>Type</ControlLabel>
            <FormControl
              type="text"
              placeholder="Report|Type"
              inputRef={(ref) => { this.reportType = ref }}
              ref="reportType"
            />
            <FormControl.Feedback/>
          </FormGroup>

           <FormGroup controlId="formInlineName">
            <ControlLabel>Description</ControlLabel>
            <FormControl
              type="text"
              placeholder="Report|description"
              inputRef={(ref) => { this.reportDescription= ref }}
              ref="reportDescription"
            />
            <FormControl.Feedback/>
          </FormGroup>        
          <Button type="submit">Add</Button>
        </form>


        <Table responsive>
          <thead>
            <tr>
              <th>Report ID</th>
              <th>Report Name</th>
              <th>Report Type</th>
              <th>Remove Description</th>
            </tr>
          </thead>
          <tbody>
            {reports}
          </tbody>
        </Table>
      </div>
    )
  }
}
