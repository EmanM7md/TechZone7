import ReactDOM from 'react-dom/client';
import React from 'react'
import './index.css'
import App from './App.jsx'
import { HashRouter } from 'react-router-dom';
import  CartProvider  from './components/context/Contextcart';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <HashRouter basename='/'>
  <CartProvider>  
    <App />
  </CartProvider>
  </HashRouter>

</React.StrictMode>,
)
