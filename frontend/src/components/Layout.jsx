import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar/Sidebar';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import { Menu } from 'lucide-react';

const Layout = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const hideLayoutRoutes = ['/', '/sign-in', '/sign-up'];
  const shouldHideLayout = hideLayoutRoutes.includes(location.pathname);

  return (
    <div className="flex flex-col bg-[#222222] min-h-screen">
      {!shouldHideLayout && (
        <Header>
          {/* Hamburger inside header */}
          <button
            className="text-[#ff851b] bg-[#2d2d2d] p-2 rounded-md ml-2"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu size={24} />
          </button>
        </Header>
      )}

      <div className="flex-1 flex flex-col md:flex-row transition-all">
        {/* Sidebar within content area, not above header/footer */}
        {!shouldHideLayout && (
          <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
        )}

        {/* Page Content */}
        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </div>

      {!shouldHideLayout && <Footer />}
    </div>
  );
};

export default Layout;
