import React, {Component}           from 'react';
import axios                        from 'axios';
import { FormControl, HelpBlock, FormGroup, ControlLabel, Button } from 'react-bootstrap';
import URI                          from '../../Config.app';

export default class AddPharmacist extends Component{
    constructor(props){
        super(props);
        this.state = {
            pharmacist:[]
        }
    }
    componentWillMount(){
        
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
        return true;
    }
    addNewPharmacist(e){
        console.log(this.pharmacistName.value)
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
        else {
           
            this.registerPharmacist(this);      
             
        }
        e.preventDefault();
    }

    registerPharmacist(refs){


    
        this.setState({
            pharmacist: {
                name: refs.pharmacistName.value,
                nic: refs.pharmacistNIC.value,
                address: refs.pharmacistAddress.value,
                contact: refs.pharmacistContact.value,
                email:refs.pharmacistEmail.value,
                username:refs.pharmacistUname.value,
                password:refs.pharmacistPassword.value,
                role: refs.pharmacistRole.value
            }
            }, () => {
                console.log(this.state.pharmacist);
                this.regPharmacist();
            })


    }


    regPharmacist(){

        axios.post(URI.NODE_API+"/pharmacists",
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
                alert("Pharmacist added");

            }
        }).catch(err=>{
            console.log(err);
            alert(err.message);
    });  
    
    }

    updatePharmacist(e){
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
                

                    axios.put(URI.NODE_API+"/pharmacists/username/"+this.state.pharmacist.username,
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
    getValidateState(type) {
        // if (type === 'name') {
        //   if (!this.state.name || !/^[A-Za-z\s]+$/.test(this.state.name)) {
        //     return 'error';
        //   }
        // } else if (type === 'address') {
        //   if (!this.state.address) {
        //     return 'error';
        //   }
        // } else if (type === 'nic') {
        //   if (!this.state.nic || !/^[0-9]{9}[vVxX]$/.test(this.state.nic)) {
        //     return 'error';
        //   }
        // } else if (type === 'role') {
        //   if (!this.state.role) {
        //     return 'error';
        //   }
        // } else if (type === 'contact') {
        //   if (!this.state.contactNo || !/(^(1?)(\s?)([\s]?)((\(\d{3}\))|(\d{3}))([\s]?)([\s-]?)(\d{3})([\s-]?)(\d{4})+$)/.test(this.state.contactNo)) {
        //     return 'error';
        //   }
        // }
        // return null;
      }


    render(){
        return <div>
                <h3>
                    Register Pharmacists
                </h3>
                
                <div>
                    <form onSubmit = {
                         this.addNewPharmacist.bind(this)
                        // (e)=>{
                        //     alert(e.value);
                        //     if(e.value==="Reg"){
                               
                        //     }else if(e.value==="Upd"){
                        //         this.updatePharmacist.bind(this)
                        //     }
                        
                        }>
                        <FormGroup
                            validationState={this.getValidateState('name')}>
                            <ControlLabel>Name</ControlLabel>
                            <FormControl
                                type="text"
                                placeholder="Enter text"
                                inputRef={(ref) => {this.pharmacistName = ref}}
                                ref="pharmacistName"
                            />
                            <FormControl.Feedback />
                        </FormGroup>
                        
                        <FormGroup
                            validationState={this.getValidateState('NIC')}>
                            <ControlLabel>NIC</ControlLabel>
                            <FormControl
                                type="text"
                                placeholder="Enter text"
                                inputRef={(ref) => {this.pharmacistNIC = ref}}
                                ref="pharmacistNIC"
                            />
                            <FormControl.Feedback />
                        </FormGroup>
                        
                        <FormGroup
                            validationState={this.getValidateState('address')}>
                            <ControlLabel>Address</ControlLabel>
                            <FormControl
                                type="text"
                                placeholder="Enter text"
                                inputRef={(ref) => {this.pharmacistAddress = ref}}
                                ref="pharmacistAddress"
                            />
                            <FormControl.Feedback />
                        </FormGroup>
                        
                        <FormGroup
                            validationState={this.getValidateState('contact')}>
                            <ControlLabel>Contact</ControlLabel>
                            <FormControl
                                type="text"
                                placeholder="Enter text"
                                inputRef={(ref) => {this.pharmacistContact = ref}}
                                ref="pharmacistContact"
                            />
                            <FormControl.Feedback />
                        </FormGroup>                        
                        
                        <FormGroup
                            validationState={this.getValidateState('email')}>
                            <ControlLabel>Email</ControlLabel>
                            <FormControl
                                type="text"
                                placeholder="Enter text"
                                inputRef={(ref) => {this.pharmacistEmail = ref}}
                                ref="pharmacistEmail"
                            />
                            <FormControl.Feedback />
                        </FormGroup>
                        
                        <FormGroup
                            validationState={this.getValidateState('role')}>
                            <ControlLabel>Role:</ControlLabel>
                            <FormControl
                                type="text"
                                placeholder="Enter text"
                                inputRef={(ref) => {this.pharmacistRole = ref}}
                                ref="pharmacistRole"
                            />
                            <FormControl.Feedback />
                        </FormGroup>                        
                        
                        <br/><br/>
                        <FormGroup
                            validationState={this.getValidateState('username')}>
                            <ControlLabel>User Name</ControlLabel>
                            <FormControl
                                type="text"
                                placeholder="Enter text"
                                inputRef={(ref) => {this.pharmacistUname = ref}}
                                ref="pharmacistUname"
                            />
                            <FormControl.Feedback />
                        </FormGroup>
                        
                        <FormGroup
                            validationState={this.getValidateState('password')}>
                            <ControlLabel>Password</ControlLabel>
                            <FormControl
                                type="text"
                                placeholder="Enter text"
                                inputRef={(ref) => {this.pharmacistPassword = ref}}
                                ref="pharmacistPassword"
                            />
                            <FormControl.Feedback />
                        </FormGroup>                       
                        
                        <div>
                            <Button type="submit" value="Reg">Register</Button>
                            <Button type="button" value="Upd" onClick={ this.updatePharmacist.bind(this)}>Update</Button>
                            <br/>
                        </div>                    


                    </form>
                    
                </div>
              </div>
    }
}