// src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter for React Router
import Navbar from './components/Navbar'; // Import the Navbar component
import App from './App'; // Import the main App component
import './index.css'; // Import global styles

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar /> 
      <App /> 
    </BrowserRouter>
  </StrictMode>,
);