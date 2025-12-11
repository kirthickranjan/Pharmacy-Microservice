import React, { Component } from 'react';
import authService from '../services/AuthService';

class HeaderComponent extends Component {
    logout = () => {
        authService.logout();
        window.location.href = '/login';
    }

    render() {
        const user = authService.getCurrentUser();
        return (
            <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                <a href="/" className="navbar-brand">Pharmacy Management</a>
                <div className="ml-auto">
                    {user ? (
                        <>
                            <span className="navbar-text mr-3">
                                Welcome, {user.fullname} ({user.role === 'ROLE_ADMIN' ? 'Admin' : 'User'})
                            </span>
                            <button className="btn btn-outline-light" onClick={this.logout}>
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <a href="/login" className="btn btn-outline-light mr-2">Login</a>
                            <a href="/register" className="btn btn-outline-light">Register</a>
                        </>
                    )}
                </div>
            </nav>
        );
    }
}

export default HeaderComponent;
