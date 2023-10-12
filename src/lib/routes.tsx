import { createBrowserRouter } from 'react-router-dom';
import LoginPage from '../pages/(auth)/login/SignInPage';
import RegisterPage from '../pages/(auth)/register/RegisterPage';
import Profile from '../pages/(profile)/Profile';
import AuthLayout from '../pages/AuthLayout';
import HomePage from '../pages/HomePage';
import MainLayout from '../pages/MainLayout';
import Sidebar from '@/pages/(profile)/sidebar';

const ROUTES = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
      {
        element: <AuthLayout />,
        children: [
          {
            path: '/login',
            element: <LoginPage />,
          },
          {
            path: '/register',
            element: <RegisterPage />,
          },
          {
            path: '/sidebar',
            element: <Sidebar />,
          },
        ],
      },
    ],
  },
]);

export default ROUTES;
