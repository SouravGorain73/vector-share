import { } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <>
    <App />
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: '#1a1a2e',
          color: '#e2e8f0',
          border: '1px solid rgba(139, 92, 246, 0.2)',
          borderRadius: '12px',
          fontSize: '14px',
          fontFamily: 'Urbanist, sans-serif',
        },
        success: {
          iconTheme: {
            primary: '#a855f7',
            secondary: '#1a1a2e',
          },
        },
        error: {
          iconTheme: {
            primary: '#ef4444',
            secondary: '#1a1a2e',
          },
        },
      }}
    />
  </>
)
