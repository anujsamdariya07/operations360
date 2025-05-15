import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useCustomerStore from '../../store/useCustomerStore';
import {LoaderCircle} from 'lucide-react'

const NewCustomer = () => {
  const navigate = useNavigate();
  const { createCustomer, loading } = useCustomerStore();

  const [customerForm, setCustomerForm] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    address: '',
    gstNo: '',
    status: 'active',
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setCustomerForm({
      ...customerForm,
      [name]: value,
    });
  };

  const handleSelectChange = (name, value) => {
    setCustomerForm({
      ...customerForm,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!customerForm.name || !customerForm.phone) {
      alert('Please fill in all required fields.');
      return;
    }

    const success = await createCustomer(customerForm);
    if (success) {
      navigate('/customers');
    }
  };

  return (
    <div className='space-y-6 p-6 bg-[#2d2d2d] min-h-screen text-white'>
      <div>
        <h1 className='text-3xl font-bold text-[#ff851b]'>Add New Customer</h1>
        <p className='text-gray-400'>
          Enter customer details to add them to the system
        </p>
      </div>

      <form onSubmit={handleSubmit} className='space-y-8'>
        {/* Customer Information Card */}
        <div className='bg-[#1f1f1f] border border-gray-700 p-6 rounded-md'>
          <h2 className='font-bold text-lg mb-2 text-[#ff851b]'>
            Customer Information
          </h2>
          <p className='text-sm text-gray-400 mb-4'>
            Basic information about the customer
          </p>
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
            <div className='space-y-2'>
              <label htmlFor='name' className='block text-sm font-medium'>
                Customer Name
              </label>
              <input
                id='name'
                name='name'
                value={customerForm.name}
                onChange={handleFormChange}
                placeholder='Enter customer name'
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
                value={customerForm.email}
                onChange={handleFormChange}
                placeholder='Enter email address'
                className='input input-bordered w-full bg-[#3a3a3a] text-white border-gray-600 placeholder-gray-400'
              />
            </div>

            <div className='space-y-2'>
              <label htmlFor='phone' className='block text-sm font-medium'>
                Phone Number
              </label>
              <input
                id='phone'
                name='phone'
                value={customerForm.phone}
                onChange={handleFormChange}
                placeholder='Enter phone number'
                className='input input-bordered w-full bg-[#3a3a3a] text-white border-gray-600 placeholder-gray-400'
                required
              />
            </div>

            <div className='space-y-2'>
              <label htmlFor='location' className='block text-sm font-medium'>
                Location
              </label>
              <input
                id='location'
                name='location'
                value={customerForm.location}
                onChange={handleFormChange}
                placeholder='Enter city, state'
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
                value={customerForm.address}
                onChange={handleFormChange}
                placeholder='Enter complete address'
                rows={3}
                className='textarea textarea-bordered w-full bg-[#3a3a3a] text-white border-gray-600 placeholder-gray-400'
                required
              />
            </div>
          </div>
        </div>

        {/* Business Details Card */}
        <div className='bg-[#1f1f1f] border border-gray-700 p-6 rounded-md'>
          <h2 className='font-bold text-lg mb-2 text-[#ff851b]'>
            Business Details
          </h2>
          <p className='text-sm text-gray-400 mb-4'>
            Additional information for business customers
          </p>
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
            <div className='space-y-2'>
              <label htmlFor='gstNo' className='block text-sm font-medium'>
                GST Number
              </label>
              <input
                id='gstNo'
                name='gstNo'
                value={customerForm.gstNo}
                onChange={handleFormChange}
                placeholder='Enter GST number'
                className='input input-bordered w-full bg-[#3a3a3a] text-white border-gray-600 placeholder-gray-400'
                required
              />
            </div>

            <div className='space-y-2'>
              <label htmlFor='status' className='block text-sm font-medium'>
                Status
              </label>
              <input
                id='status'
                name='status'
                defaultValue={'active'}
                className='select select-bordered w-full bg-[#3a3a3a] text-white border-gray-600'
                readOnly
              />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className='flex justify-end gap-4'>
          <button
            type='button'
            className='px-4 py-2 rounded border border-gray-600 text-gray-300 hover:bg-[#444]'
            onClick={() => navigate('/customers')}
          >
            Cancel
          </button>
          <button
            type='submit'
            className='inline-flex items-center bg-[#ff851b] text-white px-4 py-2 rounded hover:bg-[#ff571d]'
            disabled={loading}
          >
            {loading? (
              <LoaderCircle className='animate-spin'/>
            ):'Save Customer'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewCustomer;
