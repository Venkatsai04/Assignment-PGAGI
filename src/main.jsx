import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Provider } from 'react-redux';
import { store } from './redux/store.js';
import { BrowserRouter } from 'react-router-dom'; // Correctly imports BrowserRouter

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      {/* BrowserRouter wraps App, making routing context available to App and its children */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);