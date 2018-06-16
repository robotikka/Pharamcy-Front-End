'use strict';

import React, {Component} from 'react';
import axios from 'axios';

export default class New extends Component {
    constructor(props) {
        super(props);
        this.state={
            batch_items:[],
            drugs:[],
            items:[],
            data:false
        };
        this.getDrugs()
    }
    getDrugs() {
        axios.get('http://localhost:3001/drug/view').then((res) => {
            console.log(res)
            this.setState({
                drugs: res.data.drugs
            })
        })
    }

    render() {

        var Order=this.state.batch_items;
        console.log(Order);
        if(this.state.data){
            Order=Order.map(function (order,index) {
                return(
                    <tr key={index} className="w3-light-grey">
                        <td>{order.companyName}</td>
                        <td>{order.receivedDate}</td>
                        <td>{order.manDate}</td>
                        <td>{order.expDate}</td>
                        <td>{order.qty}</td>
                    </tr>
                );
            });
        }

        let drugs = this.state.drugs.map(drug => {
            return (
                <option key={drug._id} value={drug._id}>{drug.name}</option>
            )
        })

        return <div >
            <form id={"inventory_form"}>
                Drug ID:<br/><br/>
                <select id={"selected_drug"}>{drugs}</select>
                <br/><br/>

                <form id={"inventory_sub_form"}>
                    Drugs :<br/><br/>
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
                    <br/><br/>

                    <table className="w3-table-all w3-hoverable">
                        <thead>
                        <tr>
                            <th>Company Name</th>
                            <th>Received Date</th>
                            <th>Qty</th>
                            <th>Manufacture Date</th>
                            <th>Expiry Date</th>
                        </tr>
                        </thead>
                        <tbody>
                        {Order}
                        </tbody>
                    </table>
                    <br/><br/>

                </form>

                <br/><br/>


                <button onClick={this.setData.bind(this)}>Add Batch</button>
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
        // console.log(document.getElementById('selected_drug').value  );
        this.state.items.push({companyName:company_name,receivedDate:received_date,expDate:exp_date,manDate:man_date,qty:qty})
        this.setState({
            batch_items:this.state.items,
            data:true
        });
        document.getElementById('inventory_sub_form').reset()
    }

    setData(e){
        e.preventDefault();
        var drug_id=document.getElementById('selected_drug').value;
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


