import { useState, useEffect } from 'react';
import {
  Copy,
  Filter,
  Plus,
  Search,
  ArrowUpDown,
  Calendar,
  Clock,
  Funnel,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import useOrderStore from '../../store/useOrderStore';

const Orders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('current');

  const { orders, loading, fetchOrders } = useOrderStore();

  useEffect(() => {
    fetchOrders();
  }, []);

  const currentOrders = orders.filter((order) => order.status !== 'Completed');
  const previousOrders = orders.filter((order) => order.status === 'Completed');

  const filteredCurrentOrders = currentOrders.filter(
    (order) =>
      order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.organizationName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPreviousOrders = previousOrders.filter(
    (order) =>
      order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.organizationName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const copyOrderLink = (orderId) => {
    const url = `${window.location.origin}/dashboard/orders/${orderId}`;
    navigator.clipboard.writeText(url);
    alert(`Link copied to clipboard: ${url}`);
  };

  const Badge = ({ status }) => {
    const colors = {
      Processing: 'bg-yellow-500 text-white font-semibold',
      Ready: 'bg-blue-500 text-white font-semibold',
      'In Production': 'bg-indigo-500 text-white font-semibold',
      Shipped: 'bg-green-500 text-white font-semibold',
      Completed: 'bg-green-500 text-white font-semibold',
    };
    return (
      <span
        className={`px-2 py-1 text-xs rounded ${
          colors[status] || 'bg-gray-100 text-gray-800'
        }`}
      >
        {status}
      </span>
    );
  };

  const renderOrdersTable = (orders, isCurrent = true) => (
    <div className='overflow-x-auto border rounded-lg bg-[#2d2d2d]'>
      <table className='w-full text-sm text-white'>
        <thead className='border-b'>
          <tr>
            <th className='text-left p-4'>Order ID</th>
            <th className='text-left p-4'>Organization</th>
            <th className='text-left p-4'>Created By</th>
            <th className='text-left p-4'>Status</th>
            <th className='text-left p-4'>
              {isCurrent ? 'Deadline' : 'Completed At'}
            </th>
            <th className='text-left p-4'>Total</th>
            <th className='text-left p-4'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((order) => (
              <tr key={order._id} className='border-t border-[#ff851b]/30'>
                <td className='p-4 font-medium'>{order._id}</td>
                <td className='p-4'>{order.organizationName || '-'}</td>
                <td className='p-4'>{order.employeeName || '-'}</td>
                <td className='p-4'>
                  <Badge status={order.status} />
                </td>
                <td className='p-4 flex items-center gap-1'>
                  {isCurrent ? (
                    <Calendar className='w-4 h-4' />
                  ) : (
                    <Clock className='w-4 h-4' />
                  )}
                  {isCurrent
                    ? order.deadline
                      ? new Date(order.deadline).toLocaleDateString()
                      : '-'
                    : order.completedAt
                    ? new Date(order.completedAt).toLocaleDateString()
                    : '-'}
                </td>
                <td className='p-4'>₹{order.total?.toFixed(2) || '0.00'}</td>
                <td className='p-4 space-x-2'>
                  <Link
                    to={`/orders/${order._id}`}
                    className='text-[#ff851b] underline text-sm'
                  >
                    Details
                  </Link>
                  {isCurrent && (
                    <Link
                      to={`/orders`}
                      className='text-green-600 underline text-sm'
                    >
                      Edit
                    </Link>
                  )}
                  <button
                    onClick={() => copyOrderLink(order._id)}
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
              <td colSpan='7' className='text-center text-gray-500 py-4'>
                No orders found matching your search.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <h2 className='text-xl font-semibold text-white'>Orders</h2>
        <Link
          to='/orders/new'
          className='btn btn-sm bg-[#ff851b] text-white hover:bg-[#e67613]'
        >
          <Plus className='w-4 h-4 mr-1' />
          New Order
        </Link>
      </div>

      <div className='flex items-center gap-2'>
        <div className='relative w-full'>
          <input
            type='text'
            placeholder='Search orders...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='input input-bordered w-full pl-10 bg-[#1e1e1e] text-white border-[#ff851b]/30'
          />
          <Search className='absolute top-1/2 left-3 transform -translate-y-1/2 w-4 h-4 text-gray-400' />
        </div>
        <button className='btn btn-outline border-[#ff851b]/30 text-white hover:bg-[#ff851b]/20'>
          <Filter className='w-4 h-4 mr-1' />
          Filter
        </button>
      </div>

      <div className='flex gap-4 border-b border-[#ff851b]/20'>
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'current'
              ? 'border-b-2 border-[#ff851b] text-white'
              : 'text-gray-400'
          }`}
          onClick={() => setActiveTab('current')}
        >
          Current Orders
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'previous'
              ? 'border-b-2 border-[#ff851b] text-white'
              : 'text-gray-400'
          }`}
          onClick={() => setActiveTab('previous')}
        >
          Previous Orders
        </button>
      </div>

      {loading ? (
        <div className='text-center text-white py-10'>Loading orders...</div>
      ) : activeTab === 'current' ? (
        renderOrdersTable(filteredCurrentOrders, true)
      ) : (
        renderOrdersTable(filteredPreviousOrders, false)
      )}
    </div>
  );
};

export default Orders;
