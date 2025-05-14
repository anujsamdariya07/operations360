import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NewVendor = () => {
  const navigate = useNavigate();

  const [vendorForm, setVendorForm] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    address: '',
    gstNo: '',
    status: 'active',
    companyName: '',
    bankDetails: '',
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setVendorForm({
      ...vendorForm,
      [name]: value,
    });
  };

  const handleSelectChange = (name, value) => {
    setVendorForm({
      ...vendorForm,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!vendorForm.name || !vendorForm.phone || !vendorForm.companyName) {
      alert('Please fill in all required fields.');
      return;
    }

    console.log('Vendor created:', {
      id: Math.floor(Math.random() * 1000),
      ...vendorForm,
      supplies: 0,
    });

    navigate('/dashboard/vendors');
  };

  return (
    <div className="space-y-6 p-6 bg-[#2d2d2d] min-h-screen text-white">
      <div>
        <h1 className="text-3xl font-bold text-[#ff851b]">Add New Vendor</h1>
        <p className="text-gray-400">
          Enter vendor details to add them to the system
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Vendor Information */}
        <div className="bg-[#1f1f1f] border border-gray-700 p-6 rounded-md">
          <h2 className="font-bold text-lg mb-2 text-[#ff851b]">
            Vendor Information
          </h2>
          <p className="text-sm text-gray-400 mb-4">
            Basic information about the vendor
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium">
                Contact Person Name
              </label>
              <input
                id="name"
                name="name"
                value={vendorForm.name}
                onChange={handleFormChange}
                placeholder="Enter contact person name"
                className="input input-bordered w-full bg-[#3a3a3a] text-white border-gray-600 placeholder-gray-400"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="companyName" className="block text-sm font-medium">
                Company Name
              </label>
              <input
                id="companyName"
                name="companyName"
                value={vendorForm.companyName}
                onChange={handleFormChange}
                placeholder="Enter company name"
                className="input input-bordered w-full bg-[#3a3a3a] text-white border-gray-600 placeholder-gray-400"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="phone" className="block text-sm font-medium">
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                value={vendorForm.phone}
                onChange={handleFormChange}
                placeholder="Enter phone number"
                className="input input-bordered w-full bg-[#3a3a3a] text-white border-gray-600 placeholder-gray-400"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={vendorForm.email}
                onChange={handleFormChange}
                placeholder="Enter email address"
                className="input input-bordered w-full bg-[#3a3a3a] text-white border-gray-600 placeholder-gray-400"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="location" className="block text-sm font-medium">
                Location
              </label>
              <input
                id="location"
                name="location"
                value={vendorForm.location}
                onChange={handleFormChange}
                placeholder="Enter city, state"
                className="input input-bordered w-full bg-[#3a3a3a] text-white border-gray-600 placeholder-gray-400"
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <label htmlFor="address" className="block text-sm font-medium">
                Full Address
              </label>
              <textarea
                id="address"
                name="address"
                value={vendorForm.address}
                onChange={handleFormChange}
                placeholder="Enter complete address"
                rows={3}
                className="textarea textarea-bordered w-full bg-[#3a3a3a] text-white border-gray-600 placeholder-gray-400"
              />
            </div>
          </div>
        </div>

        {/* Business Details */}
        <div className="bg-[#1f1f1f] border border-gray-700 p-6 rounded-md">
          <h2 className="font-bold text-lg mb-2 text-[#ff851b]">
            Business Details
          </h2>
          <p className="text-sm text-gray-400 mb-4">
            Additional information for business vendors
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="gstNo" className="block text-sm font-medium">
                GST Number
              </label>
              <input
                id="gstNo"
                name="gstNo"
                value={vendorForm.gstNo}
                onChange={handleFormChange}
                placeholder="Enter GST number"
                className="input input-bordered w-full bg-[#3a3a3a] text-white border-gray-600 placeholder-gray-400"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="bankDetails" className="block text-sm font-medium">
                Bank Details
              </label>
              <input
                id="bankDetails"
                name="bankDetails"
                value={vendorForm.bankDetails}
                onChange={handleFormChange}
                placeholder="Bank name, A/C no., IFSC"
                className="input input-bordered w-full bg-[#3a3a3a] text-white border-gray-600 placeholder-gray-400"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="status" className="block text-sm font-medium">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={vendorForm.status}
                onChange={(e) => handleSelectChange('status', e.target.value)}
                className="select select-bordered w-full bg-[#3a3a3a] text-white border-gray-600"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            className="px-4 py-2 rounded border border-gray-600 text-gray-300 hover:bg-[#444]"
            onClick={() => navigate('/dashboard/vendors')}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="inline-flex items-center bg-[#ff851b] text-white px-4 py-2 rounded hover:bg-[#ff571d]"
          >
            Save Vendor
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewVendor;
