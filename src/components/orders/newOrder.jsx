'use strict';

import React, {Component} from 'react';

export default class newOrder extends Component {
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
                        <td>{
                            order.items.map(function (item,ind) {
                                return(
                                    <ul key={ind}>
                                        <li>Drug Code :{item.medicineID}</li>
                                        <li>Quantity : {item.qty}</li>
                                    </ul>
                                )
                            })
                        }
                        </td>
                        <td>{order.supplier}</td>
                    </tr>
                );
            });
        }

        return <div >
            <form id={"main"}>
                order Date :<br/>
                <input type="date" id="orderdate" name="isbn" />
                <br/><br/>

                <form id={"sub"}>
                    Drugs :<br/>
                    <input type="text" id="drug_id" name="price" placeholder={"Drug ID"} />
                    <input type="number" id="qty" name="price" placeholder={"Ordering Quantity"} />

                    <button onClick={this.setOrderItems.bind(this)}>Add</button>
                </form>

                <br/><br/>

                Supplier :<br/>
                <input type="text" id="supplier" name="pub_date" />
                <br/><br/>


                <button onClick={this.setData.bind(this)}>New Order</button>
                <br/>

            </form>

        </div>;
    }
    setOrderItems(e){
        e.preventDefault()
        var drugID=document.getElementById('drug_id').value
        var quantity=document.getElementById('qty').value
        this.state.order_items.push({medicineID:drugID,qty:quantity})
        console.log(this.state.order_items);
        document.getElementById('sub').reset()
    }

    setData(e){
        e.preventDefault();
        var order_date=document.getElementById('orderdate').value;
        var supplier=document.getElementById('supplier').value;
        fetch('http://localhost:3001/order/new',{
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({orderDate:order_date, items:this.state.order_items, supplier:supplier})
        }).then(function (data) {
            return data;
        }).then(function (confirm) {
            console.log(confirm);
            alert("Success");
        });

        this.state.order_items=[]
        document.getElementById('main').reset()

    }






}
