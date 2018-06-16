'use strict';

import React, {Component} from 'react';

export default class New extends Component {
    constructor(props) {
        super(props);
        this.state={
            batch_items:[]
        };
    }

    render() {

        return <div >
            <form id={"inventory_form"}>
                Drug ID:<br/><br/>
                <input type="text" id="drug" name="name" />
                <br/>

                <form id={"inventory_sub_form"}>
                    Drugs :<br/>
                    <label>  Company Name  </label>
                    <input type="text" id="company_name" name="price" placeholder={"Company Name"} />
                    <label>  Received Date  </label>
                    <input type="date" id="received_date" name="price" placeholder={"Received Date"} />
                    <label> Qty </label>
                    <input type="text" id="qty" name="price" placeholder={"Quantity"} />
                    <br/><br/>
                    <label>Manufacture Date</label>
                    <input type="date" id="man_date" name="price" placeholder={"Expiry Date"} />
                    <label>Expiry Date</label>
                    <input type="date" id="exp_date" name="price" placeholder={"Manufacture Date"} />

                    <button onClick={this.setInventoryItems.bind(this)}>Add</button>
                </form>

                <br/><br/>


                <button onClick={this.setData.bind(this)}>New Order</button>
                <br/>

            </form>

        </div>;
    }
    setInventoryItems(e){
        e.preventDefault()
        var company_name=document.getElementById('company_name').value
        var received_date=document.getElementById('received_date').value
        var exp_date=document.getElementById('exp_date').value
        var man_date=document.getElementById('man_date').value
        var qty=document.getElementById('qty').value
        this.state.batch_items.push({companyName:company_name,receivedDate:received_date,expDate:exp_date,manDate:man_date,qty:qty})
        console.log(this.state.batch_items);
        document.getElementById('inventory_sub_form').reset()
    }

    setData(e){
        e.preventDefault();
        var drug_id=document.getElementById('drug').value;
        fetch('http://localhost:3001/inventory/new',{
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({DrugID:drug_id,batch:this.state.batch_items})
        }).then(function (data) {
            return data;
        }).then(function (confirm) {
            console.log(confirm);
            alert("Success");
        });

        this.state.order_items=[]
        document.getElementById('inventory_form').reset();

    }

}


