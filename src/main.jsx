import React from 'react';
import ReactDOM from 'react-dom/client';

// 1️⃣ Importa primero tu CSS global para que las reglas de reset y dark-mode se apliquen
import './index.css';

// 2️⃣ Luego importa Bootstrap para aprovechar sus clases
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
