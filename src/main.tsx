import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from './components/ui/toaster';
import './index.css';
import ROUTES from './routes/routes';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={ROUTES} />
    <Toaster />
  </React.StrictMode>
);
