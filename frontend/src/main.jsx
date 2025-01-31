import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './assets/css/bootstrap.css';
import './assets/js/bootstrap.bundle.js';
import './assets/font/css/all.min.css';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router';
import { AuthProvider } from './contexts/AuthContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
