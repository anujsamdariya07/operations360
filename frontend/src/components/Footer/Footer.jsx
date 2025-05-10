import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer
      className='flex flex-col md:flex-row items-center justify-between px-6 py-4 mt-8 border-t-2 border-[#ff851b] text-sm'
      style={{ backgroundColor: '#222222', color: '#ff851b' }}
    >
      <div className='mb-2 md:mb-0'>
        &copy; {new Date().getFullYear()} Operations360. All rights reserved.
      </div>

      <div className='flex gap-4'>
        <Link
          to='/'
          className='hover:underline hover:text-white transition duration-200'
        >
          Home
        </Link>
        <Link
          to='/dashboard'
          className='hover:underline hover:text-white transition duration-200'
        >
          Dashboard
        </Link>
        <Link
          to='/items'
          className='hover:underline hover:text-white transition duration-200'
        >
          Items
        </Link>
        <Link
          to='/employees'
          className='hover:underline hover:text-white transition duration-200'
        >
          Employees
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
