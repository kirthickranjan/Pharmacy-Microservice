import React, { Component } from 'react';
import PrescriptionService from '../services/PriscriptionService';

class ViewPrescriptionComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            prescriptionId: this.props.match.params.id,
            prescription: {}
        };
    }

    componentDidMount() {
        PrescriptionService.getPrescriptionById(this.state.prescriptionId)
            .then(res => {
                this.setState({ prescription: res.data });
            })
            .catch(err => {
                console.error('Error loading prescription:', err);
            });
    }

    goBack = () => {
        this.props.history.push('/prescriptions');
    }

    render() {
        return (
            <div className="container mt-4">
                <div className="card col-md-8 offset-md-2">
                    <h3 className="text-center mt-3">View Prescription Details</h3>
                    <div className="card-body">
                        <table className="table table-bordered">
                            <tbody>
                                <tr>
                                    <th>Provider Name</th>
                                    <td>{this.state.prescription.providerName}</td>
                                </tr>
                                <tr>
                                    <th>Patient Name</th>
                                    <td>{this.state.prescription.patientName}</td>
                                </tr>
                                <tr>
                                    <th>Medicine Name</th>
                                    <td>{this.state.prescription.medicineName}</td>
                                </tr>
                                <tr>
                                    <th>Dosage</th>
                                    <td>{this.state.prescription.dosage}</td>
                                </tr>
                                <tr>
                                    <th>Followup Date</th>
                                    <td>{this.state.prescription.followupDate}</td>
                                </tr>
                                <tr>
                                    <th>Followup Notes</th>
                                    <td>{this.state.prescription.followupNotes}</td>
                                </tr>
                            </tbody>
                        </table>
                        <button className="btn btn-primary" onClick={this.goBack}>
                            Back
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ViewPrescriptionComponent;