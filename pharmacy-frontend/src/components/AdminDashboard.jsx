import React, { Component } from 'react';
import authService from '../services/AuthService';

class AdminDashboard extends Component {
    componentDidMount() {
        if (!authService.isAdmin()) {
            this.props.history.push('/login');
        }
    }

    render() {
        const user = authService.getCurrentUser();
        
        return (
            <div className="container mt-5">
                <h2>Admin Dashboard</h2>
                <p className="lead">Welcome, {user?.fullname}!</p>
                
                <div className="row mt-4">
                    <div className="col-md-4 mb-3">
                        <div className="card bg-primary text-white">
                            <div className="card-body">
                                <h5 className="card-title">Manage Prescriptions</h5>
                                <p className="card-text">Create, view, update, and delete prescriptions</p>
                                <a href="/prescriptions" className="btn btn-light">Manage Prescriptions</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-3">
                        <div className="card bg-success text-white">
                            <div className="card-body">
                                <h5 className="card-title">Manage Products/Stock</h5>
                                <p className="card-text">Manage pharmacy inventory and stock</p>
                                <a href="/products" className="btn btn-light">Manage Products</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-3">
                        <div className="card bg-info text-white">
                            <div className="card-body">
                                <h5 className="card-title">View All Orders</h5>
                                <p className="card-text">View and manage all customer orders</p>
                                <a href="/orders" className="btn btn-light">View Orders</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AdminDashboard;