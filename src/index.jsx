import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';  // Assumint que el teu component App és a `src/App.jsx`
import './index.css';     // Si tens arxius CSS per estilitzar

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
