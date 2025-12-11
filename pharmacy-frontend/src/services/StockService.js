import axios from 'axios';
import AuthService from './AuthService';

const API_URL = 'http://localhost:8080/api/stock';

class StockService {
  getProducts() {
    return axios.get(`${API_URL}/products`, { 
      headers: AuthService.getAuthHeader() 
    });
  }

  getProductById(id) {
    return axios.get(`${API_URL}/products/${id}`, { 
      headers: AuthService.getAuthHeader() 
    });
  }

  createProduct(product) {
    return axios.post(`${API_URL}/products`, product, { 
      headers: AuthService.getAuthHeader() 
    });
  }

  updateProduct(id, product) {
    return axios.put(`${API_URL}/products/${id}`, product, { 
      headers: AuthService.getAuthHeader() 
    });
  }

  deleteProduct(id) {
    return axios.delete(`${API_URL}/products/${id}`, { 
      headers: AuthService.getAuthHeader() 
    });
  }

  placeOrder(order) {
    return axios.post(`${API_URL}/orders`, order, { 
      headers: AuthService.getAuthHeader() 
    });
  }

  getOrders() {
    return axios.get(`${API_URL}/orders`, { 
      headers: AuthService.getAuthHeader() 
    });
  }

  getMyOrders() {
    return axios.get(`${API_URL}/orders/my`, { 
      headers: AuthService.getAuthHeader() 
    });
  }
}

export default new StockService();