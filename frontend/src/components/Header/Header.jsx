import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { Bell } from 'lucide-react';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <header
      className='flex items-center justify-between px-6 py-3 border-b-2 border-[#ff851b]'
      style={{ backgroundColor: '#222222' }}
    >
      <div className='flex items-center gap-2'>
        <img src={logo} alt='Logo' className='h-10 w-auto' />
      </div>

      <div className='flex items-center gap-4'>
        {isLoggedIn ? (
          <>
            <Link
              to='/dashboard'
              className='px-4 py-2 bg-[#ff851b] text-white rounded-md font-medium transition duration-200 hover:bg-[#e67300] shadow-md'
            >
              Dashboard
            </Link>
            <Link
              to='/notifications'
              className='px-4 py-2 border border-[#ff851b] text-[#ff851b] rounded-md font-medium transition duration-200 hover:bg-[#ff851b] hover:text-white shadow-md flex gap-1 justify-between items-center'
            >
              <Bell width={20} />
              Notifications
            </Link>
          </>
        ) : (
          <>
            <Link
              to='/signin'
              className='px-4 py-2 border border-[#ff851b] text-[#ff851b] rounded-md font-medium transition duration-200 hover:bg-[#ff851b] hover:text-white shadow-md'
            >
              Sign In
            </Link>
            <Link
              to='/signup'
              className='px-4 py-2 bg-[#ff851b] text-white rounded-md font-medium transition duration-200 hover:bg-[#e67300] shadow-md'
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
