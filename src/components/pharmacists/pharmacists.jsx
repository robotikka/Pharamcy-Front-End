
import React, {Component}       from 'react';
import axios                    from 'axios';
import {Table,Button,Glyphicon}                  from 'react-bootstrap'

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
                                d1.innerHTML =  "<input type=number id=id"+i+" value= "+this.state.pharmaDetails.id+" disabled/>";
                                d1.colSpan = 5;
                                var d2 = document.createElement('td');
                                d2.innerHTML = "<input type=text id=name"+i+" value= "+this.state.pharmaDetails.name+" disabled/>";
                                d2.colSpan  =5;
                                var d3 = document.createElement('td');
                                d3.innerHTML =  "<input type=text id=nic"+i+" value= "+this.state.pharmaDetails.nic+" disabled/>";
                                d3.colSpan = 5;
                                var d4 = document.createElement('td');
                                d4.innerHTML =  "<input type=text id=address"+i+" value= "+this.state.pharmaDetails.address+" disabled/>";
                                d4.colSpan = 5;
                                var d5 = document.createElement('td');
                                d5.innerHTML =  "<input type=text id=contact"+i+" value= "+this.state.pharmaDetails.contact+" disabled/>";
                                d5.colSpan = 5;
                                var d6 = document.createElement('td');
                                d6.innerHTML =  "<input type=text id=email"+i+" value= "+this.state.pharmaDetails.email+" disabled/>";
                                d6.colSpan = 5;
                                var d7 = document.createElement('td');
                                d7.innerHTML =  "<input type=text id=username"+i+" value= "+this.state.pharmaDetails.username+" disabled/>";
                                d7.colSpan = 5;
                                var d8 = document.createElement('td');
                                d8.innerHTML =  "<input type=text id=role"+i+" value= "+this.state.pharmaDetails.role+" disabled/>";
                                d8.colSpan = 5;
                                var d9 = document.createElement('td');
                                d9.innerHTML = "<input type=checkbox id=delete"+i+" />";
                                // d9.appendChild(btn);
                                d9.colSpan = 5;
                                r.appendChild(d1);
                                r.appendChild(d2);
                                r.appendChild(d3);
                                r.appendChild(d4);
                                r.appendChild(d5);
                                r.appendChild(d6);
                                r.appendChild(d7);
                                r.appendChild(d8);
                                r.appendChild(d9);
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

   send =  (e,i)=>{
        console.log("WHat? "+i);
        document.getElementById("id"+i).disabled=false;
        document.getElementById("name"+i).disabled=false;
        document.getElementById("nic"+i).disabled=false;
        document.getElementById("address"+i).disabled=false;
        document.getElementById("contact"+i).disabled=false;
        document.getElementById("email"+i).disabled=false;
        document.getElementById("username"+i).disabled=false;
        document.getElementById("role"+i).disabled=false;
        e.preventDefault();
    }   
    validFields(e){
        
        
        if(!this.pharmacistName.value){
            alert('Name is required');
            e.preventDefault(); 
            return;
        }else if(!this.pharmacistUname.value){
            alert('User Name is required');
            e.preventDefault();
            return;
        }else if(!this.pharmacistPassword.value){
            alert('Password is required');
            e.preventDefault();
            return;
        }else if(!this.pharmacistNIC.value){
            alert('NIC is required');
            e.preventDefault();
            return;
        }else if(!this.pharmacistAddress.value){
            alert('Address is required');
            e.preventDefault();
            return;
        }else if(!this.pharmacistContact.value){
            alert('Contact is required');
            e.preventDefault();
            return;
        }else if(!this.pharmacistEmail.value){
            alert('Email is required');
            e.preventDefault();
            return;
        }
       
        e.preventDefault();
    }
    DeletePharmacist(e){
    
        var tableLength = document.getElementById("tablePharm").rows.length;
       
        for(let i=0; i<tableLength-1;i++){
            var checked = false;
            console.log( checked= document.getElementById("delete"+i).checked);
            var username = document.getElementById("username"+i).value;
            if(checked){
                axios.delete(URL.NODE_API+"/pharmacists/username/"+username).then(
                    result=>{
                        alert("user Deleted");
                        window.location.href="http://localhost:3000/viewPharmacists";
                    }
                ).catch(
                    err=>{
                        alert(err);
                    }
                )
            }
        }
        e.preventDefault();
    }
    updatePharmacist(e){
        alert(document.getElementById("tablePhB :tr").length)
        for(let i=1; i<document.getElementById("tablePhB :tr").length;i++){
            console.log(document.getElementById("id"+i).diabled);
            alert();
        }
        var isOK =  this.validFields(e);

        if(isOK){
            
            this.setState({
                pharmacist: {
                    name: this.pharmacistName.value,
                    nic: this.pharmacistNIC.value,
                    address: this.pharmacistAddress.value,
                    contact: this.pharmacistContact.value,
                    email:this.pharmacistEmail.value,
                    username:this.pharmacistUname.value,
                    password:this.pharmacistPassword.value,
                    role: this.pharmacistRole.value
                }
                }, () => {
                    console.log(this.state.pharmacist);
                

                    axios.put(URL.NODE_API+"/pharmacists/username/"+this.state.pharmacist.username,
                    {
                        
                        name:this.state.pharmacist.name ,
                        nic:this.state.pharmacist.nic ,
                        address:this.state.pharmacist.address ,
                        contact: this.state.pharmacist.contact,
                        email:this.state.pharmacist.email, 
                        username:this.state.pharmacist.username, 
                        password:window.btoa(this.state.pharmacist.password), 
                        role:this.state.pharmacist.role

                    }).then((results)=>{

                        console.log(results);
                        if(results["status"]===200){
                            alert("Pharmacist updated");

                        }
                    }).catch(err=>{
                        console.log(err);
                        alert(err.message);
                });  
                
            })
        }
    }
    render(){
        // this.pharmacists = this.props.pharmacists;
        // this.getAllPharmacists();
        return <div>
            <h3>Pharmacists</h3>
            <Table striped bordered condensed  hover id= "tablePharm" >
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
                        <th colSpan="5" width ="150px">Select</th>
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
            <br/>

            <Button type="button" value="Upd" onClick={ this.DeletePharmacist.bind(this)}>Delete</Button>
        </div>
    }
}