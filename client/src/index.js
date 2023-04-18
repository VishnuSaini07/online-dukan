import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { AuthProvider } from './context/auth';
import { SearchProvider } from './context/Search';
import { CartProvider } from './context/cart';
import 'antd/dist/reset.css';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
      <AuthProvider>
            <SearchProvider>
                  <CartProvider>
                        <App />
                  </CartProvider>
            </SearchProvider>
      </AuthProvider>
);

