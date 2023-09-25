import { Outlet } from 'react-router-dom';
import TailwindIndicator from '../components/Tailwind-Indicator';

function MainLayout() {
  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <TailwindIndicator />
      <Outlet />
    </div>
  );
}

export default MainLayout;
