import React, { useState } from 'react';
import { FilePlus } from 'lucide-react';
import { FaPlus, FaTrash } from 'react-icons/fa';

const customers = [
  { id: 1, name: "Acme Corp", email: "contact@acmecorp.com", phone: "+91 9876543210" },
  { id: 2, name: "TechGiant Inc", email: "info@techgiant.com", phone: "+91 9876543211" },
  { id: 3, name: "Global Supplies", email: "orders@globalsupplies.com", phone: "+91 9876543212" },
  { id: 4, name: "Local Manufacturing", email: "info@localmfg.com", phone: "+91 9876543213" },
  { id: 5, name: "City Builders", email: "projects@citybuilders.com", phone: "+91 9876543214" },
];

const products = [
  { id: "PROD-001", name: "Box Type A", sku: "BOX-001", quantity: 120, price: 120 },
  { id: "PROD-002", name: "Box Type B", sku: "BOX-002", quantity: 85, price: 150 },
  { id: "PROD-003", name: "Packaging Tape", sku: "TAPE-001", quantity: 2, price: 80 },
  { id: "PROD-004", name: "Bubble Wrap", sku: "WRAP-001", quantity: 45, price: 150 },
  { id: "PROD-005", name: "Box Type C", sku: "BOX-003", quantity: 5, price: 100 },
];

const NewOrder = () => {
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [items, setItems] = useState([{ id: Date.now(), productId: '', quantity: 1 }]);

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
    const selectedCustomerData = customers.find((c) => c.id === Number(selectedCustomer));
    const selectedItems = items.map((item) => {
      const product = products.find((p) => p.id === item.productId);
      return {
        ...item,
        name: product?.name || '',
        sku: product?.sku || '',
        price: product?.price || 0,
      };
    });
    console.log({ customer: selectedCustomerData, items: selectedItems });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3">
        <FilePlus className="w-6 h-6 text-orange-500" />
        <h1 className="text-2xl font-bold">Create New Order</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Select Customer</span>
          </label>
          <select
            className="select select-bordered w-full"
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

        {items.map((item, index) => (
          <div
            key={item.id}
            className="card bg-base-100 shadow-md p-4 space-y-4 relative"
          >
            <button
              type="button"
              onClick={() => removeItem(item.id)}
              className="absolute top-2 right-2 btn btn-xs btn-error btn-circle"
              title="Remove Product"
            >
              <FaTrash className="w-3 h-3" />
            </button>

            <div className="space-y-2">
              <h2 className="font-medium">Product {index + 1}</h2>
              <select
                className="select select-bordered w-full"
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

              <input
                type="number"
                min="1"
                placeholder="Quantity"
                className="input input-bordered w-full"
                value={item.quantity}
                onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                required
              />
            </div>
          </div>
        ))}

        <div className="flex justify-between items-center gap-3">
          <button
            type="button"
            onClick={addItem}
            className="px-4 py-2 rounded border border-gray-600 text-gray-300 hover:bg-[#444] flex gap-2 items-center"
          >
            <FaPlus className="w-4 h-4" /> Add Product
          </button>

          <button type="submit" className="inline-flex items-center bg-[#ff851b] text-white px-4 py-2 rounded hover:bg-[#ff571d]">
            Submit Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewOrder;
