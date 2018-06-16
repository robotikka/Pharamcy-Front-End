'use strict';

import React, {Component} from 'react';

export default class New extends Component {
    constructor(props) {
        super(props);
        this.state={
            inventory: [],
            data:false,
            batch_items:[]
        };
    }


    render() {

        var inventory=this.state.inventory;
        console.log(inventory);
        if(this.state.data){
            inventory=inventory.map(function (stock,index) {
                console.log(stock.DrugID);
                return(
                    <tr key={index} className="w3-light-grey">
                        <td>{stock.DrugID}</td>
                        <td>{
                            stock.batch.map(function (item,ind) {
                                return(
                                    <ul key={ind}>
                                        <li>Batch ID :{item.batchID}</li>
                                        <li>Company Name : {item.companyName}</li>
                                        <li>Received Date : {item.receivedDate}</li>
                                        <li>Expire Date : {item.expDate}</li>
                                        <li>Manufacture Date : {item.manDate}</li>
                                        <li>Quantity : {item.qty}</li>
                                    </ul>
                                )
                            })
                        }
                        </td>
                    </tr>
                );
            });
        }

        return <div >
            <table className="w3-table-all w3-hoverable">
                <thead>
                <tr>
                    <th>Drug ID</th>
                    <th>Batch Details</th>
                </tr>
                </thead>
                <tbody>
                {inventory}
                </tbody>
            </table>
            <br/><br/>
            <button onClick={this.getData.bind(this)}>View Stock</button>

        </div>;
    }

    getData(){
        fetch('http://localhost:3001/inventory/viewall').then(function (data) {
            console.log(data);
            return data.json();
        }).then(json=>{
            this.setState({
                inventory:json.stock,
                data:true
            });
        });
    }





}


