import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './contexts/auth.context';
import { BrowserRouter } from 'react-router-dom';
import { ImageProvider } from './contexts/image.context';
import { LoaderProvider } from './contexts/loader.context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <LoaderProvider>
        <AuthProvider>
          <ImageProvider>
            <App />
          </ImageProvider>
        </AuthProvider>
      </LoaderProvider>
    </BrowserRouter>
  </React.StrictMode>
);
