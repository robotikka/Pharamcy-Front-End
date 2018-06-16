import React, {Component}           from 'react';
import axios                        from 'axios';
import {Well,Button,Table}                from 'react-bootstrap'

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
        // this.getReports();
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
                alert(recieved.message.password);
                if(recieved.status!==404){
                    console.log(username+ ":>>" + JSON.stringify(recieved)+"||"+password+":>>"+recieved.password)
                    if(recieved.message.id!==null&&(recieved.password===atob(password))){

                        alert("login succuss!");
                        
                            loggedIn={
                                username:recieved.username
                            }
                        document.getElementById("LoggedUser").textContent=  loggedIn.username;
                        document.getElementById("LoggedUser").innerHTML=  "<font color=green>"+loggedIn.username+"</font>";
                        document.getElementById("navPaneLeft").hidden = false;
                        document.getElementById("PharmacyLiink").hidden = false;
                    }
                    else{
                        // alert("login failed.");
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
        e.preventDefault();
   }
    render(){
        return <div>
                    <div style={{"border":' 10px solid  #7ca3e2',"alignItems":"100px",'backgroundColor':"#f0e6f2",'width':"820px"}}><h3>Login</h3></div>
                         
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