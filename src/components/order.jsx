'use strict';

import React, {Component} from 'react';

export default class Order extends Component {
    constructor(props) {
        super(props);
        this.state={
            order: [],
            data:false,
            order_items:[]
        };
    }



    render() {



        var Order=this.state.order;
        console.log(Order);
        if(this.state.data){
            Order=Order.map(function (order,index) {
                return(
                    <tr key={index} className="w3-light-grey">
                        <td>{order.orderID}</td>
                        <td>{order.orderDate}</td>
                        <td>{order.supplier}</td>
                    </tr>
                );
            });
        }

        return <div >
            <form >
                Order ID:<br/>
                <input type="text" id="drug" name="name" />
                <br/>

                order Date :<br/>
                <input type="date" id="orderdate" name="isbn" />
                <br/><br/>

                Drugs :<br/>
                <input type="text" id="drug_id" name="price" placeholder={"Drug ID"} />
                <input type="text" id="qty" name="price" placeholder={"Ordering Quantity"} />

                <button onClick={this.setOrderItems.bind(this)}>Add</button>


                <br/><br/>

                Supplier :<br/>
                <input type="text" id="supplier" name="pub_date" />
                <br/><br/>


                <button onClick={this.setData.bind(this)}>New Order</button>
                <br/>

            </form>
            <table className="w3-table-all w3-hoverable">
                <thead>
                <tr>
                    <th>Order ID</th>
                    <th>Order Date</th>
                    <th>Due Date</th>
                </tr>
                </thead>
                <tbody>
                {Order}
                </tbody>
            </table>
            <br/><br/>
            <button onClick={this.getData.bind(this)}>View Orders</button>

        </div>;
    }
    setOrderItems(e){
        e.preventDefault()
        var drugID=document.getElementById('drug_id').value
        var quantity=document.getElementById('qty').value
        this.state.order_items.push({medicineID:drugID,qty:quantity})
        console.log(this.state.order_items);
    }

    setData(e){
        e.preventDefault();
        var order_id=document.getElementById('drug').value;
        var order_date=document.getElementById('orderdate').value;
        var supplier=document.getElementById('supplier').value;
        fetch('http://localhost:3000/order/new',{
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({orderID:order_id, orderDate:order_date, items:this.state.order_items, supplier:supplier})
        }).then(function (data) {
            return data;
        }).then(function (confirm) {
            console.log(confirm);
            alert("Success");
        });

        this.state.order_items=[]

    }

    getData(){
        fetch('http://localhost:3000/order/viewall').then(function (data) {
            console.log(data);
            return data.json();
        }).then(json=>{
            this.setState({
                order:json.Order,
                data:true
            });
        });
    }





}
