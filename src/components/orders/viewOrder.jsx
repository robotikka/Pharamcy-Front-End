'use strict';

import React, {Component} from 'react';

export default class ViewOrder extends Component {
    constructor(props) {
        super(props);
        this.state={
            order: [],
            data:false,
            order_items:[]
        };
    }

    getData(){
        fetch('http://localhost:3001/order/viewall').then(function (data) {
            console.log(data);
            return data.json();
        }).then(json=>{
            this.setState({
                order:json.Order,
                data:true
            });
        });

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

            <table className="w3-table-all w3-hoverable">
                <thead>
                <tr>
                    <th>Order ID</th>
                    <th>Order Date</th>
                    <th>Order Items</th>
                    <th>Supplier</th>
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

}
