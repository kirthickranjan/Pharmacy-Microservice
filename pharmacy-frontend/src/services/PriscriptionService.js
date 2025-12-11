import axios from 'axios';
import AuthService from './AuthService';

const API_URL = 'http://localhost:8080/api/prescriptions';

class PrescriptionService {
  getPrescriptions() {
    return axios.get(API_URL, { 
      headers: AuthService.getAuthHeader() 
    });
  }

  getPrescriptionById(id) {
    return axios.get(`${API_URL}/${id}`, { 
      headers: AuthService.getAuthHeader() 
    });
  }

  createPrescription(prescription) {
    return axios.post(API_URL, prescription, { 
      headers: AuthService.getAuthHeader() 
    });
  }

  updatePrescription(id, prescription) {
    return axios.put(`${API_URL}/${id}`, prescription, { 
      headers: AuthService.getAuthHeader() 
    });
  }

  deletePrescription(id) {
    return axios.delete(`${API_URL}/${id}`, { 
      headers: AuthService.getAuthHeader() 
    });
  }
}

export default new PrescriptionService();