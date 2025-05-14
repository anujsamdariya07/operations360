import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Image, LoaderCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import useItemStore from '../../store/useItemStore';

const NewItem = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const { createItem, loading } = useItemStore();

  const [itemForm, setItemForm] = useState({
    name: '',
    quantity: '',
    threshold: '',
    vendor: '',
    cost: '',
  });

  const [imagePreview, setImagePreview] = useState(null);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setItemForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file || !file.type.startsWith('image/')) {
      toast.error('Please select an image file!');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, quantity, threshold, vendor, cost } = itemForm;

    if (!name || !quantity || !threshold || !vendor || !cost) {
      toast.error('Please fill in all required fields.');
      return;
    }

    const newItem = {
      orgId: 'your-org-id', // Replace with actual orgId
      name,
      quantity: parseInt(quantity),
      threshold: parseInt(threshold),
      vendor,
      cost: parseFloat(cost),
      image: imagePreview || undefined,
    };

    try {
      await createItem(newItem);
      console.log('HERE');
      setItemForm({
        name: '',
        quantity: '',
        threshold: '',
        vendor: '',
        cost: '',
      });
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      navigate('/items');
    } catch (error) {
      toast.error('Failed to create item.');
    }
  };

  return (
    <div className='bg-[#2d2d2d] text-white min-h-screen p-6'>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-[#ff851b]'>Add New Item</h1>
        <p className='text-gray-400'>
          Enter product details to add it to the inventory
        </p>
      </div>

      <form onSubmit={handleSubmit} className='space-y-8'>
        {imagePreview && (
          <div className='mb-3 flex items-center gap-2'>
            <div className='relative'>
              <img
                src={imagePreview}
                alt='Preview'
                className='w-24 h-24 object-cover rounded-lg border border-zinc-700'
              />
              <button
                onClick={removeImage}
                type='button'
                className='absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300 flex items-center justify-center'
              >
                <X className='size-3' />
              </button>
            </div>
          </div>
        )}

        <div className='bg-[#1f1f1f] border border-gray-700 p-6 rounded-xl shadow-md'>
          <h2 className='text-xl font-semibold text-[#ff851b] mb-2'>
            Item Information
          </h2>
          <p className='text-sm text-gray-400 mb-6'>
            Provide essential information about the item
          </p>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
            <div>
              <label htmlFor='name' className='block text-sm font-medium mb-1'>
                Item Name
              </label>
              <input
                type='text'
                name='name'
                id='name'
                value={itemForm.name}
                onChange={handleFormChange}
                placeholder='Enter product name'
                className='w-full px-4 py-2 bg-[#3a3a3a] text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff851b]'
                required
              />
            </div>

            <div>
              <label
                htmlFor='quantity'
                className='block text-sm font-medium mb-1'
              >
                Quantity
              </label>
              <input
                type='number'
                name='quantity'
                id='quantity'
                value={itemForm.quantity}
                onChange={handleFormChange}
                placeholder='Enter quantity in stock'
                min='0'
                className='w-full px-4 py-2 bg-[#3a3a3a] text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff851b]'
                required
              />
            </div>

            <div>
              <label
                htmlFor='threshold'
                className='block text-sm font-medium mb-1'
              >
                Threshold
              </label>
              <input
                type='number'
                name='threshold'
                id='threshold'
                value={itemForm.threshold}
                onChange={handleFormChange}
                placeholder='Enter threshold value'
                min='0'
                className='w-full px-4 py-2 bg-[#3a3a3a] text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff851b]'
                required
              />
            </div>

            <div>
              <label
                htmlFor='vendor'
                className='block text-sm font-medium mb-1'
              >
                Vendor
              </label>
              <input
                type='text'
                name='vendor'
                id='vendor'
                value={itemForm.vendor}
                onChange={handleFormChange}
                placeholder='Enter vendor name'
                className='w-full px-4 py-2 bg-[#3a3a3a] text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff851b]'
                required
              />
            </div>

            <div>
              <label htmlFor='cost' className='block text-sm font-medium mb-1'>
                Cost
              </label>
              <input
                type='number'
                name='cost'
                id='cost'
                value={itemForm.cost}
                onChange={handleFormChange}
                placeholder='Enter cost in INR'
                min='0'
                step='0.01'
                className='w-full px-4 py-2 bg-[#3a3a3a] text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff851b]'
                required
              />
            </div>

            <div className='sm:col-span-2'>
              <label htmlFor='image' className='block text-sm font-medium mb-1'>
                Upload Image
              </label>
              <input
                type='file'
                accept='image/*'
                className='hidden'
                ref={fileInputRef}
                onChange={handleImageChange}
              />
              <button
                type='button'
                className='btn btn-sm btn-outline text-white border-gray-600 hover:bg-[#ff851b] hover:border-[#ff851b] mt-2'
                onClick={() => fileInputRef.current?.click()}
              >
                <Image className='mr-2' size={18} /> Upload Image
              </button>
            </div>
          </div>
        </div>

        <div className='flex justify-end'>
          <button
            type='submit'
            className='bg-[#ff851b] text-white px-6 py-2 rounded-lg hover:bg-orange-500 transition'
          >
            {loading ? <LoaderCircle className='animate-spin' /> : 'Save Item'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewItem;
