import React, {Component}           from 'react';
import axios                        from 'axios';
import {Well,Button,Table}          from 'react-bootstrap'

var URL                             = require("../../Config.app");
var NODE_URL                        = URL.NODE_API;
var SPRING_URL                      = URL.SPRING_API;
export default class Reports extends Component{


    constructor(){
        super();
        
        this.state = {
            date :new Date(),
            user: String,
            password: String
        }
    }

    componentWillMount(){
        
        // this.login.bind(this);
        
    }

   login(e){
      
        
        var pwdField = document.getElementById("Pwd");
        var unameField = document.getElementById("UName");
        if(pwdField!==null)
        var password = pwdField.value; 

        var username = unameField.value; 
        
        var loggedIn =[]
        axios.get(NODE_URL+"/pharmacists/username/"+username, {headers: { 'crossDomain': true }}).then(
            (recieved)=>{
                // alert(recieved.data.message);
               
                if(recieved.data.message[0]===undefined){
                    alert("Login Fails!");
                }
                if(recieved.status!==404){
                    
                    // console.log(username+ ":>>" + JSON.stringify(recieved)+"||"+password+":>>"+recieved.data.message[0].password)
                    console.log(window.btoa(password)+":::"+recieved.data.message[0].password);
                    
                    if((recieved.data.message[0].password===window.btoa(password))){

                        alert("login succuss!");
                        
                            loggedIn={
                                username:recieved.data.message[0].username,
                                role:recieved.data.message[0].role
                            }
                            
                        document.getElementById("logged").textContent = "Logout";
                        document.getElementById("LoggedUser").textContent=  loggedIn.username;
                        document.getElementById("LoggedUser").innerHTML=  "<label id="+loggedIn.role+" fontColor=green>"+loggedIn.username+"</label><label id=role value= "+loggedIn.role+"></label>";
                        document.getElementById("navPaneLeft").hidden = false;
                        document.getElementById("PharmacyLiink").hidden = false;
                        document.getElementById("loginDIV").hidden = true;
                        // window.location.href = "http://localhost:3000/login";
                        var role = document.getElementById("role").value;
                        if(role==="Chief Pharmacist"){
                            ////permissions
                        }else if(role==="Pharmacist"){
                            ///permissions
                        }else if(role==="admin"){
                            ///permissions
                        }
                    }
                    else{
                        alert("login failed.");
                        document.getElementById("LoggedUser").innerHTML=  "<font color=red>Not Logged In</font>";
                        document.getElementById("navPaneLeft").hidden = true;
                        // window.location.href = "http://localhost:3000/login";
                    }
                }else{
                    alert("User Not Found");
                }
            }
        ).catch(
            err=>{
                    // alert("login failed.");
                    document.getElementById("LoggedUser").innerHTML=  "<font color=red>Not Logged In</font>";
                    document.getElementById("navPaneLeft").hidden = true;
                    document.getElementById("PharmacyLiink").hidden = true;
                    // window.location.href = "http://localhost:3000/login";
            }
        )
        document.getElementById('UName').value = "";
        document.getElementById('Pwd').value = "";

       


        e.preventDefault();
   }
    render(){
        return <div id="loginDIV">
                    <div style={{"border":' 0px solid  #7ca3e2',"alignItems":"100px",'backgroundColor':"#f0e6f2",'width':"820px"}}><h3>Login</h3></div>
                         
                <div style={{'alignContent':'stretch','display': '-webkit-inline-box','backgroundColor':"#eff7c3", 'border':' 10px solid #d6ebff','borderStyle': 'outset','height':'100px', 'width':"820px"}}>
                    

                    <br/><br/>
                    <Table  striped condensed  hover >
                    <thead>
                    <tr>
                        <th colSpan="5" width ="150px">User Name:</th>
                        <th colSpan="5" width ="150px"><input type="text" id ="UName" required/></th>
                        <th colSpan="5" width ="150px">Password:</th>
                        <th colSpan="5" width ="150px"><input type="password" id="Pwd"  required/></th>
                    </tr>
                    <tr>
                        <td>
                        <Button  bsSize="large"  bsStyle="primary" value="Login" onClick={this.login.bind(this)}>Login</Button>
                        </td>
                    </tr>
                    <tr>
                        <th>
                            <label style={{color:'#bc3c3c'}} id="authStatus" value="Authentication" hidden>Login Failed</label>
                        </th>
                    </tr>
                    </thead>
                   
                    </Table>
                </div> 
                    
                
                    
                   
                <Well bsSize="small"><span style={{position:"relative"}}>{this.state.date.toString()}</span></Well>
                   
            
            </div>


                    
    }

}