import React, { Component } from 'react';
import OrderService from '../services/OrderService';

class CreateOrderComponent extends Component {
    constructor(props) {
        super(props);
        
        const product = this.props.location.state?.product || null;
        
        this.state = {
            medicineName: product ? product.medicineName : '',
            quantity: 1,
            message: '',
            messageType: ''
        };
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    createOrder = (e) => {
        e.preventDefault();
        
        let order = {
            medicineName: this.state.medicineName,
            quantity: parseInt(this.state.quantity)
        };

        OrderService.createOrder(order)
            .then(res => {
                this.setState({
                    message: 'Order placed successfully!',
                    messageType: 'success'
                });
                setTimeout(() => {
                    this.props.history.push('/my-orders');
                }, 2000);
            })
            .catch(err => {
                console.error('Error creating order:', err);
                this.setState({
                    message: 'Failed to create order',
                    messageType: 'danger'
                });
            });
    }

    cancel = () => {
        this.props.history.push('/products');
    }

    render() {
        return (
            <div className="container mt-4">
                <div className="row">
                    <div className="card col-md-6 offset-md-3">
                        <h3 className="text-center mt-3">Place Order</h3>
                        <div className="card-body">
                            {this.state.message && (
                                <div className={`alert alert-${this.state.messageType}`}>
                                    {this.state.message}
                                </div>
                            )}
                            <form>
                                <div className="form-group">
                                    <label>Medicine Name:</label>
                                    <input
                                        placeholder="Medicine Name"
                                        name="medicineName"
                                        className="form-control"
                                        value={this.state.medicineName}
                                        onChange={this.handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Quantity:</label>
                                    <input
                                        type="number"
                                        min="1"
                                        name="quantity"
                                        className="form-control"
                                        value={this.state.quantity}
                                        onChange={this.handleChange}
                                        required
                                    />
                                </div>
                                <button className="btn btn-success" onClick={this.createOrder}>
                                    Place Order
                                </button>
                                <button className="btn btn-secondary ml-2" onClick={this.cancel}>
                                    Cancel
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateOrderComponent;