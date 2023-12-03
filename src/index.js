import { Analytics } from '@vercel/analytics/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import App from './App';
import { AuthProvider } from './context/AuthProvider';
import i18n from './i18n.js';
import './index.css';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ToastContainer />
    <BrowserRouter>
      <AuthProvider>
        <I18nextProvider i18n={i18n}>
          <Routes>
            <Route
              path="/*"
              element={<App />}
            />
          </Routes>
        </I18nextProvider>
      </AuthProvider>
    </BrowserRouter>
    <Analytics />

  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
