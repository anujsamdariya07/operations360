import { useState } from 'react';
import {
  FaSearch,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaPlus,
  FaFilter,
  FaCopy,
  FaSort,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Customers = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const customers = [
    {
      id: 1,
      name: 'Acme Corp',
      email: 'contact@acmecorp.com',
      phone: '+91 9876543210',
      location: 'New York, NY',
      orders: 12,
      status: 'Active',
    },
    {
      id: 2,
      name: 'TechGiant Inc',
      email: 'info@techgiant.com',
      phone: '+91 9876543211',
      location: 'San Francisco, CA',
      orders: 8,
      status: 'Active',
    },
    {
      id: 3,
      name: 'Global Supplies',
      email: 'orders@globalsupplies.com',
      phone: '+91 9876543212',
      location: 'Chicago, IL',
      orders: 5,
      status: 'Active',
    },
    {
      id: 4,
      name: 'Local Manufacturing',
      email: 'info@localmfg.com',
      phone: '+91 9876543213',
      location: 'Detroit, MI',
      orders: 3,
      status: 'Inactive',
    },
    {
      id: 5,
      name: 'City Builders',
      email: 'projects@citybuilders.com',
      phone: '+91 9876543214',
      location: 'Dallas, TX',
      orders: 7,
      status: 'Active',
    },
  ];

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm) ||
      customer.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const copyCustomerLink = (customerId) => {
    const url = `${window.location.origin}/customers/${customerId}`;
    navigator.clipboard.writeText(url);
    alert(`Link copied: ${url}`);
  };

  return (
    <div className='p-6 space-y-6 bg-[#2d2d2d] min-h-screen text-white'>
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between'>
        <div>
          <h1 className='text-3xl font-bold text-[#ff851b]'>Customers</h1>
          <p className='text-gray-400'>Manage your customer relationships</p>
        </div>
        <Link to={'/customers/new'}>
        <button className='inline-flex items-center bg-[#ff851b] text-white px-4 py-2 rounded hover:bg-[#ff571d]'>
          <FaPlus className='mr-2' />
          Add Customer
        </button>
        </Link>
      </div>

      <div className='flex flex-col md:flex-row gap-4'>
        <div className='relative flex-1'>
          <FaSearch className='absolute top-3 left-3 text-gray-400' />
          <input
            type='text'
            placeholder='Search customers...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='w-full pl-10 pr-4 py-2 border border-gray-600 rounded bg-[#3a3a3a] text-white placeholder-gray-400'
          />
        </div>
        <button className='px-4 py-2 border border-gray-600 rounded text-gray-300 hover:bg-[#444]'>
          <FaFilter />
        </button>
      </div>

      <div className='bg-[#1f1f1f] border border-gray-700 rounded shadow overflow-x-auto'>
        <div className='flex justify-between items-center px-6 py-4 border-b border-gray-700'>
          <h2 className='text-lg font-semibold text-[#ff851b]'>
            Customer List
          </h2>
          <button className='text-gray-300 border border-gray-600 px-3 py-1 rounded hover:bg-[#333]'>
            <FaSort className='inline mr-2' />
            Sort
          </button>
        </div>
        <table className='min-w-full table-auto text-sm text-white'>
          <thead>
            <tr className='bg-[#3a3a3a] text-left'>
              <th className='p-4'>Customer</th>
              <th className='p-4'>Contact</th>
              <th className='p-4'>Location</th>
              <th className='p-4'>Orders</th>
              <th className='p-4'>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.length > 0 ? (
              filteredCustomers.map((customer) => (
                <tr
                  key={customer.id}
                  className='border-b border-gray-700 hover:bg-[#333]'
                >
                  <td className='p-4'>
                    <div className='flex items-center gap-3'>
                      <FaUser className='text-gray-400' />
                      <div>
                        <div className='font-semibold'>{customer.name}</div>
                        <div className='text-gray-400 text-sm flex items-center'>
                          <FaEnvelope className='mr-1' />
                          {customer.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className='p-4 flex items-center text-gray-300'>
                    <FaPhone className='mr-2 text-gray-400' />
                    {customer.phone}
                  </td>
                  <td className='p-4 flex items-center text-gray-300'>
                    <FaMapMarkerAlt className='mr-2 text-gray-400' />
                    {customer.location}
                  </td>
                  <td className='p-4 text-white'>{customer.orders}</td>
                  <td className='p-4'>
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        customer.status === 'Active'
                          ? 'bg-green-800 text-green-300'
                          : 'bg-gray-600 text-gray-300'
                      }`}
                    >
                      {customer.status}
                    </span>
                  </td>
                  <td className='p-4'>
                    <div className='flex gap-2'>
                      <Link to={`/customers/${customer.id}`}>
                      <button
                        className='text-[#ff851b] hover:underline'
                        // onClick={() => alert(`Edit customer ${customer.id}`)}
                        >
                        Details
                      </button>
                        </Link>
                      <button
                        onClick={() => copyCustomerLink(customer.id)}
                        title='Copy link'
                        className='text-gray-400 hover:text-white'
                      >
                        <FaCopy />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className='p-4 text-center text-gray-400'>
                  No customers found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Customers;
