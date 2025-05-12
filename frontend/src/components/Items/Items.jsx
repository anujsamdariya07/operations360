import { useState } from 'react';
import { Plus, Search, Pencil, Trash2 } from 'lucide-react';

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [inventoryItems, setInventoryItems] = useState([
    {
      id: 'INV-001',
      name: 'Steel Rods',
      quantity: 120,
      unit: 'pcs',
      location: 'Warehouse A',
    },
    {
      id: 'INV-002',
      name: 'Copper Wires',
      quantity: 85,
      unit: 'rolls',
      location: 'Warehouse B',
    },
    {
      id: 'INV-003',
      name: 'Plastic Sheets',
      quantity: 200,
      unit: 'sheets',
      location: 'Warehouse C',
    },
  ]);

  const filteredItems = inventoryItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='space-y-6'>
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <div>
          <h1 className='text-3xl font-bold text-[#ff851b]'>Inventory</h1>
          <p className='text-gray-400'>Track and manage your stock items</p>
        </div>
        <button className='inline-flex items-center bg-[#ff851b] text-white px-4 py-2 rounded hover:bg-[#ff571d]'>
          <Plus className='w-4 h-4 mr-2' />
          Add Item
        </button>
      </div>

      <div className='relative w-full sm:w-1/2'>
        <Search className='absolute left-2 top-2.5 w-4 h-4 text-gray-400' />
        <input
          type='search'
          placeholder='Search inventory...'
          className='pl-8 pr-4 py-2 border rounded w-full bg-[#2d2d2d] text-white'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className='overflow-x-auto border rounded-lg bg-[#2d2d2d]'>
        <table className='w-full text-sm text-white'>
          <thead className='border-b'>
            <tr>
              <th className='text-left p-4'>Item ID</th>
              <th className='text-left p-4'>Name</th>
              <th className='text-left p-4'>Quantity</th>
              <th className='text-left p-4'>Unit</th>
              <th className='text-left p-4'>Location</th>
              <th className='text-left p-4'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <tr key={item.id} className='border-t border-[#ff851b]/30'>
                  <td className='p-4 font-medium'>{item.id}</td>
                  <td className='p-4'>{item.name}</td>
                  <td className='p-4'>{item.quantity}</td>
                  <td className='p-4'>{item.unit}</td>
                  <td className='p-4'>{item.location}</td>
                  <td className='p-4 space-x-2'>
                    <button className='text-green-500 hover:underline text-sm flex items-center gap-1'>
                      <Pencil className='w-4 h-4' /> Edit
                    </button>
                    <button className='text-red-500 hover:underline text-sm flex items-center gap-1'>
                      <Trash2 className='w-4 h-4' /> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan='6' className='text-center text-gray-500 py-4'>
                  No items found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Inventory;