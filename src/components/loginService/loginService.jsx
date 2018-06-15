import React, {Component}           from 'react';
import axios                        from 'axios';
import {Well,Button,Table}                from 'react-bootstrap'

var URL                             = require("../../Config.app");
var NODE_URL                        = URL.NODE_API;

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

   login(){

   }
    render(){
        return <div>
                    <div style={{"border":' 10px solid  #7ca3e2','backgroundColor':"#f0e6f2",'width':"820px"}}><h3 >Login</h3></div>
                         
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
                        <Button  bsSize="large"  bsStyle="primary" value="Login" onClick={this.login()}>Login</Button>
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