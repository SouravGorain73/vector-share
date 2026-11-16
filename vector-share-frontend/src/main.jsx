import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <>
    <App />
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: '#111827',
          color: '#F5F3EB',
          border: '1px solid rgba(229, 227, 218, 0.2)',
          borderRadius: '6px',
          fontSize: '13px',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.5)',
        },
        success: {
          iconTheme: {
            primary: '#D7FF64',
            secondary: '#111827',
          },
        },
        error: {
          iconTheme: {
            primary: '#ef4444',
            secondary: '#111827',
          },
        },
      }}
    />
  </>
);
