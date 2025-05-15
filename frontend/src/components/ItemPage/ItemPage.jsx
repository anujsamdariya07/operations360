import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  LoaderCircle,
  Pencil,
  Trash,
} from 'lucide-react';
import useItemStore from '../../store/useItemStore';

const vendors = [
  { name: 'Vendor A', gst: 'GST-1' },
  { name: 'Vendor B', gst: 'GST-2' },
];

const ItemPage = () => {
  const { itemId } = useParams();
  const {
    fetchItemById,
    selectedItem: item,
    updateItem,
    loading,
    deleteItem,
  } = useItemStore();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const navigate = useNavigate();

  const [itemForUpdate, setItemForUpdate] = useState({
    vendor: '',
    cost: 0,
    threshold: 0,
    lastUpdated: '',
    quantity: 0,
  });

  const currentDate = new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (itemId) {
      fetchItemById(itemId);
    }
  }, [itemId, fetchItemById]);

  useEffect(() => {
    if (item) {
      const foundVendor = vendors.find((v) => v.name === item.vendorName);
      setSelectedVendor(foundVendor);
    }
  }, [item]);

  useEffect(() => {
    if (item?.updateHistory?.length > 0) {
      console.log('Update history updated:', item.updateHistory);
    }
  }, [item?.updateHistory?.length]);

  const handleSave = async () => {
    console.log('Saving item update:', itemForUpdate);
    await updateItem(item.id, itemForUpdate);
    await fetchItemById(itemId);
    setIsOpen(false);
  };

  const handleDelete = async (e) => {
    console.log(`Deleting item with ID: ${item.id}`);
    await deleteItem(itemId);
    navigate('/items');
    setShowDeleteConfirm(false);
  };

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
  <div className='flex items-center gap-2'>
    <button
      className='btn btn-sm border border-[#ff851b] text-[#ff851b] hover:bg-[#ff851b] hover:text-white'
      onClick={() => navigate('/items')}
    >
      <ArrowLeft className='w-4 h-4' />
    </button>
    <h1 className='text-3xl font-bold text-[#ff851b]'>{item.name}</h1>
  </div>
  <div className='flex space-x-3'>
    <button
      className='btn btn-sm btn-outline border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-white flex items-center'
      onClick={() => {
        setItemForUpdate({
          quantity: item.quantity,
          threshold: item.threshold,
          vendor: item.vendorName || '',
          lastUpdated: currentDate,
        });
        setIsOpen(true);
      }}
    >
      <Pencil className='w-4 h-4 mr-1' />
      Edit
    </button>

    <button
      className='btn btn-sm hover:btn-outline hover:border-red-500 hover:text-red-400 hover:bg-[#222222] bg-red-600 text-white flex items-center'
      onClick={() => setShowDeleteConfirm(true)}
    >
      <Trash className='w-4 h-4 mr-1' /> Delete
    </button>
  </div>
</div>


      <div className='flex flex-col md:flex-row gap-6 items-start'>
        {item.image && (
          <img
            src={
              item.image === '/path/to/image.jpg'
                ? 'https://img.freepik.com/premium-vector/isometric-cardboard-icon-cartoon-package-box-vector-illustration_175838-2453.jpg'
                : item.image
            }
            alt={item.name}
            className='rounded-lg w-[30vw] object-cover border border-gray-700'
          />
        )}
        <div className='flex-1'>
          <p className='text-lg mb-2'>
            <span className='font-semibold text-[#ff851b]'>ID:</span> {item.id}
          </p>
          <p className='text-lg mb-2'>
            <span className='font-semibold text-[#ff851b]'>Quantity:</span>{' '}
            {item.quantity}
          </p>
          <p className='text-lg mb-2'>
            <span className='font-semibold text-[#ff851b]'>Threshold:</span>{' '}
            {item.threshold}
          </p>
          <p className='text-lg mb-2'>
            <span className='font-semibold text-[#ff851b]'>Last Updated:</span>{' '}
            {currentDate}
          </p>

          {selectedVendor && (
            <div className='mt-4 text-sm text-gray-300 space-y-1 border-t border-gray-700 pt-4'>
              <p>
                <span className='text-[#ff851b] font-medium'>Email:</span>{' '}
                {selectedVendor.email}
              </p>
              <p>
                <span className='text-[#ff851b] font-medium'>Phone:</span>{' '}
                {selectedVendor.phone}
              </p>
              <p>
                <span className='text-[#ff851b] font-medium'>GST:</span>{' '}
                {selectedVendor.gst}
              </p>
              <p>
                <span className='text-[#ff851b] font-medium'>Address:</span>{' '}
                {selectedVendor.address}
              </p>
            </div>
          )}
        </div>
      </div>

      {item.updateHistory?.length > 0 && (
        <div className='mt-8'>
          <button
            onClick={() => setShowHistory(!showHistory)}
            className='flex items-center text-[#ff851b] font-semibold text-lg mb-2 hover:underline'
          >
            {showHistory ? (
              <ChevronUp className='w-4 h-4 mr-2' />
            ) : (
              <ChevronDown className='w-4 h-4 mr-2' />
            )}
            {showHistory ? 'Hide Update History' : 'Show Update History'}
          </button>

          {showHistory && (
            <div className='overflow-x-auto border border-gray-700 rounded-lg'>
              <table className='table w-full text-sm'>
                <thead>
                  <tr className='bg-[#1f1f1f] text-[#ff851b]'>
                    <th className='px-4 py-2 text-left'>Vendor</th>
                    <th className='px-4 py-2 text-left'>Cost</th>
                    <th className='px-4 py-2 text-left'>Quantity</th>
                    <th className='px-4 py-2 text-left'>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {item.updateHistory.map((entry, index) => (
                    <tr
                      key={index}
                      className='border-t border-gray-700 hover:bg-[#383838] transition'
                    >
                      <td className='px-4 py-2'>{entry.vendorName}</td>
                      <td className='px-4 py-2'>₹{entry.cost}</td>
                      <td className='px-4 py-2'>{entry.quantityUpdated}</td>
                      <td className='px-4 py-2'>
                        {new Date(entry.date).toLocaleDateString('en-IN')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {isOpen && (
        <dialog className='modal modal-open'>
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
                  value={itemForUpdate.quantity}
                  onChange={(e) =>
                    setItemForUpdate({
                      ...itemForUpdate,
                      quantity: Number(e.target.value),
                    })
                  }
                />
              </div>

              <div>
                <label className='block text-sm text-gray-400 mb-1'>Cost</label>
                <input
                  type='number'
                  className='w-full px-4 py-2 rounded-lg bg-[#3a3a3a] text-white border border-[#555] focus:outline-none focus:ring-2 focus:ring-orange-500 transition'
                  value={itemForUpdate.cost}
                  onChange={(e) =>
                    setItemForUpdate({
                      ...itemForUpdate,
                      cost: Number(e.target.value),
                    })
                  }
                  defaultValue={0}
                />
              </div>

              <div>
                <label className='block text-sm text-gray-400 mb-1'>
                  Threshold
                </label>
                <input
                  type='number'
                  className='w-full px-4 py-2 rounded-lg bg-[#3a3a3a] text-white border border-[#555] focus:outline-none focus:ring-2 focus:ring-orange-500 transition'
                  value={itemForUpdate.threshold}
                  onChange={(e) =>
                    setItemForUpdate({
                      ...itemForUpdate,
                      threshold: Number(e.target.value),
                    })
                  }
                />
              </div>

              <div>
                <label className='block text-sm text-gray-400 mb-1'>
                  Select Vendor
                </label>
                <select
                  className='w-full px-4 py-2 rounded-lg bg-[#3a3a3a] text-white border border-[#555] focus:outline-none focus:ring-2 focus:ring-orange-500 transition'
                  value={itemForUpdate.vendor}
                  onChange={(e) =>
                    setItemForUpdate({
                      ...itemForUpdate,
                      vendor: e.target.value,
                    })
                  }
                >
                  <option value='' disabled>
                    -- Choose a vendor --
                  </option>
                  {vendors.map((v) => (
                    <option key={v.gst} value={v.name}>
                      {v.name} ({v.gst})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className='block text-sm text-gray-400 mb-1'>
                  Last Updated
                </label>
                <input
                  type='date'
                  className='w-full px-4 py-2 rounded-lg bg-[#2c2c2c] text-gray-400 border border-[#555] cursor-not-allowed'
                  value={itemForUpdate.lastUpdated}
                  readOnly
                />
              </div>
            </div>

            <div className='modal-action mt-8 flex justify-end space-x-3'>
              <button
                className='px-5 py-2 bg-orange-500 text-black font-semibold rounded-lg hover:bg-orange-400 hover:text-white transition'
                onClick={handleSave}
              >
                {loading ? (
                  <LoaderCircle className='animate-spin' />
                ) : (
                  'Save Changes'
                )}
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

      {showDeleteConfirm && (
        <dialog className='modal modal-open'>
          <div className='modal-box bg-[#2c2c2c] text-white border border-red-500 shadow-2xl rounded-xl p-6'>
            <h3 className='text-xl font-bold text-red-400 mb-4'>
              Confirm Deletion
            </h3>
            <p className='mb-6'>
              Are you sure you want to delete{' '}
              <span className='font-semibold'>{item.name}</span>? This action
              cannot be undone.
            </p>

            <div className='flex justify-end space-x-4'>
              <div className='flex justify-end space-x-4'>
                <button
                  className='px-5 py-2 border border-red-600 bg-red-600 text-white rounded-lg font-medium hover:bg-transparent hover:text-red-400 transition-all duration-200'
                  onClick={handleDelete}
                >
                  {loading ? (
                    <LoaderCircle className='animate-spin' />
                  ) : (
                    'Confirm Delete'
                  )}
                </button>
                <button
                  className='px-5 py-2 border border-gray-500 text-gray-300 rounded-lg font-medium hover:text-white hover:border-white transition-all duration-200'
                  onClick={() => setShowDeleteConfirm(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default ItemPage;
