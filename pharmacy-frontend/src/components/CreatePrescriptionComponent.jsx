import React, { Component } from 'react';
import PrescriptionService from '../services/PriscriptionService';

class CreatePrescriptionComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            prescriptionId: this.props.match.params.id,
            providerName: '',
            patientName: '',
            medicineName: '',
            dosage: '',
            followupDate: '',
            followupNotes: '',
            message: ''
        };
    }

    componentDidMount() {
        if (this.state.prescriptionId === '_add') {
            return;
        } else {
            PrescriptionService.getPrescriptionById(this.state.prescriptionId)
                .then(res => {
                    let prescription = res.data;
                    this.setState({
                        providerName: prescription.providerName,
                        patientName: prescription.patientName,
                        medicineName: prescription.medicineName,
                        dosage: prescription.dosage,
                        followupDate: prescription.followupDate,
                        followupNotes: prescription.followupNotes
                    });
                })
                .catch(err => {
                    console.error('Error loading prescription:', err);
                    this.setState({ message: 'Failed to load prescription' });
                });
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    saveOrUpdatePrescription = (e) => {
        e.preventDefault();
        
        let prescription = {
            providerName: this.state.providerName,
            patientName: this.state.patientName,
            medicineName: this.state.medicineName,
            dosage: this.state.dosage,
            followupDate: this.state.followupDate,
            followupNotes: this.state.followupNotes
        };

        if (this.state.prescriptionId === '_add') {
            PrescriptionService.createPrescription(prescription)
                .then(res => {
                    this.props.history.push('/prescriptions');
                })
                .catch(err => {
                    console.error('Error creating prescription:', err);
                    this.setState({ message: 'Failed to create prescription' });
                });
        } else {
            PrescriptionService.updatePrescription(this.state.prescriptionId, prescription)
                .then(res => {
                    this.props.history.push('/prescriptions');
                })
                .catch(err => {
                    console.error('Error updating prescription:', err);
                    this.setState({ message: 'Failed to update prescription' });
                });
        }
    }

    cancel = () => {
        this.props.history.push('/prescriptions');
    }

    getTitle() {
        if (this.state.prescriptionId === '_add') {
            return <h3 className="text-center">Add Prescription</h3>;
        } else {
            return <h3 className="text-center">Update Prescription</h3>;
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
                                    <label>Provider Name:</label>
                                    <input
                                        placeholder="Provider Name"
                                        name="providerName"
                                        className="form-control"
                                        value={this.state.providerName}
                                        onChange={this.handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Patient Name:</label>
                                    <input
                                        placeholder="Patient Name"
                                        name="patientName"
                                        className="form-control"
                                        value={this.state.patientName}
                                        onChange={this.handleChange}
                                        required
                                    />
                                </div>
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
                                    <label>Dosage:</label>
                                    <input
                                        placeholder="Dosage (e.g., 500mg)"
                                        name="dosage"
                                        className="form-control"
                                        value={this.state.dosage}
                                        onChange={this.handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Followup Date:</label>
                                    <input
                                        type="date"
                                        name="followupDate"
                                        className="form-control"
                                        value={this.state.followupDate}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Followup Notes:</label>
                                    <textarea
                                        placeholder="Followup Notes"
                                        name="followupNotes"
                                        className="form-control"
                                        value={this.state.followupNotes}
                                        onChange={this.handleChange}
                                        rows="3"
                                    />
                                </div>
                                <button className="btn btn-success" onClick={this.saveOrUpdatePrescription}>
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

export default CreatePrescriptionComponent;