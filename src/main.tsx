import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from './components/ui/toaster';
import { AuthProvider } from './hooks/useAuth';
import './index.css';
import ROUTES from './lib/routes';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={ROUTES} />
    </AuthProvider>
    <Toaster />
  </React.StrictMode>
);
