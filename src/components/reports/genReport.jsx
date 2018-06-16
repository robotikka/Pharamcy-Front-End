import React, { Component }                                             from 'react'
import { Form, FormGroup, ControlLabel, FormControl, Button, Table }    from 'react-bootstrap';
import URL                                                         from '../../Config.app'    
import Axios from 'axios';
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
  axios.get(NODE_URL+"/reports", {headers:{'crossDomain':true}}).then(
    (recieved)=>{
        console.log(recieved);
        if(recieved.status===200){
            console.log("report Data :"+JSON.stringify(recieved.data.message+"<><>"));
            recieved.data.message.forEach(element => {
                console.log("id: "+element.id+
                "\nname: "+element.name+
                "\ntype: "+element.type+
                "\ndescription: "+element.description+
                "\ndeleted: "+element.deleted);

                this.setState({
                  reports: {
                    name: element.name,
                    type: element.type,
                    description:element.description,
                    deleted: element.deleted
                  }
                }, () => {
                  console.log(this.state.patient);
                  this.postNewPatient();
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

      Axios.post(URL.NODE_API+"/reports",
      {
        id: this.reportId,
        name:this.reportName,
        type: this.reportType,
        description:this.reportDescription

      }).then(
        (results)=>{
          onsole.log(results);
            if(results["status"]===200){
                alert("report added");

            }
        }
      ).catch(
        err=>{
          console.log(err);
          alert(err.message);
        }
      )
  }
  // getInventory(){
  //     Axios.get(URL.NODE_API+"/inventory/viewall",{headers:{'crossDomain':true}}).then(
  //         (recieved)=>{
  //             if(recieved.status===200){
  //                 recieved.data.message.foreach(
  //                     element=>{
  //                         this.setState(
  //                             report = {
  //                                 id:element.DrugID,
  //                                 batch:element.batch
  //                             }
  //                         ).catch(
  //                             err=>{
  //                                 console.log(err);
  //                             }
  //                         );

  //                         this.genReport();


  //                     }
  //                 )
  //             }
  //         }
  //     ).catch(
  //         err=>{
  //             console.log(err);
  //         }
  //     )
  // }
  render() {
 
    let reports = this.state.reports.map(value => {
      console.log(value)
      return (
        <tr key={this.reportId}>
          <td>{patient.id}</td>
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
        </Table>;
      </div>
    )
  }
}
