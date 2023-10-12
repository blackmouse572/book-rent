import React, { useState } from 'react';

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      {isOpen ? (
        <aside
          id="default-sidebar"
          className="fixed top-0 left-0 z-40 w-64 h-screen bg-gray-800 text-white transition-transform translate-x-0 sm:translate-x-0 overflow-y-auto"
          aria-label="Sidebar"
        >
          <div className="h-full p-3">
            <div className="flex items-center justify-between mb-6">
              <div className="text-2xl font-semibold">BookRental</div>
              <button
                onClick={toggleSidebar}
                type="button"
                className="text-gray-400 hover:text-white focus:outline-none focus:text-white"
              >
                <span className="sr-only">Toggle sidebar</span>
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
            <nav className="space-y-2">
          <a
            href="#"
            className="block p-2 rounded hover:bg-gray-600"
          >
            Dashboard
          </a>
          <a
            href="#"
            className="block p-2 rounded hover:bg-gray-600"
          >
            manage book
          </a>
          <a
            href="#"
            className="block p-2 rounded hover:bg-gray-600"
          >
            Inbox
            <span className="ml-2 bg-red-500 text-white rounded-full p-1 text-xs">3</span>
          </a>
          <a
            href="#"
            className="block p-2 rounded hover:bg-gray-600"
          >
            manage Users
          </a>
          <a
            href="#"
            className="block p-2 rounded hover:bg-gray-600"
          >
            manage transaction
          </a>
          <a
            href="#"
            className="block p-2 rounded hover:bg-gray-600"
          >
            Sign In
          </a>
          <a
            href="#"
            className="block p-2 rounded hover:bg-gray-600"
          >
            Sign Up
          </a>
        </nav>
          </div>
        </aside>
      ) : (
        <button
        onClick={toggleSidebar}
        type="button"
        className={`fixed top-0 left-0 z-50 w-12 h-12 bg-gray-800 text-white hover:bg-gray-600 focus:outline-none ${
          isOpen ? 'rotate-180' : ''
        }`}
        aria-label={isOpen ? 'Close Sidebar' : 'Open Sidebar'}
      >
        <svg
          className="w-6 h-6 mx-auto my-3 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
          />
        </svg>
      </button>
      )}
    </div>
  );
};

export default Sidebar;