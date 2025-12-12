import React, { Component } from 'react';
import OrderService from '../services/OrderService';
import authService from '../services/AuthService';

class ListOrderComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            message: '',
            isAdmin: authService.isAdmin()
        };
    }

    componentDidMount() {
        this.loadOrders();
    }

    loadOrders() {
        if (this.state.isAdmin) {
            OrderService.getAllOrders()
                .then(res => {
                    this.setState({ orders: res.data });
                })
                .catch(err => {
                    console.error('Error loading orders:', err);
                    this.setState({ message: 'Failed to load orders' });
                });
        } else {
            OrderService.getMyOrders()
                .then(res => {
                    this.setState({ orders: res.data });
                })
                .catch(err => {
                    console.error('Error loading orders:', err);
                    this.setState({ message: 'Failed to load orders' });
                });
        }
    }

    render() {
        return (
            <div className="container mt-4">
                <h2 className="text-center mb-4">
                    {this.state.isAdmin ? 'All Orders' : 'My Orders'}
                </h2>
                
                {this.state.message && (
                    <div className="alert alert-info">{this.state.message}</div>
                )}

                <div className="row">
                    <div className="col-12">
                        <table className="table table-striped table-bordered">
                            <thead className="thead-dark">
                                <tr>
                                    <th>Order ID</th>
                                    <th>Medicine Name</th>
                                    <th>Quantity</th>
                                    {this.state.isAdmin && <th>User Email</th>}
                                    <th>Order Date</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.orders.length > 0 ? (
                                    this.state.orders.map(order => (
                                        <tr key={order.id}>
                                            <td>{order.id}</td>
                                            <td>{order.medicineName}</td>
                                            <td>{order.quantity}</td>
                                            {this.state.isAdmin && <td>{order.userEmail}</td>}
                                            <td>{new Date(order.orderDate).toLocaleString()}</td>
                                            <td>
                                                <span className={`badge badge-${order.status === 'PENDING' ? 'warning' : 'success'}`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={this.state.isAdmin ? "6" : "5"} className="text-center">
                                            No orders found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default ListOrderComponent;