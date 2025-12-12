import React, { Component } from 'react';
import ProductService from '../services/ProductService';
import authService from '../services/AuthService';

class ListProductComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            message: '',
            isAdmin: authService.isAdmin()
        };
    }

    componentDidMount() {
        this.loadProducts();
    }

    loadProducts() {
        ProductService.getAllProducts()
            .then(res => {
                this.setState({ products: res.data });
            })
            .catch(err => {
                console.error('Error loading products:', err);
                this.setState({ message: 'Failed to load products' });
            });
    }

    addProduct = () => {
        this.props.history.push('/add-product/_add');
    }

    editProduct = (id) => {
        this.props.history.push(`/add-product/${id}`);
    }

    deleteProduct = (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            ProductService.deleteProduct(id)
                .then(res => {
                    this.setState({
                        products: this.state.products.filter(p => p.id !== id),
                        message: 'Product deleted successfully'
                    });
                    setTimeout(() => this.setState({ message: '' }), 3000);
                })
                .catch(err => {
                    console.error('Error deleting product:', err);
                    this.setState({ message: 'Failed to delete product' });
                });
        }
    }

    orderProduct = (product) => {
        this.props.history.push({
            pathname: '/create-order',
            state: { product: product }
        });
    }

    render() {
        return (
            <div className="container mt-4">
                <h2 className="text-center mb-4">Product/Stock List</h2>
                
                {this.state.message && (
                    <div className="alert alert-info">{this.state.message}</div>
                )}

                {this.state.isAdmin && (
                    <div className="row mb-3">
                        <div className="col-12">
                            <button className="btn btn-primary" onClick={this.addProduct}>
                                Add New Product
                            </button>
                        </div>
                    </div>
                )}

                <div className="row">
                    <div className="col-12">
                        <table className="table table-striped table-bordered">
                            <thead className="thead-dark">
                                <tr>
                                    <th>Medicine Name</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Expiry Date</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.products.length > 0 ? (
                                    this.state.products.map(product => (
                                        <tr key={product.id}>
                                            <td>{product.medicineName}</td>
                                            <td>{product.quantity}</td>
                                            <td>₹{product.price}</td>
                                            <td>{product.expiryDate}</td>
                                            <td>
                                                {!this.state.isAdmin && (
                                                    <button 
                                                        onClick={() => this.orderProduct(product)} 
                                                        className="btn btn-success btn-sm"
                                                    >
                                                        Order
                                                    </button>
                                                )}
                                                {this.state.isAdmin && (
                                                    <>
                                                        <button 
                                                            onClick={() => this.editProduct(product.id)} 
                                                            className="btn btn-warning btn-sm mr-2"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button 
                                                            onClick={() => this.deleteProduct(product.id)} 
                                                            className="btn btn-danger btn-sm"
                                                        >
                                                            Delete
                                                        </button>
                                                    </>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center">No products found</td>
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

export default ListProductComponent;