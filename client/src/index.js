import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// The 'App' is the import from the exported App.js
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
	<App />
  </React.StrictMode>
);
