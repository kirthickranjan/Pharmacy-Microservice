import React, { Component } from 'react';
import PrescriptionService from '../services/PriscriptionService';
import authService from '../services/AuthService';

class ListPrescriptionComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            prescriptions: [],
            message: '',
            isAdmin: authService.isAdmin()
        };
    }

    componentDidMount() {
        this.loadPrescriptions();
    }

    loadPrescriptions() {
        PrescriptionService.getPrescriptions()
            .then(res => {
                this.setState({ prescriptions: res.data });
            })
            .catch(err => {
                console.error('Error loading prescriptions:', err);
                this.setState({ message: 'Failed to load prescriptions' });
            });
    }

    addPrescription = () => {
        this.props.history.push('/add-prescription/_add');
    }

    editPrescription = (id) => {
        this.props.history.push(`/add-prescription/${id}`);
    }

    deletePrescription = (id) => {
        if (window.confirm('Are you sure you want to delete this prescription?')) {
            PrescriptionService.deletePrescription(id)
                .then(res => {
                    this.setState({
                        prescriptions: this.state.prescriptions.filter(p => p.prescriptionId !== id),
                        message: 'Prescription deleted successfully'
                    });
                    setTimeout(() => this.setState({ message: '' }), 3000);
                })
                .catch(err => {
                    console.error('Error deleting prescription:', err);
                    this.setState({ message: 'Failed to delete prescription' });
                });
        }
    }

    viewPrescription = (id) => {
        this.props.history.push(`/view-prescription/${id}`);
    }

    render() {
        return (
            <div className="container mt-4">
                <h2 className="text-center mb-4">Prescription List</h2>
                
                {this.state.message && (
                    <div className="alert alert-info">{this.state.message}</div>
                )}

                {this.state.isAdmin && (
                    <div className="row mb-3">
                        <div className="col-12">
                            <button className="btn btn-primary" onClick={this.addPrescription}>
                                Add New Prescription
                            </button>
                        </div>
                    </div>
                )}

                <div className="row">
                    <div className="col-12">
                        <table className="table table-striped table-bordered">
                            <thead className="thead-dark">
                                <tr>
                                    <th>Provider Name</th>
                                    <th>Patient Name</th>
                                    <th>Medicine Name</th>
                                    <th>Dosage</th>
                                    <th>Followup Date</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.prescriptions.length > 0 ? (
                                    this.state.prescriptions.map(prescription => (
                                        <tr key={prescription.prescriptionId}>
                                            <td>{prescription.providerName}</td>
                                            <td>{prescription.patientName}</td>
                                            <td>{prescription.medicineName}</td>
                                            <td>{prescription.dosage}</td>
                                            <td>{prescription.followupDate}</td>
                                            <td>
                                                <button 
                                                    onClick={() => this.viewPrescription(prescription.prescriptionId)} 
                                                    className="btn btn-info btn-sm mr-2"
                                                >
                                                    View
                                                </button>
                                                {this.state.isAdmin && (
                                                    <>
                                                        <button 
                                                            onClick={() => this.editPrescription(prescription.prescriptionId)} 
                                                            className="btn btn-warning btn-sm mr-2"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button 
                                                            onClick={() => this.deletePrescription(prescription.prescriptionId)} 
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
                                        <td colSpan="6" className="text-center">No prescriptions found</td>
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

export default ListPrescriptionComponent;
