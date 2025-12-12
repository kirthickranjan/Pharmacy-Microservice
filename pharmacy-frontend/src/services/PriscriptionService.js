import axios from 'axios';
import authService from './AuthService';

const API_URL = "http://localhost:8080/api/prescriptions"; // ✅ Through Gateway

class PrescriptionService {
    getPrescriptions() {
        console.log('Fetching prescriptions from:', API_URL);
        return axios.get(API_URL, { 
            headers: authService.getAuthHeader() 
        });
    }

    getPrescriptionById(id) {
        return axios.get(`${API_URL}/${id}`, { 
            headers: authService.getAuthHeader() 
        });
    }

    createPrescription(prescription) {
        return axios.post(API_URL, prescription, { 
            headers: authService.getAuthHeader() 
        });
    }

    updatePrescription(id, prescription) {
        return axios.put(`${API_URL}/${id}`, prescription, { 
            headers: authService.getAuthHeader() 
        });
    }

    deletePrescription(id) {
        return axios.delete(`${API_URL}/${id}`, { 
            headers: authService.getAuthHeader() 
        });
    }
}

export default new PrescriptionService();