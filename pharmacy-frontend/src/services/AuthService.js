import axios from 'axios';
const API_URL = 'http://localhost:8080/api/auth/';

class AuthService {
    async login(email, password) {
        try {
            console.log('Login request to:', API_URL + 'login');
            const response = await axios.post(API_URL + 'login', { 
                email, 
                password 
            });
            
            console.log('Login API response:', response.data);
            
            if (response.data.token) {
                localStorage.setItem('user', JSON.stringify(response.data));
                console.log('User data saved to localStorage');
            }
            
            return response.data;
        } catch (error) {
            console.error('AuthService login error:', error);
            throw error;
        }
    }

    logout() {
        localStorage.removeItem('user');
        console.log('User logged out, localStorage cleared');
    }

    async register(user) {
        try {
            console.log('Register request to:', API_URL + 'register');
            const response = await axios.post(API_URL + 'register', user);
            console.log('Register API response:', response.data);
            return response;
        } catch (error) {
            console.error('AuthService register error:', error);
            throw error;
        }
    }

    getCurrentUser() {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            try {
                return JSON.parse(userStr);
            } catch (e) {
                console.error('Error parsing user from localStorage:', e);
                return null;
            }
        }
        return null;
    }

    getAuthHeader() {
        const user = this.getCurrentUser();
        if (user && user.token) {
            return { Authorization: 'Bearer ' + user.token };
        }
        return {};
    }

    isAdmin() {
        const user = this.getCurrentUser();
        return user && user.role === 'ROLE_ADMIN';
    }

    isLoggedIn() {
        return this.getCurrentUser() !== null;
    }
}

export default new AuthService();
