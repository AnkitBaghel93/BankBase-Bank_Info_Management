import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { AuthProvider } from './context/AuthContext';
import 'aos/dist/aos.css';
import AOS from 'aos';
AOS.init();




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <AuthProvider>
    <App />
  </AuthProvider>
  </React.StrictMode>
);


reportWebVitals();
