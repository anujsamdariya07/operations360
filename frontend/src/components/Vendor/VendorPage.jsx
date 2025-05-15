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
import useVendorStore from '../../store/useVendorStore';

const Vendors = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { vendors, fetchVendors, loading } = useVendorStore();

  useEffect(() => {
    fetchVendors();
  }, [fetchVendors]);

  const filteredVendors = vendors.filter((vendor) =>
    [vendor.name, vendor.email, vendor.phone, vendor.gstNo, vendor.address]
      .some((field) => field?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const copyVendorLink = (vendorId) => {
    const url = `${window.location.origin}/vendors/${vendorId}`;
    navigator.clipboard.writeText(url);
    alert(`Link copied: ${url}`);
  };

  return (
    <div className="p-6 space-y-6 bg-[#2d2d2d] min-h-screen text-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#ff851b]">Vendors</h1>
          <p className="text-gray-400">Manage your vendor partnerships</p>
        </div>
        <Link to="/vendors/new">
          <button className="inline-flex items-center bg-[#ff851b] text-white px-4 py-2 rounded hover:bg-[#ff571d]">
            <FaPlus className="mr-2" />
            Add Vendor
          </button>
        </Link>
      </div>

      {/* Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <FaSearch className="absolute top-3 left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search vendors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-600 rounded bg-[#3a3a3a] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff851b]"
          />
        </div>
        <button className="px-4 py-2 border border-gray-600 rounded text-gray-300 hover:bg-[#444]">
          <FaFilter />
        </button>
      </div>

      {/* Table */}
      <div className="bg-[#1f1f1f] border border-gray-700 rounded shadow overflow-x-auto">
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-700">
          <h2 className="text-lg font-semibold text-[#ff851b]">Vendor List</h2>
          <button className="text-gray-300 border border-gray-600 px-3 py-1 rounded hover:bg-[#333]">
            <FaSort className="inline mr-2" />
            Sort
          </button>
        </div>

        {loading ? (
          <div className="p-6 text-center text-gray-400">Loading vendors...</div>
        ) : (
          <table className="min-w-full text-sm text-white table-fixed">
            <thead className="sticky top-0 z-10 bg-[#3a3a3a] border-b border-gray-700 shadow">
              <tr className="text-left text-gray-300 uppercase tracking-wider text-xs">
                <th className="p-4 font-semibold">Vendor</th>
                <th className="p-4 font-semibold">Contact</th>
                <th className="p-4 font-semibold">Address</th>
                <th className="p-4 font-semibold text-center">GST</th>

                <th className="p-4 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredVendors.length > 0 ? (
                filteredVendors.map((vendor, idx) => (
                  <tr
                    key={vendor._id || vendor.id}
                    className={`transition-colors duration-200 hover:bg-[#393939] ${
                      idx % 2 === 0 ? 'bg-[#2b2b2b]' : 'bg-[#1f1f1f]'
                    }`}
                  >
                    <td className="p-4">
                      <div className="flex items-start gap-3">
                        <FaUser className="text-[#ff851b]" />
                        <div>
                          <div className="font-medium text-white">{vendor.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <FaEnvelope className="mr-1 text-sm" />
                        <span className="text-gray-300">{vendor.email}</span>
                      </div>
                    </td>
                    <td className="p-4 text-left">
                      <div className="flex items-center text-gray-300">
                        <FaMapMarkerAlt className="mr-2 text-gray-400" />
                        {vendor.address || 'N/A'}
                      </div>
                    </td>
                    <td className="p-4 text-center">{vendor.gstNo}</td>
                    <td className="p-4 text-center">
                      <div className="flex justify-center gap-4">
                        <Link to={`/vendors/${vendor.id}`}>
                          <button className="text-[#ff851b] hover:underline text-sm font-medium">
                            Details
                          </button>
                        </Link>
                        <button
                          onClick={() => copyVendorLink(vendor._id || vendor.id)}
                          className="text-gray-400 hover:text-white transition duration-150"
                          title="Copy Link"
                        >
                          <FaCopy />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-6 text-center text-gray-400">
                    No vendors found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Vendors;
