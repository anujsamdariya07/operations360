import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useVendorStore from '../../store/useVendorStore';
import { LoaderCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';

const NewVendor = () => {
  const navigate = useNavigate();
  const { createVendor, loading } = useVendorStore();

  const [vendorForm, setVendorForm] = useState({
    name: '',
    email: '',
    phone: '',
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation for required fields
    if (!vendorForm.name || !vendorForm.phone || !vendorForm.companyName) {
      toast.error('Please fill in all required fields.');
      return;
    }

    // Prepare the data for vendor creation
    const vendorData = {
      name: vendorForm.name,
      email: vendorForm.email,
      phone: vendorForm.phone,
      gstNo: vendorForm.gstNo,
      address: vendorForm.address,
    };

    // Call createVendor function from the store
    try {
      await createVendor(vendorData);
      navigate('/vendors'); // Navigate after success
    } catch (error) {
      console.error('Error creating vendor:', error);
      toast.error('Error creating vendor');
    }
  };

  return (
    <div className='space-y-6 p-6 bg-[#2d2d2d] min-h-screen text-white'>
      <div>
        <h1 className='text-3xl font-bold text-[#ff851b]'>Add New Vendor</h1>
        <p className='text-gray-400'>
          Enter vendor details to add them to the system
        </p>
      </div>

      <form onSubmit={handleSubmit} className='space-y-8'>
        {/* Vendor Information */}
        <div className='bg-[#1f1f1f] border border-gray-700 p-6 rounded-md'>
          <h2 className='font-bold text-lg mb-2 text-[#ff851b]'>
            Vendor Information
          </h2>
          <p className='text-sm text-gray-400 mb-4'>
            Basic information about the vendor
          </p>
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
            <div className='space-y-2'>
              <label htmlFor='name' className='block text-sm font-medium'>
                Contact Person Name
              </label>
              <input
                id='name'
                name='name'
                value={vendorForm.name}
                onChange={handleFormChange}
                placeholder='Enter contact person name'
                className='input input-bordered w-full bg-[#3a3a3a] text-white border-gray-600 placeholder-gray-400'
                required
              />
            </div>

            <div className='space-y-2'>
              <label
                htmlFor='companyName'
                className='block text-sm font-medium'
              >
                Company Name
              </label>
              <input
                id='companyName'
                name='companyName'
                value={vendorForm.companyName}
                onChange={handleFormChange}
                placeholder='Enter company name'
                className='input input-bordered w-full bg-[#3a3a3a] text-white border-gray-600 placeholder-gray-400'
                required
              />
            </div>

            <div className='space-y-2'>
              <label htmlFor='phone' className='block text-sm font-medium'>
                Phone Number
              </label>
              <input
                id='phone'
                name='phone'
                value={vendorForm.phone}
                onChange={handleFormChange}
                placeholder='Enter phone number'
                className='input input-bordered w-full bg-[#3a3a3a] text-white border-gray-600 placeholder-gray-400'
                required
              />
            </div>

            <div className='space-y-2'>
              <label htmlFor='email' className='block text-sm font-medium'>
                Email Address
              </label>
              <input
                id='email'
                name='email'
                type='email'
                value={vendorForm.email}
                onChange={handleFormChange}
                placeholder='Enter email address'
                className='input input-bordered w-full bg-[#3a3a3a] text-white border-gray-600 placeholder-gray-400'
              />
            </div>

            <div className='space-y-2 sm:col-span-2'>
              <label htmlFor='address' className='block text-sm font-medium'>
                Full Address
              </label>
              <textarea
                id='address'
                name='address'
                value={vendorForm.address}
                onChange={handleFormChange}
                placeholder='Enter complete address'
                rows={3}
                className='textarea textarea-bordered w-full bg-[#3a3a3a] text-white border-gray-600 placeholder-gray-400'
              />
            </div>
          </div>
        </div>

        {/* Business Details */}
        <div className='bg-[#1f1f1f] border border-gray-700 p-6 rounded-md'>
          <h2 className='font-bold text-lg mb-2 text-[#ff851b]'>
            Business Details
          </h2>
          <p className='text-sm text-gray-400 mb-4'>
            Additional information for business vendors
          </p>
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
            <div className='space-y-2'>
              <label htmlFor='gstNo' className='block text-sm font-medium'>
                GST Number
              </label>
              <input
                id='gstNo'
                name='gstNo'
                value={vendorForm.gstNo}
                onChange={handleFormChange}
                placeholder='Enter GST number'
                className='input input-bordered w-full bg-[#3a3a3a] text-white border-gray-600 placeholder-gray-400'
              />
            </div>

            <div className='space-y-2'>
              <label
                htmlFor='bankDetails'
                className='block text-sm font-medium'
              >
                Bank Details
              </label>
              <input
                id='bankDetails'
                name='bankDetails'
                value={vendorForm.bankDetails}
                onChange={handleFormChange}
                placeholder='Bank name, A/C no., IFSC'
                className='input input-bordered w-full bg-[#3a3a3a] text-white border-gray-600 placeholder-gray-400'
              />
            </div>

            <div className='space-y-2'>
              <label htmlFor='status' className='block text-sm font-medium'>
                Status
              </label>
              <input
                type='text'
                id='status'
                name='status'
                defaultValue={vendorForm.status}
                className='select select-bordered w-full bg-[#3a3a3a] text-white border-gray-600'
              />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className='flex justify-end gap-4'>
          <button
            type='button'
            className='px-4 py-2 rounded border border-gray-600 text-gray-300 hover:bg-[#444]'
            onClick={() => navigate('/dashboard/vendors')}
          >
            Cancel
          </button>
          <button
            type='submit'
            className='inline-flex items-center bg-[#ff851b] text-white px-4 py-2 rounded hover:bg-[#ff571d]'
            loading={loading}
          >
            {loading ? (
              <LoaderCircle className='animate-spin' />
            ) : (
              'Save Vendor'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewVendor;
