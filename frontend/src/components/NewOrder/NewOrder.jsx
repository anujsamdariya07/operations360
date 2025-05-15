import React, { useEffect, useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import useItemStore from '../../store/useItemStore';
import useOrderStore from '../../store/useOrderStore';

const NewOrder = () => {
  const { items, fetchItems, loading: loadingItems } = useItemStore();
  const { createOrder, loading } = useOrderStore();

  const [orderData, setOrderData] = useState({
    customer: '',
    status: 'pending',
    items: [{ item: '', quantity: 1, priceAtOrder: 0 }],
    notes: '',
  });

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderData({ ...orderData, [name]: value });
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const updatedItems = [...orderData.items];
    updatedItems[index][name] =
      name === 'quantity' || name === 'priceAtOrder' ? parseFloat(value) : value;
    setOrderData({ ...orderData, items: updatedItems });
  };

  const addItem = () => {
    setOrderData({
      ...orderData,
      items: [...orderData.items, { item: '', quantity: 1, priceAtOrder: 0 }],
    });
  };

  const removeItem = (index) => {
    const updatedItems = orderData.items.filter((_, i) => i !== index);
    setOrderData({ ...orderData, items: updatedItems });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Basic validation
    if (!orderData.customer.trim()) {
      alert('Please enter customer name');
      return;
    }
    if (orderData.items.length === 0 || orderData.items.some((i) => !i.item)) {
      alert('Please select at least one item');
      return;
    }

    setSubmitting(true);
    try {
      // Pass orderData as is, item is the name string now
      await createOrder(orderData);
      // Reset form after success
      setOrderData({
        customer: '',
        status: 'pending',
        items: [{ item: '', quantity: 1, priceAtOrder: 0 }],
        notes: '',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-6 bg-[#2d2d2d] text-white min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-orange-400">New Order</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Customer & Status */}
        <div className="flex gap-4">
          <input
            type="text"
            name="customer"
            value={orderData.customer}
            onChange={handleChange}
            placeholder="Customer Name"
            className="input input-bordered w-full bg-[#1f1f1f] text-white"
            disabled={submitting}
          />
          <select
            name="status"
            value={orderData.status}
            onChange={handleChange}
            className="select select-bordered bg-[#1f1f1f] text-white"
            disabled={submitting}
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Notes */}
        <textarea
          name="notes"
          value={orderData.notes}
          onChange={handleChange}
          placeholder="Additional Notes (optional)"
          className="textarea textarea-bordered w-full bg-[#1f1f1f] text-white"
          disabled={submitting}
        />

        {/* Items Section */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-orange-400">Items</h3>

          {orderData.items.map((orderItem, index) => {
            const selectedItemNames = orderData.items
              .filter((_, i) => i !== index)
              .map((i) => i.item);

            const availableItems = items.filter(
              (i) =>
                !selectedItemNames.includes(i.name) || i.name === orderItem.item
            );

            return (
              <div key={index} className="flex gap-3 mb-3 items-center">
                {/* Item Dropdown with label */}
                <div className="flex flex-col w-1/3">
                  <label className="text-xs text-gray-400 mb-1">Item</label>
                  <select
                    name="item"
                    value={orderItem.item}
                    onChange={(e) => handleItemChange(index, e)}
                    className="select select-bordered bg-[#1f1f1f] text-white w-full"
                    disabled={submitting}
                  >
                    <option value="">Select Item</option>
                    {availableItems.map((item) => (
                      <option key={item.id} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Quantity with label */}
                <div className="flex flex-col w-1/4">
                  <label className="text-xs text-gray-400 mb-1">Quantity</label>
                  <input
                    type="number"
                    name="quantity"
                    value={orderItem.quantity}
                    onChange={(e) => handleItemChange(index, e)}
                    className="input input-bordered bg-[#1f1f1f] text-white w-full"
                    placeholder="Qty"
                    disabled={submitting}
                    min={1}
                  />
                </div>

                {/* Price with label */}
                <div className="flex flex-col w-1/4">
                  <label className="text-xs text-gray-400 mb-1">Price</label>
                  <input
                    type="number"
                    name="priceAtOrder"
                    value={orderItem.priceAtOrder}
                    onChange={(e) => handleItemChange(index, e)}
                    className="input input-bordered bg-[#1f1f1f] text-white w-full"
                    placeholder="Price"
                    disabled={submitting}
                    min={0}
                    step="0.01"
                  />
                </div>

                {/* Remove Item */}
                <button
                  type="button"
                  onClick={() => removeItem(index)}
                  className="btn btn-error btn-sm mt-6"
                  aria-label="Remove item"
                  disabled={submitting || orderData.items.length === 1}
                  title={orderData.items.length === 1 ? 'At least one item required' : ''}
                >
                  <Minus size={16} />
                </button>
              </div>
            );
          })}

          <button
            type="button"
            onClick={addItem}
            className="btn btn-sm bg-orange-500 text-white mt-2"
            disabled={submitting}
          >
            <Plus size={16} className="mr-1" /> Add Item
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="btn bg-orange-500 text-white w-full"
          disabled={submitting || loadingItems}
        >
          {submitting ? 'Creating Order...' : 'Create Order'}
        </button>
      </form>
    </div>
  );
};

export default NewOrder;
