import { useEffect, useState } from 'react';
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
import useCustomerStore from '../../store/useCustomerStore';

const Customers = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const { customers, fetchCustomers, loading } = useCustomerStore();

  useEffect(() => {
    fetchCustomers();
  }, []);

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm) ||
      customer.address?.toLowerCase().includes(searchTerm.toLowerCase())
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
            className='w-full pl-10 pr-4 py-2 border border-gray-600 rounded bg-[#3a3a3a] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff851b]'
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
        <table className='min-w-full text-sm text-white table-fixed'>
          <thead className='sticky top-0 z-10 bg-[#3a3a3a] border-b border-gray-700 shadow'>
            <tr className='text-left text-gray-300 uppercase tracking-wider text-xs'>
              <th className='p-4 font-semibold'>Customer</th>
              <th className='p-4 font-semibold'>Contact</th>
              <th className='p-4 font-semibold'>Address</th>
              <th className='p-4 font-semibold text-center'>Orders</th>
              <th className='p-4 font-semibold text-center'>Status</th>
              <th className='p-4 font-semibold text-center'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className='p-6 text-center text-gray-400'>
                  Loading customers...
                </td>
              </tr>
            ) : filteredCustomers.length > 0 ? (
              filteredCustomers.map((customer, index) => (
                <tr
                  key={customer._id}
                  className={`transition-colors duration-200 hover:bg-[#393939] ${
                    index % 2 === 0 ? 'bg-[#2b2b2b]' : 'bg-[#1f1f1f]'
                  }`}
                >
                  <td className='p-4'>
                    <div className='flex items-start gap-3'>
                      <FaUser className='text-[#ff851b] mt-1' />
                      <div>
                        <div className='font-medium text-white'>
                          {customer.name}
                        </div>
                        <div className='text-gray-400 text-xs flex items-center'>
                          <FaEnvelope className='mr-1 text-sm' />
                          {customer.email}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className='p-4'>
                    <div className='flex items-center text-gray-300'>
                      <FaPhone className='mr-2 text-gray-400' />
                      {customer.phone}
                    </div>
                  </td>

                  <td className='p-4'>
                    <div className='flex items-center text-gray-300'>
                      <FaMapMarkerAlt className='mr-2 text-gray-400' />
                      {customer.address || 'N/A'}
                    </div>
                  </td>

                  <td className='p-4 text-center text-white font-semibold'>
                    {customer.orders?.length ?? 0}
                  </td>

                  <td className='p-4 text-center'>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        customer.status === 'active'
                          ? 'bg-green-700 text-green-300'
                          : 'bg-gray-600 text-gray-300'
                      }`}
                    >
                      {customer.status}
                    </span>
                  </td>

                  <td className='p-4 text-center'>
                    <div className='flex justify-center gap-4'>
                      <Link to={`/customers/${customer.id}`}>
                        <button className='text-[#ff851b] hover:underline text-sm font-medium'>
                          Details
                        </button>
                      </Link>
                      <button
                        onClick={() => copyCustomerLink(customer.id)}
                        title='Copy link'
                        className='text-gray-400 hover:text-white transition duration-150'
                      >
                        <FaCopy />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className='p-6 text-center text-gray-400'>
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
