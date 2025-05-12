import React, { useState } from 'react';
import { FaRegTrashAlt, FaPlus } from 'react-icons/fa';
import { CiEdit } from 'react-icons/ci';
import { LuCopy } from 'react-icons/lu';
import { Link } from 'react-router-dom';
import { Copy } from 'lucide-react';

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

const Items = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openDeleteDialog = (productId) => {
    setDeleteProductId(productId);
    setIsDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setDeleteProductId(null);
  };

  const deleteProduct = () => {
    console.log('Deleted product with ID:', deleteProductId);
    closeDeleteDialog();
  };

  const Badge = ({ quantity, threshold }) => {
    const isLowStock = quantity < threshold;
    return (
      <span
        className={`px-2 py-1 text-xs rounded font-semibold ${
          isLowStock ? 'bg-yellow-500 text-white' : 'bg-green-500 text-white'
        }`}
      >
        {isLowStock ? 'Low Stock' : 'In Stock'}
      </span>
    );
  };

  return (
    <div className='space-y-6'>
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <div>
          <h1 className='text-3xl font-bold text-[#ff851b]'>Inventory</h1>
          <p className='text-gray-400'>Manage and track product inventory</p>
        </div>
        <Link to={'/items/new'}>
          <button className='inline-flex items-center bg-[#ff851b] text-white px-4 py-2 rounded hover:bg-[#ff571d]'>
            <FaPlus className='w-4 h-4 mr-2' />
            Add Item
          </button>
        </Link>
      </div>

      <div className='flex gap-4'>
        <div className='relative flex-1'>
          <input
            type='search'
            placeholder='Search products...'
            className='pl-8 pr-4 py-2 border rounded w-full bg-[#2d2d2d] text-white placeholder:text-gray-400'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className='overflow-x-auto border rounded-lg bg-[#2d2d2d]'>
        <table className='w-full text-sm text-white'>
          <thead className='border-b'>
            <tr>
              <th className='text-center p-4'>Image</th>
              <th className='text-center p-4'>Name</th>
              <th className='text-center p-4'>SKU</th>
              <th className='text-center p-4'>Quantity</th>
              <th className='text-center p-4'>Status</th>
              <th className='text-center p-4'>Last Updated</th>
              <th className='text-center p-4'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <tr
                  key={product.id}
                  className='text-center border-t border-[#ff851b]/30'
                >
                  <td className='p-4'>
                    <img
                      src={
                        product.image === '/path/to/image.jpg'
                          ? 'https://img.freepik.com/premium-vector/isometric-cardboard-icon-cartoon-package-box-vector-illustration_175838-2453.jpg'
                          : product.image
                      }
                      alt={product.name}
                      className='w-10 h-10 rounded-full border border-gray-600 mx-auto'
                    />
                  </td>
                  <td className='p-4 font-medium'>{product.name}</td>
                  <td className='p-4'>{product.sku}</td>
                  <td className='p-4'>{product.quantity}</td>
                  <td className='p-4'>
                    <Badge
                      quantity={product.quantity}
                      threshold={product.threshold}
                    />
                  </td>
                  <td className='p-4'>{product.lastUpdated}</td>
                  <td className='p-4 space-x-2 flex justify-evenly items-center'>
                    <Link
                      to={`/items/${product.id}`}
                      className='text-[#ff851b] underline text-sm'
                    >
                      Details
                    </Link>
                    <Link
                      to={`/items/${product.id}/edit`}
                      className='text-green-600 underline text-sm'
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => copyOrderLink(product.id)}
                      className='inline-flex items-center gap-1 text-gray-400 text-sm hover:underline'
                      title='Copy order link'
                    >
                      <Copy className='w-4 h-4' />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan='7' className='p-4 text-center text-gray-400'>
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isDeleteDialogOpen && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
          <div className='bg-white rounded-md p-6 w-96'>
            <h2 className='text-xl font-semibold text-[#ff851b]'>
              Are you sure?
            </h2>
            <p className='mt-2 text-sm text-gray-600'>
              This action cannot be undone. This will permanently delete the
              product.
            </p>
            <div className='mt-4 flex justify-end'>
              <button
                className='px-4 py-2 border text-[#ff851b] rounded-md mr-2'
                onClick={closeDeleteDialog}
              >
                Cancel
              </button>
              <button
                className='px-4 py-2 bg-red-500 text-white rounded-md'
                onClick={deleteProduct}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Items;
