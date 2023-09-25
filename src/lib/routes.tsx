import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import MainLayout from '../pages/MainLayout';

const ROUTES = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
    ],
  },
]);

export default ROUTES;
