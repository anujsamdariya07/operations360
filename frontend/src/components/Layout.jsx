import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar/Sidebar';
import Header from './Header/Header';
import Footer from './Footer/Footer';

const Layout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 md:ml-64 p-4 bg-[#222222] min-h-screen">
        <Header/>
        <Outlet />
        <Footer/>
      </main>
    </div>
  );
};

export default Layout;
