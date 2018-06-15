
import React, {Component}       from 'react';
import axios                    from 'axios';
import {Table}                  from 'react-bootstrap'

var URL                         = require("../../Config.app");
var NODE_URL = URL.NODE_API;
var pharmacists =  new Map();

export default class Pharmacists extends Component{

    
    constructor(){
        super();
        this.state = {
            pharmacists:new Map(),
            pharmaID:[],
            pharmaDetails:[]
        }
        // this.getAllPharmacists();
    }



    componentWillMount(){
        
        this.getAllPharmacists();
    }

    getAllPharmacists(){
        axios.get(NODE_URL+"/pharmacists", {headers: { 'crossDomain': true }}).then((results)=>{
            // console.log(results);
            
            if(results["status"]===200){
                var pharmacistsArray = results['data']['message'];
                for(var i in pharmacistsArray){
                    // console.log(i+ ", " +JSON.stringify(pharmacistsArray));
                    if(pharmacistsArray[i].id!=null&&pharmacistsArray[i].name!=null){
                         pharmacists.set(pharmacistsArray[i].id,pharmacistsArray[i].name);
                        //  console.log(this.state+"pharmac:"+pharmacists);
                        this.setState({
                            pharmaDetails: {
                                id:pharmacistsArray[i].id,
                                name: pharmacistsArray[i].name,
                                nic: pharmacistsArray[i].nic,
                                address: pharmacistsArray[i].address,
                                contact: pharmacistsArray[i].contact,
                                email:pharmacistsArray[i].email,
                                username:pharmacistsArray[i].username,
                                password:pharmacistsArray[i].password,
                                role: pharmacistsArray[i].role
                            }
                            }, () => {
                                // console.log("Detaials :" + JSON.stringify(this.state.pharmaDetails));
                                var tb = document.getElementById("tablePhB");
                                var r = document.createElement('tr');
                                var d1 = document.createElement('td');
                                d1.innerHTML =  this.state.pharmaDetails.id;
                                d1.colSpan = 5;
                                var d2 = document.createElement('td');
                                d2.innerHTML = this.state.pharmaDetails.name;
                                d2.colSpan  =5;
                                var d3 = document.createElement('td');
                                d3.innerHTML =  this.state.pharmaDetails.nic;
                                d3.colSpan = 5;
                                var d4 = document.createElement('td');
                                d4.innerHTML =  this.state.pharmaDetails.address;
                                d4.colSpan = 5;
                                var d5 = document.createElement('td');
                                d5.innerHTML =  this.state.pharmaDetails.contact;
                                d5.colSpan = 5;
                                var d6 = document.createElement('td');
                                d6.innerHTML =  this.state.pharmaDetails.email;
                                d6.colSpan = 5;
                                var d7 = document.createElement('td');
                                d7.innerHTML =  this.state.pharmaDetails.username;
                                d7.colSpan = 5;
                                var d8 = document.createElement('td');
                                d8.innerHTML =  this.state.pharmaDetails.role;
                                d8.colSpan = 5;
                                // var d9 = document.createElement('td');
                                // d9.innerHTML =  value;
                                // d9.colSpan = 5;
                                r.appendChild(d1);
                                r.appendChild(d2);
                                r.appendChild(d3);
                                r.appendChild(d4);
                                r.appendChild(d5);
                                r.appendChild(d6);
                                r.appendChild(d7);
                                r.appendChild(d8);
                                // r.appendChild(d9);
                                tb.appendChild(r);
                            })
                
                    }
                    // pharmacistID.push();

                }
                
                // this.setState({
                //     pharmacists: pharmacists,
                //     // pharmaID:pharmacistID,
                //     // pharmaname:
                // }, ()=>{
                //     // console.log(this.state+"pharm:"+this.state.pharmacists);
                // });
            }
        }).catch(err=>{
                console.log(err);
        });  
    }

    render(){
        // this.pharmacists = this.props.pharmacists;
        // this.getAllPharmacists();
        return <div>
            <h3>Pharmacists</h3>
            <Table striped bordered condensed  hover>
                <thead>
                    <tr>
                        <th colSpan="5" width ="150px">ID</th>
                        <th colSpan="5" width ="150px">Name</th>
                        <th colSpan="5" width ="150px">NIC</th>
                        <th colSpan="5" width ="150px">Address</th>
                        <th colSpan="5" width ="150px">Contact</th>
                        <th colSpan="5" width ="200px">Email</th>
                        <th colSpan="5" width ="150px">User Name</th>
                        <th colSpan="5" width ="150px">Role</th>
                        {/* <th colSpan="5" width ="150px">Name</th> */}
                    </tr>
                </thead>
                <tbody id= "tablePhB">
                    {
                    
                 this.state.pharmacists.forEach(
                    
                                    (key,value) => {
                          
                            
                               
                        })  
                            
                    }
                    
                </tbody>
            </Table>
        </div>
    }
}