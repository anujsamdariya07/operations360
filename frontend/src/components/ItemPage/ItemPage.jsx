import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Pencil } from 'lucide-react';

const products = [
  {
    id: '1',
    name: 'Product 1',
    sku: 'P001',
    quantity: 5,
    threshold: 10,
    lastUpdated: '2025-05-10',
    image: '/path/to/image.jpg',
  },
  {
    id: '2',
    name: 'Product 2',
    sku: 'P002',
    quantity: 3,
    threshold: 5,
    lastUpdated: '2025-05-11',
    image: '/path/to/image.jpg',
  },
];

const ItemPage = () => {
  const { itemId } = useParams();
  const item = products.find((product) => product.id === itemId);

  const [isOpen, setIsOpen] = useState(false);
  const [quantity, setQuantity] = useState(item?.quantity || 0);
  const [threshold, setThreshold] = useState(item?.threshold || 0);
  const [vendor, setVendor] = useState('');
  const currentDate = new Date().toISOString().split('T')[0];

  if (!item) {
    return (
      <div className='flex items-center justify-center h-64 text-red-400'>
        Item not found
      </div>
    );
  }

  return (
    <div className='p-6 max-w-3xl mx-auto bg-[#2b2b2b] rounded-xl shadow-md text-white'>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-3xl font-bold text-[#ff851b]'>{item.name}</h1>
        <button
          className='btn btn-sm btn-outline border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-white'
          onClick={() => setIsOpen(true)}
        >
          <Pencil className='w-4 h-4 mr-1' />
          Edit
        </button>
      </div>

      {item.image && (
        <img
          src={
            item.image === '/path/to/image.jpg'
              ? 'https://img.freepik.com/premium-vector/isometric-cardboard-icon-cartoon-package-box-vector-illustration_175838-2453.jpg'
              : item.image
          }
          alt={item.name}
          className='rounded-lg w-[10vw] object-cover mb-4 border border-gray-700'
        />
      )}

      <p className='text-lg mb-2'>
        <span className='font-semibold text-gray-400'>SKU:</span> {item.sku}
      </p>
      <p className='text-lg mb-2'>
        <span className='font-semibold text-gray-400'>Quantity:</span>{' '}
        {quantity}
      </p>
      <p className='text-lg mb-2'>
        <span className='font-semibold text-gray-400'>Threshold:</span>{' '}
        {threshold}
      </p>
      <p className='text-lg'>
        <span className='font-semibold text-gray-400'>Last Updated:</span>{' '}
        {currentDate}
      </p>

      {/* Modal */}
      {isOpen && (
        <dialog className='modal modal-open'>
          {/* <div className='modal-box bg-[#262626] text-white border border-[#444] shadow-lg rounded-xl'>
            <h3 className='font-bold text-xl text-[#ff851b] mb-4'>
              Edit Item Details
            </h3>

            <div className='form-control space-y-2'>
              <label className='label text-sm text-gray-400'>Quantity</label>
              <input
                type='number'
                className='input input-bordered bg-[#3a3a3a] text-white focus:outline-none focus:ring-2 focus:ring-orange-500'
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />

              <label className='label text-sm text-gray-400'>Threshold</label>
              <input
                type='number'
                className='input input-bordered bg-[#3a3a3a] text-white focus:outline-none focus:ring-2 focus:ring-orange-500'
                value={threshold}
                onChange={(e) => setThreshold(Number(e.target.value))}
              />

              <label className='label text-sm text-gray-400'>Vendor Name</label>
              <input
                type='text'
                placeholder='Enter vendor name'
                className='input input-bordered bg-[#3a3a3a] text-white focus:outline-none focus:ring-2 focus:ring-orange-500'
                value={vendor}
                onChange={(e) => setVendor(e.target.value)}
              />

              <label className='label text-sm text-gray-400'>
                Last Updated
              </label>
              <input
                type='date'
                className='input input-bordered bg-[#3a3a3a] text-white cursor-not-allowed'
                value={currentDate}
                readOnly
              />
            </div>

            <div className='modal-action mt-6'>
              <button
                className='btn bg-orange-500 text-black hover:bg-orange-400'
                onClick={() => setIsOpen(false)}
              >
                Save Changes
              </button>
              <button
                className='btn btn-outline text-gray-300 hover:text-white'
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div> */}
          <div className='modal-box bg-gradient-to-br from-[#1f1f1f] to-[#2d2d2d] text-white border border-[#444] shadow-2xl rounded-2xl p-6 transition-all duration-300 ease-in-out'>
            <h3 className='font-bold text-2xl text-[#ff851b] mb-6 tracking-wide'>
              Edit Item Details
            </h3>

            <div className='form-control space-y-4'>
              <div>
                <label className='block text-sm text-gray-400 mb-1'>
                  Quantity
                </label>
                <input
                  type='number'
                  className='w-full px-4 py-2 rounded-lg bg-[#3a3a3a] text-white border border-[#555] focus:outline-none focus:ring-2 focus:ring-orange-500 transition'
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                />
              </div>

              <div>
                <label className='block text-sm text-gray-400 mb-1'>
                  Threshold
                </label>
                <input
                  type='number'
                  className='w-full px-4 py-2 rounded-lg bg-[#3a3a3a] text-white border border-[#555] focus:outline-none focus:ring-2 focus:ring-orange-500 transition'
                  value={threshold}
                  onChange={(e) => setThreshold(Number(e.target.value))}
                />
              </div>

              <div>
                <label className='block text-sm text-gray-400 mb-1'>
                  Vendor Name
                </label>
                <input
                  type='text'
                  placeholder='Enter vendor name'
                  className='w-full px-4 py-2 rounded-lg bg-[#3a3a3a] text-white border border-[#555] focus:outline-none focus:ring-2 focus:ring-orange-500 transition'
                  value={vendor}
                  onChange={(e) => setVendor(e.target.value)}
                />
              </div>

              <div>
                <label className='block text-sm text-gray-400 mb-1'>
                  Last Updated
                </label>
                <input
                  type='date'
                  className='w-full px-4 py-2 rounded-lg bg-[#2c2c2c] text-gray-400 border border-[#555] cursor-not-allowed'
                  value={currentDate}
                  readOnly
                />
              </div>
            </div>

            <div className='modal-action mt-8 flex justify-end space-x-3'>
              <button
                className='px-5 py-2 bg-orange-500 text-black font-semibold rounded-lg hover:bg-orange-400 hover:text-white transition'
                onClick={() => setIsOpen(false)}
              >
                Save Changes
              </button>
              <button
                className='px-5 py-2 border border-gray-500 text-gray-300 rounded-lg hover:text-white hover:border-white transition'
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default ItemPage;
