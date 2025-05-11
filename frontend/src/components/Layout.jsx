import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar/Sidebar';
import Header from './Header/Header';
import Footer from './Footer/Footer';

const Layout = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const hideLayoutRoutes = ['/', '/sign-in', '/sign-up'];
  const shouldHideLayout = hideLayoutRoutes.includes(location.pathname);

  if (shouldHideLayout) {
    return <Outlet />;
  }

  return (
    <div className='flex flex-col min-h-screen bg-[#222222]'>
      {/* Header */}
      <Header />

      {/* Main section: Sidebar + scrollable content */}
      <div className='flex flex-1'>
        {/* Fixed-height Sidebar */}
        <div className='hidden md:block w-64 h-screen sticky top-0'>
          <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
        </div>

        {/* Scrollable content area with Footer at the bottom */}
        <div className='flex-1 flex flex-col'>
          <div className='flex-1 overflow-y-auto p-4'>
            <Outlet />
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Layout;
