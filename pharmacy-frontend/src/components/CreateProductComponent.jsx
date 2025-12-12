import React, { Component } from 'react';
import ProductService from '../services/ProductService';

class CreateProductComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productId: this.props.match.params.id,
            medicineName: '',
            quantity: '',
            price: '',
            expiryDate: '',
            message: ''
        };
    }

    componentDidMount() {
        if (this.state.productId === '_add') {
            return;
        } else {
            ProductService.getProductById(this.state.productId)
                .then(res => {
                    let product = res.data;
                    this.setState({
                        medicineName: product.medicineName,
                        quantity: product.quantity,
                        price: product.price,
                        expiryDate: product.expiryDate
                    });
                })
                .catch(err => {
                    console.error('Error loading product:', err);
                    this.setState({ message: 'Failed to load product' });
                });
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    saveOrUpdateProduct = (e) => {
        e.preventDefault();
        
        let product = {
            medicineName: this.state.medicineName,
            quantity: parseInt(this.state.quantity),
            price: parseFloat(this.state.price),
            expiryDate: this.state.expiryDate
        };

        if (this.state.productId === '_add') {
            ProductService.createProduct(product)
                .then(res => {
                    this.props.history.push('/products');
                })
                .catch(err => {
                    console.error('Error creating product:', err);
                    this.setState({ message: 'Failed to create product' });
                });
        } else {
            ProductService.updateProduct(this.state.productId, product)
                .then(res => {
                    this.props.history.push('/products');
                })
                .catch(err => {
                    console.error('Error updating product:', err);
                    this.setState({ message: 'Failed to update product' });
                });
        }
    }

    cancel = () => {
        this.props.history.push('/products');
    }

    getTitle() {
        if (this.state.productId === '_add') {
            return <h3 className="text-center">Add Product</h3>;
        } else {
            return <h3 className="text-center">Update Product</h3>;
        }
    }

    render() {
        return (
            <div className="container mt-4">
                <div className="row">
                    <div className="card col-md-8 offset-md-2">
                        {this.getTitle()}
                        <div className="card-body">
                            {this.state.message && (
                                <div className="alert alert-danger">{this.state.message}</div>
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
                                        placeholder="Quantity"
                                        name="quantity"
                                        className="form-control"
                                        value={this.state.quantity}
                                        onChange={this.handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Price:</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        placeholder="Price"
                                        name="price"
                                        className="form-control"
                                        value={this.state.price}
                                        onChange={this.handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Expiry Date:</label>
                                    <input
                                        type="date"
                                        name="expiryDate"
                                        className="form-control"
                                        value={this.state.expiryDate}
                                        onChange={this.handleChange}
                                        required
                                    />
                                </div>
                                <button className="btn btn-success" onClick={this.saveOrUpdateProduct}>
                                    Save
                                </button>
                                <button className="btn btn-danger ml-2" onClick={this.cancel}>
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

export default CreateProductComponent;