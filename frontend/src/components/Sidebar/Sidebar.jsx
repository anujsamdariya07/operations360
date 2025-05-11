import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Package,
  Users,
  ShoppingCart,
  LayoutDashboard,
  LogOut,
} from 'lucide-react';
import useAuthStore from '../../store/useAuthStore';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { logout } = useAuthStore();

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Employees', icon: Users, path: '/employees' },
    { name: 'Customers', icon: Users, path: '/customers' },
    { name: 'Orders', icon: ShoppingCart, path: '/orders' },
    { name: 'Inventory', icon: Package, path: '/items' },
  ];

  return (
    <>
      {/* Overlay Dropdown (when sidebar is open on small screens) */}
      {isOpen && (
        <div className='fixed top-16 left-4 right-4 z-30 md:hidden bg-[#1a1a1a] border border-[#ff851b]/20 rounded-lg p-4 shadow-xl'>
          <nav className='space-y-3'>
            {navItems.map(({ name, icon: Icon, path }) => (
              <NavLink
                key={name}
                to={path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-md transition-colors duration-200 ${
                    isActive
                      ? 'bg-[#ff851b]/10 text-[#ff851b]'
                      : 'text-gray-300 hover:bg-[#ff851b]/5 hover:text-[#ff851b]'
                  }`
                }
              >
                <Icon size={18} />
                <span>{name}</span>
              </NavLink>
            ))}
          </nav>

          <button
            onClick={() => {
              logout();
              setIsOpen(false);
            }}
            className='mt-6 flex items-center gap-3 text-red-400 hover:text-red-300 px-3 py-2 rounded-md transition'
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      )}

      {/* Permanent Sidebar on Desktop */}
      <div
        className={`hidden md:flex md:w-64 flex-col justify-between bg-[#1a1a1a] border-r border-[#ff851b]/20 p-6 h-screen sticky`}
      >
        <div>
          <h2 className='text-2xl font-bold text-[#ff851b] mb-8 tracking-wide'>
            Ops Manager
          </h2>

          <nav className='space-y-4'>
            {navItems.map(({ name, icon: Icon, path }) => (
              <NavLink
                key={name}
                to={path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-md transition-colors duration-200 ${
                    isActive
                      ? 'bg-[#ff851b]/10 text-[#ff851b]'
                      : 'text-gray-300 hover:bg-[#ff851b]/5 hover:text-[#ff851b]'
                  }`
                }
              >
                <Icon size={20} />
                <span>{name}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        <div className='pt-8'>
          <button
            onClick={() => {
              logout();
              setIsOpen(false);
            }}
            className='flex items-center gap-3 text-red-400 hover:text-red-300 px-3 py-2 rounded-md transition'
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
