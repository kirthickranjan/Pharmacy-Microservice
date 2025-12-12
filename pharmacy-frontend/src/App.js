import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import HeaderComponent from './components/HeaderComponent';
import LoginComponent from './components/LoginComponent';
import RegisterComponent from './components/RegisterComponent';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';

// Prescription Components
import ListPrescriptionComponent from './components/ListPrescriptionComponent';
import CreatePrescriptionComponent from './components/CreatePrescriptionComponent';
import ViewPrescriptionComponent from './components/ViewPrescriptionComponent';

// Product Components
import ListProductComponent from './components/ListProductComponent';
import CreateProductComponent from './components/CreateProductComponent';

// Order Components
import CreateOrderComponent from './components/CreateOrderComponent';
import ListOrderComponent from './components/ListOrderComponent';

function App() {
  return (
    <div>
      <Router>
        <HeaderComponent />
        <div className="container">
          <Switch>
            {/* Auth Routes */}
            <Route path="/" exact component={LoginComponent} />
            <Route path="/login" component={LoginComponent} />
            <Route path="/register" component={RegisterComponent} />
            
            {/* Dashboard Routes */}
            <Route path="/admin" component={AdminDashboard} />
            <Route path="/user" component={UserDashboard} />
            
            {/* Prescription Routes */}
            <Route path="/prescriptions" component={ListPrescriptionComponent} />
            <Route path="/add-prescription/:id" component={CreatePrescriptionComponent} />
            <Route path="/view-prescription/:id" component={ViewPrescriptionComponent} />
            
            {/* Product Routes */}
            <Route path="/products" component={ListProductComponent} />
            <Route path="/add-product/:id" component={CreateProductComponent} />
            
            {/* Order Routes */}
            <Route path="/create-order" component={CreateOrderComponent} />
            <Route path="/orders" component={ListOrderComponent} />
            <Route path="/my-orders" component={ListOrderComponent} />
            
            {/* Fallback */}
            <Route path="*" render={() => <Redirect to="/login" />} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;