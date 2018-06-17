
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
                                d1.innerHTML =  "<input type=number style=width:50px id=id"+i+" value= "+this.state.pharmaDetails.id+" disabled/>";                                
                                var d2 = document.createElement('td');
                                d2.innerHTML = "<input style=width:120px type=text id=name"+i+" value= "+this.state.pharmaDetails.name+" disabled/>";
                                d2.colSpan  =1;
                                var d3 = document.createElement('td');
                                d3.innerHTML =  "<input type=text style=width:120px id=nic"+i+" value= "+this.state.pharmaDetails.nic+" disabled/>";
                                d3.colSpan = 1;
                                var d4 = document.createElement('td');
                                d4.innerHTML =  "<input type=text style=width:120px id=address"+i+" value= "+this.state.pharmaDetails.address+" disabled/>";
                                d4.colSpan = 1;
                                var d5 = document.createElement('td');
                                d5.innerHTML =  "<input type=text style=width:120px id=contact"+i+" value= "+this.state.pharmaDetails.contact+" disabled/>";
                                d5.colSpan = 1;
                                var d6 = document.createElement('td');
                                d6.innerHTML =  "<input type=text style=width:170px id=email"+i+" value= "+this.state.pharmaDetails.email+" disabled/>";
                                d6.colSpan = 1;
                                var d7 = document.createElement('td');
                                d7.innerHTML =  "<input type=text style=width:80px id=username"+i+" value= "+this.state.pharmaDetails.username+" disabled/>";
                                d7.colSpan = 1;
                                var d11 = document.createElement('td');
                                d11.innerHTML =  "<input type=text style=width:80px id=password"+i+" value= "+window.atob(this.state.pharmaDetails.password)+" disabled/>";
                                d11.colSpan = 1;
                                var d8 = document.createElement('td');
                                d8.innerHTML =  "<input type=text style=width:120px id=role"+i+" disabled value= "+this.state.pharmaDetails.role+" />";
                                d8.colSpan = 1;
                                var d9 = document.createElement('td');
                                d9.innerHTML = "<input type=checkbox style=width:30px id=manage"+i+"  />";
                                // var d10 = document.createElement('td');
                                // d10.innerHTML = "<Button bsStyle='primary' bsSize='xsmall' onClick=setEnabled("+i+") >Update</Button> "; 
                               
                                // d9.appendChild(btn);
                                d9.colSpan = 5;
                                r.appendChild(d1);
                                r.appendChild(d2);
                                r.appendChild(d3);
                                r.appendChild(d4);
                                r.appendChild(d5);
                                r.appendChild(d6);
                                r.appendChild(d7);
                                r.appendChild(d11);
                                r.appendChild(d8);
                                r.appendChild(d9);
                                // r.appendChild(d10);
                                tb.appendChild(r);
                            })
                
                    }


                }
                

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

    setEnabled(i){
        var i=0
        // var tableLength = document.getElementById("tablePharm").rows.length;
       alert("i: "+i);
        // for(let i=0; i<tableLength-1;i++){
            var checked = false;
            // console.log( document.getElementById("manage"+i).checked);
            // checked = document.getElementById("manage"+i).checked;
            // var username = document.getElementById("username"+i).value;
            // if(checked){
               var avail =  document.getElementById("name"+i);
               if(avail !== null){
                    document.getElementById("name"+i).disabled=false
                    document.getElementById("nic"+i).disabled=false
                    document.getElementById("address"+i).disabled=false
                    document.getElementById("contact"+i).disabled=false
                    document.getElementById("email"+i).disabled=false
                    document.getElementById("username"+i).disabled=false
                    document.getElementById("password"+i).disabled=false
                    document.getElementById("role"+i).disabled=false
               }
        this.componentWillMount =false;
            // }
        // }s
    }

    DeletePharmacist(e){
    
        var tableLength = document.getElementById("tablePharm").rows.length;
       
        for(let i=0; i<tableLength-1;i++){
            var checked = false;
            console.log( checked= document.getElementById("manage"+i).checked);
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
       
        // for(let i=1; i<document.getElementById("tablePhB :tr").length;i++){
        //     console.log(document.getElementById("id"+i).diabled);
        //     alert();
        // }
        var isOK =  this.validFields(e);

        if(isOK){

            var tableLength = document.getElementById("tablePharm").rows.length;
       
            for(let i=0; i<tableLength-1;i++){
                var checked = false;
                console.log( checked= document.getElementById("delete"+i).checked);
                var username = document.getElementById("username"+i).value;
                if(checked){
                    this.setState({
                        pharmacist: {
                            name: document.getElementById("name"+i).value,
                            nic: document.getElementById("nic"+i).value,
                            address: document.getElementById("address"+i).value,
                            contact: document.getElementById("contact"+i).value,
                            email:document.getElementById("email"+i).value,
                            username:document.getElementById("username"+i).value,
                            password:document.getElementById("password"+i).value,
                            role: document.getElementById("role"+i).value
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
            e.preventDefault();
            
            
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
                        <th >ID</th>
                        <th colSpan="1" width ="50px">Name</th>
                        <th colSpan="1" width ="50px">NIC</th>
                        <th colSpan="1" width ="50px">Address</th>
                        <th colSpan="1" width ="50px">Contact</th>
                        <th colSpan="1" width ="100px">Email</th>
                        <th colSpan="1" width ="50px">User Name</th>
                        <th colSpan="1" width ="50px">Password</th>
                        <th colSpan="1" width ="50px">Role</th>
                        <th colSpan="1" width ="50px">Select</th>
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