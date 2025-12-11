import React, { Component } from 'react';

class UserDashboard extends Component {
    render() {
        return (
            <div className="container mt-5">
                <h2>User Dashboard</h2>
                <div className="row mt-4">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body text-center">
                                <h5>View Prescriptions</h5>
                                <p>View all available prescriptions</p>
                                <a href="/prescriptions" className="btn btn-primary">Go</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body text-center">
                                <h5>Products & Orders</h5>
                                <p>Browse products and place orders</p>
                                <a href="/products" className="btn btn-primary">Go</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserDashboard;