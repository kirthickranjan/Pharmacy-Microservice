import React, { Component } from 'react';
import authService from '../services/AuthService';

class UserDashboard extends Component {
    componentDidMount() {
        if (!authService.isLoggedIn()) {
            this.props.history.push('/login');
        }
    }

    render() {
        const user = authService.getCurrentUser();
        
        return (
            <div className="container mt-5">
                <h2>User Dashboard</h2>
                <p className="lead">Welcome, {user?.fullname}!</p>
                
                <div className="row mt-4">
                    <div className="col-md-4 mb-3">
                        <div className="card bg-primary text-white">
                            <div className="card-body">
                                <h5 className="card-title">View Prescriptions</h5>
                                <p className="card-text">View all available prescriptions</p>
                                <a href="/prescriptions" className="btn btn-light">View Prescriptions</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-3">
                        <div className="card bg-success text-white">
                            <div className="card-body">
                                <h5 className="card-title">Browse Products</h5>
                                <p className="card-text">Browse available medicines and place orders</p>
                                <a href="/products" className="btn btn-light">Browse Products</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-3">
                        <div className="card bg-info text-white">
                            <div className="card-body">
                                <h5 className="card-title">My Orders</h5>
                                <p className="card-text">View your order history</p>
                                <a href="/my-orders" className="btn btn-light">My Orders</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserDashboard;