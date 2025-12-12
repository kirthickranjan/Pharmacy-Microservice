import axios from 'axios';
import authService from './AuthService';

const API_URL = "http://localhost:8080/api/stocks/products"; // ✅ Through Gateway

class ProductService {
    getAllProducts() {
        console.log('Fetching products from:', API_URL);
        return axios.get(API_URL, { 
            headers: authService.getAuthHeader() 
        });
    }

    getProductById(id) {
        return axios.get(`${API_URL}/${id}`, { 
            headers: authService.getAuthHeader() 
        });
    }

    createProduct(product) {
        return axios.post(API_URL, product, { 
            headers: authService.getAuthHeader() 
        });
    }

    updateProduct(id, product) {
        return axios.put(`${API_URL}/${id}`, product, { 
            headers: authService.getAuthHeader() 
        });
    }

    deleteProduct(id) {
        return axios.delete(`${API_URL}/${id}`, { 
            headers: authService.getAuthHeader() 
        });
    }
}

export default new ProductService();