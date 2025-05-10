import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const links = [
  { path: '/dashboard', label: 'Dashboard' },
  { path: '/orders', label: 'Orders' },
  { path: '/employees', label: 'Employees' },
  { path: '/customers', label: 'Customers' },
  { path: '/items', label: 'Inventory' },
];

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* Hamburger Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setOpen(!open)}
          className="text-[#ff851b] bg-[#2d2d2d] p-2 rounded-full shadow-lg"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-[#1a1a1a] z-40 transform transition-transform duration-300 ease-in-out 
        ${open ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 w-64 p-6 border-r border-[#ff851b]/20`}
      >
        <h2 className="text-2xl font-bold text-[#ff851b] mb-8">MyOps</h2>
        <nav className="space-y-3">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`block px-4 py-2 rounded-lg ${
                location.pathname === link.path
                  ? 'bg-[#ff851b] text-black font-semibold'
                  : 'text-gray-300 hover:bg-[#333] hover:text-white'
              }`}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
