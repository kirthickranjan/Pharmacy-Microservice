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

    updateOrderStatus = (orderId, newStatus) => {
        OrderService.updateOrderStatus(orderId, newStatus)
            .then(res => {
                const updatedOrders = this.state.orders.map(order =>
                    order.id === orderId ? { ...order, status: newStatus } : order
                );
                this.setState({ 
                    orders: updatedOrders,
                    message: `Order status updated to ${newStatus}`
                });
                setTimeout(() => this.setState({ message: '' }), 3000);
            })
            .catch(err => {
                console.error('Error updating order status:', err);
                this.setState({ message: 'Failed to update order status' });
            });
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
                                    {this.state.isAdmin && <th>Actions</th>}
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
                                                <span className={`badge badge-${order.status === 'PENDING' ? 'warning' : order.status === 'CONFIRMED' ? 'success' : 'danger'}`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            {this.state.isAdmin && (
                                                <td>
                                                    <button 
                                                        onClick={() => this.updateOrderStatus(order.id, 'CONFIRMED')}
                                                        className="btn btn-success btn-sm mr-2"
                                                        disabled={order.status === 'CONFIRMED'}
                                                    >
                                                        Confirm
                                                    </button>
                                                    <button 
                                                        onClick={() => this.updateOrderStatus(order.id, 'DECLINED')}
                                                        className="btn btn-danger btn-sm"
                                                        disabled={order.status === 'DECLINED'}
                                                    >
                                                        Decline
                                                    </button>
                                                </td>
                                            )}
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={this.state.isAdmin ? "7" : "6"} className="text-center">
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