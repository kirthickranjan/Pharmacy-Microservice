import axios from 'axios';
import authService from './AuthService';

const API_URL = "http://localhost:8080/api/stocks/orders"; // ✅ Through Gateway

class OrderService {
    createOrder(order) {
        console.log('Creating order at:', API_URL);
        return axios.post(API_URL, order, { 
            headers: authService.getAuthHeader() 
        });
    }

    getAllOrders() {
        return axios.get(API_URL, { 
            headers: authService.getAuthHeader() 
        });
    }

    getMyOrders() {
        return axios.get(`${API_URL}/my-orders`, { 
            headers: authService.getAuthHeader() 
        });
    }

    getOrderById(id) {
        return axios.get(`${API_URL}/${id}`, { 
            headers: authService.getAuthHeader() 
        });
    }
}

export default new OrderService();