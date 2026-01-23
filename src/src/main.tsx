import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '../App';
import '../styles/globals.css';

const rootElement = document.getElementById('root')!;

// Check if page was pre-rendered by react-snap
if (rootElement.hasChildNodes()) {
  // Hydrate pre-rendered HTML (faster!)
  ReactDOM.hydrateRoot(
    rootElement,
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  // Render normally (fallback for dev mode)
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
