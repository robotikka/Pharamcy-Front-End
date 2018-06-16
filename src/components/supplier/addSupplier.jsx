'use strict';

import React, {Component} from 'react';

export default class About extends Component {
    constructor(props) {
        super(props);
        this.state={
            supplier: [],
            data:false,
        };
    }



    render() {

        var Supplier=this.state.supplier;
        // console.log(Order);
        if(this.state.data){
            Supplier=Supplier.map(function (supplier,index) {
                return(
                    <tr key={index} className="w3-light-grey">
                        <td>{supplier.supplierID}</td>
                        <td>{supplier.companyName}</td>
                        <td>{supplier.contactNo}</td>
                        <td>{supplier.address}</td>
                        <td>{supplier.email}</td>
                        <td>{supplier.country}</td>
                    </tr>
                );
            });

        }

        return <div >
            <table className="w3-table-all w3-hoverable">
                <thead>
                <tr>
                    <th>Supplier ID</th>
                    <th>Company Name</th>
                    <th>Contact No</th>
                    <th>Address</th>
                    <th>Email</th>
                    <th>Country</th>
                </tr>
                </thead>
                <tbody>
                {Supplier}
                </tbody>
            </table>
            <br/><br/>
            <button onClick={this.getData.bind(this)}>View Suppliers</button>

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

    getData(){
        fetch('http://localhost:3001/supplier/viewall').then(function (data) {
            console.log(data);
            return data.json();
        }).then(json=>{
            this.setState({
                supplier:json.supplier,
                data:true
            });
        });
    }





}