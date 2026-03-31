import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { SectionsProvider } from './contexts/SectionsContext';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <SectionsProvider>
          <App />
        </SectionsProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
