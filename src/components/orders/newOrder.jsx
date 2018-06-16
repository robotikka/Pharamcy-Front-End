'use strict';

import React, {Component} from 'react';

export default class newOrder extends Component {
    constructor(props) {
        super(props);
        this.state={
            order_items:[],
            items:[],
            data:false
        };
    }



    render() {

        var Order=this.state.order_items;
        console.log(Order);
        if(this.state.data){
            Order=Order.map(function (order,index) {
                return(
                    <tr key={index} className="w3-light-grey">
                        <td>{order.medicineID}</td>
                        <td>{order.qty}</td>
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
                <table className="w3-table-all w3-hoverable">
                    <thead>
                    <tr>
                        <th>Drug ID</th>
                        <th>Qty</th>
                    </tr>
                    </thead>
                    <tbody>
                    {Order}
                    </tbody>
                </table>
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
        this.state.items.push({medicineID:drugID,qty:quantity});
        this.setState({
           order_items:this.state.items,
            data:true
        });
        console.log(this.state.order_items)
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
        this.setState({
            order_items:[]
        });
        this.state.order_items=[]
        document.getElementById('main').reset()

    }






}
