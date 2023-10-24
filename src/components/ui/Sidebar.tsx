import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { sidebarLinks } from './sidebarLinks';
import { Button } from './button'; // Đường dẫn đến component Button
import { SidebarIcon } from './icon'; 
import HomeButtton from '../Home-Button';
const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    
    <div className="relative">
       <HomeButtton className="absolute top-0 left-0 mt-4 ml-4" />
      {isOpen ? (
        <aside
          id="default-sidebar"
          className="fixed top-0 left-0 z-40 w-64 h-screen bg-gray-800 text-white transition-transform translate-x-0 sm:translate-x-0 overflow-y-auto"
          aria-label="Sidebar"
        >
          <div className="h-full p-3">
            <div className="flex items-center justify-between mb-6">
              <div className="text-2xl font-semibold">BookRental</div>
              <Button
                onClick={toggleSidebar}
                variant="link"
               
                className="text-gray-400 hover:text-white focus:outline-none focus:text-white"
              >
                <span className="sr-only">Toggle sidebar</span>
              <SidebarIcon/>
             </Button>
            </div>
            <nav className="space-y-2">
            {sidebarLinks.map((link, index) => (
            <Link key={index} to={link.to} className="block p-2 rounded hover:bg-gray-600">
              {link.text}
              {link.text === 'Inbox' && (
                <span className="ml-2 bg-red-500 text-white rounded-full p-1 text-xs">3</span>
              )}
            </Link>
          ))}
        </nav>
          </div>
        </aside>
      ) : (
        <Button
          onClick={toggleSidebar}
          variant="default"
        
          className={`fixed top-0 left-0 z-50 w-12 h-12 bg-gray-800 text-white hover:bg-gray-600 focus:outline-none ${
            isOpen ? 'rotate-180' : ''
          }`}
          aria-label={isOpen ? 'Close Sidebar' : 'Open Sidebar'}
        >
          <SidebarIcon />
        </Button>
      )}
    </div>
  );
};

export default Sidebar;