'use strict';

import React, {Component} from 'react';

export default class About extends Component {
    constructor(props) {
        super(props);
    }



    render() {

        return <div >
            <form id={"main"}>
                Company Name:<br/>
                <input type="text" id="company_name" name="isbn" />
                <br/><br/>

                Contact No:<br/>
                <input type="text" id="contact_no" name="isbn" />
                <br/><br/>

                Address:<br/>
                <input type="text" id="address" name="add" />
                <br/><br/>

                Email:<br/>
                <input type="text" id="email" name="pub_date" />
                <br/><br/>

                Country:<br/>
                <input type="email" id="country" name="pub_date" />
                <br/><br/>

                <button onClick={this.setData.bind(this)}>Add Supplier</button>
                <br/>

            </form>

        </div>;
    }

    setData(e){
        e.preventDefault();
        var company_name=document.getElementById('company_name').value;
        var cotact_no=document.getElementById('contact_no').value;
        var address=document.getElementById('address').value;
        var email=document.getElementById('email').value;
        var country=document.getElementById('country').value;

        fetch('http://localhost:3001/supplier/new',{
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({companyName:company_name,contactNo:cotact_no, address:address, email:email, country:country})
        }).then(function (data) {
            return data;
        }).then(function (confirm) {
            console.log(confirm);
            alert("Success");
        });
        document.getElementById('main').reset()

    }





}