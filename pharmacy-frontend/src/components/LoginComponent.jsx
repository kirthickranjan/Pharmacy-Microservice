import React, { Component } from 'react';
import authService from '../services/AuthService';

class LoginComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            message: '',
            isLoading: false
        };
    }

    handleChange = (e) => {
        this.setState({ 
            [e.target.name]: e.target.value,
            message: '' // Clear message on input change
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        
        this.setState({ isLoading: true, message: '' });
        
        console.log('Attempting login for:', this.state.email);

        authService.login(this.state.email, this.state.password)
            .then(response => {
                console.log('Login successful:', response);
                console.log('User role:', response.role);
                
                // Redirect based on role
                if (response.role === 'ROLE_ADMIN') {
                    console.log('Redirecting to admin dashboard');
                    this.props.history.push('/admin');
                } else {
                    console.log('Redirecting to user dashboard');
                    this.props.history.push('/user');
                }
            })
            .catch(error => {
                console.error('Login error:', error);
                
                let errorMessage = 'Login failed. Please try again.';
                
                if (error.response) {
                    console.log('Error response:', error.response.data);
                    errorMessage = error.response.data.message || 'Invalid email or password';
                } else if (error.request) {
                    errorMessage = 'Cannot connect to server. Please check if backend is running.';
                } else {
                    errorMessage = error.message;
                }
                
                this.setState({ 
                    isLoading: false,
                    message: errorMessage,
                    password: '' // Clear password on error
                });
            });
    }

    render() {
        return (
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header text-center bg-primary text-white">
                                <h3>Login</h3>
                            </div>
                            <div className="card-body">
                                {this.state.message && (
                                    <div className="alert alert-danger">
                                        {this.state.message}
                                    </div>
                                )}
                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <label>Email:</label>
                                        <input
                                            type="email"
                                            name="email"
                                            className="form-control"
                                            value={this.state.email}
                                            onChange={this.handleChange}
                                            required
                                            disabled={this.state.isLoading}
                                            autoComplete="email"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Password:</label>
                                        <input
                                            type="password"
                                            name="password"
                                            className="form-control"
                                            value={this.state.password}
                                            onChange={this.handleChange}
                                            required
                                            disabled={this.state.isLoading}
                                            autoComplete="current-password"
                                        />
                                    </div>
                                    <button 
                                        type="submit" 
                                        className="btn btn-primary btn-block"
                                        disabled={this.state.isLoading}
                                    >
                                        {this.state.isLoading ? 'Logging in...' : 'Login'}
                                    </button>
                                </form>
                                <div className="mt-3 text-center">
                                    <a href="/register">Don't have an account? Register here</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginComponent;