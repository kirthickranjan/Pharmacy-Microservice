import React, { Component } from 'react';
import authService from '../services/AuthService';

class RegisterComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullname: '',
            email: '',
            address: '',
            password: '',
            message: '',
            messageType: '', // 'success' or 'error'
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
        
        const user = {
            fullname: this.state.fullname,
            email: this.state.email,
            address: this.state.address,
            password: this.state.password
        };

        console.log('Registering user:', user.email);

        authService.register(user)
            .then(response => {
                console.log('Registration response:', response.data);
                
                this.setState({ 
                    isLoading: false,
                    message: response.data.message || 'Registration successful! Redirecting to login...',
                    messageType: 'success',
                    fullname: '',
                    email: '',
                    address: '',
                    password: ''
                });
                
                // Redirect to login after 2 seconds
                setTimeout(() => {
                    this.props.history.push('/login');
                }, 2000);
            })
            .catch(error => {
                console.error('Registration error:', error);
                
                let errorMessage = 'Registration failed. Please try again.';
                
                if (error.response) {
                    // Server responded with error
                    console.log('Error response:', error.response.data);
                    errorMessage = error.response.data.message || error.response.data.error || errorMessage;
                } else if (error.request) {
                    // Request made but no response
                    errorMessage = 'Cannot connect to server. Please check if backend is running.';
                } else {
                    // Something else happened
                    errorMessage = error.message;
                }
                
                this.setState({ 
                    isLoading: false,
                    message: errorMessage,
                    messageType: 'error'
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
                                <h3>Register New Account</h3>
                            </div>
                            <div className="card-body">
                                {this.state.message && (
                                    <div className={`alert ${this.state.messageType === 'success' ? 'alert-success' : 'alert-danger'}`}>
                                        {this.state.message}
                                    </div>
                                )}
                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <label>Full Name *</label>
                                        <input
                                            type="text"
                                            name="fullname"
                                            className="form-control"
                                            value={this.state.fullname}
                                            onChange={this.handleChange}
                                            required
                                            disabled={this.state.isLoading}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Email *</label>
                                        <input
                                            type="email"
                                            name="email"
                                            className="form-control"
                                            value={this.state.email}
                                            onChange={this.handleChange}
                                            required
                                            disabled={this.state.isLoading}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Address *</label>
                                        <input
                                            type="text"
                                            name="address"
                                            className="form-control"
                                            value={this.state.address}
                                            onChange={this.handleChange}
                                            required
                                            disabled={this.state.isLoading}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Password *</label>
                                        <input
                                            type="password"
                                            name="password"
                                            className="form-control"
                                            value={this.state.password}
                                            onChange={this.handleChange}
                                            required
                                            minLength="6"
                                            disabled={this.state.isLoading}
                                        />
                                        <small className="form-text text-muted">
                                            Password must be at least 6 characters
                                        </small>
                                    </div>
                                    <button 
                                        type="submit" 
                                        className="btn btn-primary btn-block"
                                        disabled={this.state.isLoading}
                                    >
                                        {this.state.isLoading ? 'Registering...' : 'Register'}
                                    </button>
                                </form>
                                <div className="mt-3 text-center">
                                    <a href="/login">Already have an account? Login here</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RegisterComponent;