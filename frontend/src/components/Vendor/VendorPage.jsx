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
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Vendors = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const vendors = [
    {
      id: 1,
      name: 'PaperMart Pvt Ltd',
      email: 'sales@papermart.com',
      phone: '+91 9876543210',
      gst: '27AABCU9603R1ZV',
      address: 'Mumbai, Maharashtra',
    },
    {
      id: 2,
      name: 'Boxify India',
      email: 'support@boxify.in',
      phone: '+91 9876543211',
      gst: '29AAACU1234B1ZV',
      address: 'Bangalore, Karnataka',
    },
    {
      id: 3,
      name: 'PrintPro Suppliers',
      email: 'contact@printpro.com',
      phone: '+91 9876543212',
      gst: '07AACCP1234E1ZV',
      address: 'Delhi, India',
    },
    {
      id: 4,
      name: 'LamiCoaters',
      email: 'info@lamicoaters.in',
      phone: '+91 9876543213',
      gst: '33AAACT1234F1ZV',
      address: 'Chennai, Tamil Nadu',
    },
    {
      id: 5,
      name: 'Madhya Paper Works',
      email: 'hello@mpw.com',
      phone: '+91 9876543214',
      gst: '23AAACM4321K1ZV',
      address: 'Jabalpur, Madhya Pradesh',
    },
  ];

  const filteredVendors = vendors.filter(
    (vendor) =>
      vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.phone.includes(searchTerm) ||
      vendor.gst.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const copyVendorLink = (vendorId) => {
    const url = `${window.location.origin}/vendors/${vendorId}`;
    navigator.clipboard.writeText(url);
    alert(`Link copied: ${url}`);
  };

  return (
    <div className='p-6 space-y-6 bg-[#1e1e1e] min-h-screen text-white'>
      {/* Header */}
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between'>
        <div>
          <h1 className='text-3xl font-bold text-[#ffb347]'>Vendors</h1>
          <p className='text-gray-400'>Manage your vendor partnerships</p>
        </div>
        <Link to='/vendors/new'>
          <button className='inline-flex items-center bg-[#ff851b] text-white px-4 py-2 rounded-md shadow hover:bg-[#ff6a00] transition'>
            <FaPlus className='mr-2' />
            Add Vendor
          </button>
        </Link>
      </div>

      {/* Search */}
      <div className='flex flex-col md:flex-row gap-4'>
        <div className='relative flex-1'>
          <FaSearch className='absolute top-3 left-3 text-gray-400' />
          <input
            type='text'
            placeholder='Search vendors...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='w-full pl-10 pr-4 py-2 border border-gray-600 rounded-md bg-[#2a2a2a] text-white placeholder-gray-400 focus:ring-2 focus:ring-[#ff851b]'
          />
        </div>
        <button className='px-4 py-2 border border-gray-600 rounded-md text-gray-300 hover:bg-[#333] transition'>
          <FaFilter />
        </button>
      </div>

      {/* Table */}
      <div className='bg-[#282828] border border-gray-700 rounded-lg shadow-md overflow-x-auto'>
        <div className='flex justify-between items-center px-6 py-4 border-b border-gray-600'>
          <h2 className='text-lg font-semibold text-[#ffb347]'>Vendor List</h2>
        </div>
        <table className='min-w-full table-auto text-sm'>
          <thead>
            <tr className='bg-[#3a3a3a] text-left text-gray-300'>
              <th className='p-4'>Name</th>
              <th className='p-4'>Email</th>
              <th className='p-4'>Phone</th>
              <th className='p-4'>Address</th>
              <th className='p-4'>GST</th>
              <th className='p-4'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredVendors.length > 0 ? (
              filteredVendors.map((vendor, idx) => (
                <tr
                  key={vendor.id}
                  className={`${
                    idx % 2 === 0 ? 'bg-[#2d2d2d]' : 'bg-[#252525]'
                  } hover:bg-[#3a3a3a] transition`}
                >
                  <td className='p-4'>
                    <div className='flex items-center gap-2'>
                      <FaUser className='text-gray-400' />
                      <span className='font-medium'>{vendor.name}</span>
                    </div>
                  </td>
                  <td className='p-4'>
                    <div className='flex items-center gap-2'>
                      <FaEnvelope className='text-gray-400' />
                      {vendor.email}
                    </div>
                  </td>
                  <td className='p-4'>
                    <div className='flex items-center gap-2'>
                      <FaPhone className='text-gray-400' />
                      {vendor.phone}
                    </div>
                  </td>
                  <td className='p-4'>
                    <div className='flex items-center gap-2'>
                      <FaMapMarkerAlt className='text-gray-400' />
                      {vendor.address}
                    </div>
                  </td>
                  <td className='p-4'>
                    {vendor.gst}
                  </td>
                  <td className='p-4'>
                    <div className='flex gap-2'>
                      <Link to={`/vendors/${vendor.id}`}>
                        <button className='text-[#ffb347] hover:underline text-sm'>
                          Details
                        </button>
                      </Link>
                      <button
                        onClick={() => copyVendorLink(vendor.id)}
                        className='text-gray-400 hover:text-white transition'
                        title='Copy Link'
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
                  No vendors found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Vendors;
