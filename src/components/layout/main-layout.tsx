import React from 'react';
import AutoScrollToTop from './auto-scroll-top';

interface MainLayoutProps {
  children?: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <main>
      <AutoScrollToTop />
      {children}
    </main>
  );
};

export default MainLayout;
