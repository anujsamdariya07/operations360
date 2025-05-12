import React, { useState } from 'react';
import { FilePlus, Trash2, Plus } from 'lucide-react';

const customers = [
  {
    id: 1,
    name: 'Acme Corp',
    email: 'contact@acmecorp.com',
    phone: '+91 9876543210',
  },
  {
    id: 2,
    name: 'TechGiant Inc',
    email: 'info@techgiant.com',
    phone: '+91 9876543211',
  },
  {
    id: 3,
    name: 'Global Supplies',
    email: 'orders@globalsupplies.com',
    phone: '+91 9876543212',
  },
  {
    id: 4,
    name: 'Local Manufacturing',
    email: 'info@localmfg.com',
    phone: '+91 9876543213',
  },
  {
    id: 5,
    name: 'City Builders',
    email: 'projects@citybuilders.com',
    phone: '+91 9876543214',
  },
];

const products = [
  {
    id: 'PROD-001',
    name: 'Box Type A',
    sku: 'BOX-001',
    quantity: 120,
    price: 120,
  },
  {
    id: 'PROD-002',
    name: 'Box Type B',
    sku: 'BOX-002',
    quantity: 85,
    price: 150,
  },
  {
    id: 'PROD-003',
    name: 'Packaging Tape',
    sku: 'TAPE-001',
    quantity: 2,
    price: 80,
  },
  {
    id: 'PROD-004',
    name: 'Bubble Wrap',
    sku: 'WRAP-001',
    quantity: 45,
    price: 150,
  },
  {
    id: 'PROD-005',
    name: 'Box Type C',
    sku: 'BOX-003',
    quantity: 5,
    price: 100,
  },
];

const NewOrder = () => {
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [items, setItems] = useState([
    { id: Date.now(), productId: '', quantity: 1 },
  ]);

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
  };

  const addItem = () => {
    setItems([...items, { id: Date.now(), productId: '', quantity: 1 }]);
  };

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const customer = customers.find((c) => c.id === Number(selectedCustomer));
    const orderItems = items.map((item) => {
      const product = products.find((p) => p.id === item.productId);
      return {
        ...item,
        name: product?.name || '',
        sku: product?.sku || '',
        price: product?.price || 0,
      };
    });
    console.log({ customer, items: orderItems });
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
  <div className="flex items-center gap-3 mb-6">
    <FilePlus className="w-6 h-6 text-[#ff851b]" />
    <h1 className="text-2xl font-bold text-white">Create New Order</h1>
  </div>

  <form onSubmit={handleSubmit} className="bg-[#2d2d2d] p-6 rounded-2xl shadow-2xl border border-[#444] space-y-6">
    {/* Customer Selection */}
    <div>
      <label className="block text-sm text-gray-300 mb-1 font-medium">Select Customer</label>
      <select
        className="w-full px-4 py-2 rounded-lg bg-[#1f1f1f] text-white border border-[#555] focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
        value={selectedCustomer}
        onChange={(e) => setSelectedCustomer(e.target.value)}
        required
      >
        <option value="" disabled>Select a customer</option>
        {customers.map((cust) => (
          <option key={cust.id} value={cust.id}>{cust.name}</option>
        ))}
      </select>
    </div>

    {/* Items */}
    {items.map((item, index) => (
      <div key={item.id} className="relative p-6 rounded-2xl bg-gradient-to-br from-[#1f1f1f] to-[#2d2d2d] border border-[#444] shadow space-y-4">
        <button
          type="button"
          onClick={() => removeItem(item.id)}
          className="btn btn-xs btn-error btn-circle absolute top-2 right-2 hover:scale-110 transition-transform duration-200"
          title="Remove"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>

        <h2 className="text-lg text-white font-semibold tracking-wide">Product {index + 1}</h2>

        <div>
          <label className="block text-sm text-gray-400 mb-1">Select Product</label>
          <select
            className="w-full px-4 py-2 rounded-lg bg-[#2d2d2d] text-white border border-[#555] focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
            value={item.productId}
            onChange={(e) => handleItemChange(index, 'productId', e.target.value)}
            required
          >
            <option value="" disabled>Select a product</option>
            {products.map((prod) => (
              <option key={prod.id} value={prod.id}>
                {prod.name} ({prod.sku})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1">Quantity</label>
          <input
            type="number"
            min="1"
            className="w-full px-4 py-2 rounded-lg bg-[#2d2d2d] text-white border border-[#555] focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
            value={item.quantity}
            onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
            required
          />
        </div>
      </div>
    ))}

    {/* Action Buttons */}
    <div className="flex justify-between items-center pt-2">
      <button
        type="button"
        onClick={addItem}
        className="px-5 py-2 border border-gray-500 text-gray-300 rounded-lg hover:bg-[#3c3c3c] transition"
      >
        <Plus className="w-4 h-4 inline mr-2" /> Add Product
      </button>

      <button
        type="submit"
        className="px-5 py-2 bg-[#ff851b] hover:bg-[#ff571d] text-white font-semibold rounded-lg transition"
      >
        Submit Order
      </button>
    </div>
  </form>
</div>

  );
};

export default NewOrder;
