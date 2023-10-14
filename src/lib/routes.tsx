import { createBrowserRouter } from 'react-router-dom';
import LoginPage from '../pages/(auth)/login/SignInPage';
import RegisterPage from '../pages/(auth)/register/RegisterPage';
import Profile from '../pages/(profile)/Profile';
import AuthLayout from '../pages/AuthLayout';
import HomePage from '../pages/HomePage';
import MainLayout from '../pages/MainLayout';
import Sidebar from '@/components/ui/Sidebar';

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
        path: '/sidebar',
        element: <Sidebar />,
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
          
        ],
      },
    ],
  },
]);

export default ROUTES;
