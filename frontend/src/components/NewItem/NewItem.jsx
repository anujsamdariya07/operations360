import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NewItem = () => {
  const navigate = useNavigate();

  const [itemForm, setItemForm] = useState({
    name: '',
    sku: '',
    quantity: '',
    threshold: '',
    image: '',
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setItemForm({
      ...itemForm,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, sku, quantity, threshold } = itemForm;

    if (!name || !sku || !quantity || !threshold) {
      alert('Please fill in all required fields.');
      return;
    }

    console.log('Item created:', {
      id: Math.floor(Math.random() * 1000),
      ...itemForm,
      lastUpdated: new Date().toISOString().split('T')[0],
    });

    navigate('/dashboard/items');
  };

  return (
    <div className='space-y-6 p-6 bg-[#2d2d2d] min-h-screen text-white'>
      <div>
        <h1 className='text-3xl font-bold text-[#ff851b]'>Add New Item</h1>
        <p className='text-gray-400'>
          Enter product details to add it to the inventory
        </p>
      </div>

      <form onSubmit={handleSubmit} className='space-y-8'>
        <div className='bg-[#1f1f1f] border border-gray-700 p-6 rounded-md'>
          <h2 className='font-bold text-lg mb-2 text-[#ff851b]'>
            Item Information
          </h2>
          <p className='text-sm text-gray-400 mb-4'>
            Provide essential information about the product
          </p>
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
            <div className='space-y-2'>
              <label htmlFor='name' className='block text-sm font-medium'>
                Item Name
              </label>
              <input
                id='name'
                name='name'
                value={itemForm.name}
                onChange={handleFormChange}
                placeholder='Enter product name'
                className='w-full px-4 py-2 rounded-lg bg-[#3a3a3a] text-white border border-[#555] focus:outline-none focus:ring-2 focus:ring-orange-500 transition'
                required
              />
            </div>

            <div className='space-y-2'>
              <label htmlFor='sku' className='block text-sm font-medium'>
                SKU
              </label>
              <input
                id='sku'
                name='sku'
                value={itemForm.sku}
                onChange={handleFormChange}
                placeholder='Enter product SKU'
                className='w-full px-4 py-2 rounded-lg bg-[#3a3a3a] text-white border border-[#555] focus:outline-none focus:ring-2 focus:ring-orange-500 transition'
                required
              />
            </div>

            <div className='space-y-2'>
              <label htmlFor='quantity' className='block text-sm font-medium'>
                Quantity
              </label>
              <input
                id='quantity'
                name='quantity'
                type='number'
                min='0'
                value={itemForm.quantity}
                onChange={handleFormChange}
                placeholder='Enter quantity in stock'
                className='w-full px-4 py-2 rounded-lg bg-[#3a3a3a] text-white border border-[#555] focus:outline-none focus:ring-2 focus:ring-orange-500 transition'
                required
              />
            </div>

            <div className='space-y-2'>
              <label htmlFor='threshold' className='block text-sm font-medium'>
                Threshold
              </label>
              <input
                id='threshold'
                name='threshold'
                type='number'
                min='0'
                value={itemForm.threshold}
                onChange={handleFormChange}
                placeholder='Enter threshold value'
                // className='input input-bordered w-full bg-[#3a3a3a] text-white border-gray-600 placeholder-gray-400'
                className='w-full px-4 py-2 rounded-lg bg-[#3a3a3a] text-white border border-[#555] focus:outline-none focus:ring-2 focus:ring-orange-500 transition'
                required
              />
            </div>

            <div className='space-y-2 sm:col-span-2'>
              <label htmlFor='image' className='block text-sm font-medium'>
                Upload Image
              </label>
              <input
                id='image'
                name='image'
                type='file'
                accept='image/*'
                onChange={handleFormChange}
                className='file-input file-input-bordered w-full bg-[#3a3a3a] text-white border-gray-600 placeholder-gray-400 file:bg-[#ff851b] file:text-white file:border-none file:cursor-pointer hover:file:bg-orange-500 transition duration-200'
              />
            </div>
          </div>
        </div>

        <div className='flex justify-end'>
          <button
            type='submit'
            className='bg-[#ff851b] text-white px-6 py-2 rounded hover:bg-[#ff571d]'
          >
            Save Item
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewItem;
