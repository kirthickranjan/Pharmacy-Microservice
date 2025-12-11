import React, { Component } from 'react';
import authService from '../services/AuthService';
class AdminDashboard extends Component {
    componentDidMount() {
        if (!authService.isAdmin()) {
            this.props.history.push('/login');
        }
    }

    render() {
        return (
            
            <div className="container mt-5">
                <h2>Admin Dashboard</h2>
                <div className="row mt-4">
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-body text-center">
                                <h5>Manage Prescriptions</h5>
                                <p>Create, view, update, and delete prescriptions</p>
                                <a href="/prescriptions" className="btn btn-primary">Go</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-body text-center">
                                <h5>Manage Products</h5>
                                <p>Manage pharmacy inventory and stock</p>
                                <a href="/products" className="btn btn-primary">Go</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-body text-center">
                                <h5>View Orders</h5>
                                <p>View all customer orders</p>
                                <a href="/orders" className="btn btn-primary">Go</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AdminDashboard;