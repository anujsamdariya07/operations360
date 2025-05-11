import { useState } from 'react';
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

const Orders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('current');

  const currentOrders = [
    {
      id: 'ORD-7892',
      customer: 'Acme Corp',
      status: 'Processing',
      deadline: '2025-04-25',
      total: '₹1,200.00',
    },
    {
      id: 'ORD-7891',
      customer: 'TechGiant Inc',
      status: 'Ready',
      deadline: '2025-04-22',
      total: '₹3,450.00',
    },
    {
      id: 'ORD-7890',
      customer: 'Global Supplies',
      status: 'In Production',
      deadline: '2025-04-30',
      total: '₹890.50',
    },
    {
      id: 'ORD-7889',
      customer: 'Local Manufacturing',
      status: 'Shipped',
      deadline: '2025-04-20',
      total: '₹2,100.00',
    },
    {
      id: 'ORD-7888',
      customer: 'City Builders',
      status: 'Processing',
      deadline: '2025-05-05',
      total: '₹4,500.00',
    },
  ];

  const previousOrders = [
    {
      id: 'ORD-7850',
      customer: 'Acme Corp',
      status: 'Completed',
      completed: '2025-04-10',
      total: '₹2,300.00',
    },
    {
      id: 'ORD-7842',
      customer: 'TechGiant Inc',
      status: 'Completed',
      completed: '2025-04-05',
      total: '₹1,750.00',
    },
    {
      id: 'ORD-7835',
      customer: 'Global Supplies',
      status: 'Completed',
      completed: '2025-03-28',
      total: '₹3,290.50',
    },
    {
      id: 'ORD-7830',
      customer: 'Local Manufacturing',
      status: 'Completed',
      completed: '2025-03-22',
      total: '₹1,800.00',
    },
    {
      id: 'ORD-7825',
      customer: 'City Builders',
      status: 'Completed',
      completed: '2025-03-15',
      total: '₹5,200.00',
    },
  ];

  const filteredCurrentOrders = currentOrders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPreviousOrders = previousOrders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const copyOrderLink = (orderId) => {
    const url = `${window.location.origin}/dashboard/orders/${orderId}`;
    navigator.clipboard.writeText(url);
    alert(`Link copied to clipboard: ${url}`);
  };

  const Badge = ({ status }) => {
    const colors = {
      Processing: 'bg-yellow-500 text-white-800 font-semibold',
      Ready: 'bg-blue-500 text-white-800 font-semibold',
      'In Production': 'bg-indigo-500 text-white-800 font-semibold',
      Shipped: 'bg-green-500 text-white-800 font-semibold',
      Completed: 'bg-green-500 text-white-800 font-semibold',
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
            <th className='text-left p-4'>Customer</th>
            <th className='text-left p-4'>Status</th>
            <th className='text-left p-4'>
              {isCurrent ? 'Deadline' : 'Completed'}
            </th>
            <th className='text-left p-4'>Total</th>
            <th className='text-left p-4'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((order) => (
              <tr key={order.id} className='border-t border-[#ff851b]/30'>
                <td className='p-4 font-medium'>{order.id}</td>
                <td className='p-4'>{order.customer}</td>
                <td className='p-4'>
                  <Badge status={order.status} />
                </td>
                <td className='p-4 flex items-center gap-1'>
                  {isCurrent ? (
                    <Calendar className='w-4 h-4' />
                  ) : (
                    <Clock className='w-4 h-4' />
                  )}
                  {isCurrent ? order.deadline : order.completed}
                </td>
                <td className='p-4'>{order.total}</td>
                <td className='p-4 space-x-2'>
                  <Link
                    to={`/orders/${order.id}`}
                    className='text-[#ff851b] underline text-sm'
                  >
                    Details
                  </Link>
                  {isCurrent && (
                    <a
                      href={`/dashboard/orders/${order.id}/edit`}
                      className='text-green-600 underline text-sm'
                    >
                      Edit
                    </a>
                  )}
                  <button
                    onClick={() => copyOrderLink(order.id)}
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
              <td colSpan='6' className='text-center text-gray-500 py-4'>
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
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <div>
          <h1 className='text-3xl font-bold text-[#ff851b]'>Orders</h1>
          <p className='text-gray-400'>Manage and track customer orders</p>
        </div>
        <Link
          href='/orders/new'
          className='inline-flex items-center bg-[#ff851b] text-white px-4 py-2 rounded hover:bg-[#ff571d]'
        >
          <Plus className='w-4 h-4 mr-2' />
          New Order
        </Link>
      </div>

      <div className='flex flex-col md:flex-row gap-4'>
        <div className='relative flex-1'>
          <Search className='absolute left-2 top-2.5 w-4 h-4 text-gray-400' />
          <input
            type='search'
            placeholder='Search orders...'
            className='pl-8 pr-4 py-2 border rounded w-full bg-[#2d2d2d] text-white'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className='px-4 py-2 border border-[#ff851b] text-[#ff851b] rounded-md font-medium transition duration-200 hover:bg-[#ff851b] hover:text-white shadow-md flex gap-1 justify-between items-center'>
          <Funnel className='w-4 h-4' />
        </button>
        <button
          onClick={() => copyOrderLink(filteredCurrentOrders[0]?.id || '')}
          className='px-4 py-2 border border-[#ff851b] text-[#ff851b] rounded-md font-medium transition duration-200 hover:bg-[#ff851b] hover:text-white shadow-md flex gap-1 justify-between items-center'
          title='Copy current page URL'
        >
          <Copy className='w-4 h-4' />
        </button>
      </div>

      <div>
        <div className='flex border-b border-[#ff851b]/30'>
          <button
            className={`px-4 py-2 text-sm text-[#ff851b] ${
              activeTab === 'current'
                ? 'border-b-2 border-[#ff851b] font-semibold'
                : ''
            }`}
            onClick={() => setActiveTab('current')}
          >
            Current Orders
          </button>
          <button
            className={`px-4 py-2 text-sm text-[#ff851b] ${
              activeTab === 'previous'
                ? 'border-b-2 border-[#ff851b] font-semibold'
                : ''
            }`}
            onClick={() => setActiveTab('previous')}
          >
            Previous Orders
          </button>
        </div>
        <div className='pt-4 space-y-4'>
          {activeTab === 'current' ? (
            <>
              <div className='flex items-center justify-between'>
                <h2 className='text-xl font-semibold text-[#ff851b]'>
                  Current Orders
                </h2>
                <button className='px-4 py-2 border border-[#ff851b] text-[#ff851b] rounded-md font-medium transition duration-200 hover:bg-[#ff851b] hover:text-white shadow-md flex gap-1 justify-between items-center'>
                  <ArrowUpDown
                    className='w-4 h-4 mr-1
'
                  />
                  Sort
                </button>
              </div>
              {renderOrdersTable(filteredCurrentOrders)}
            </>
          ) : (
            <>
              <div className='flex items-center justify-between'>
                <h2 className='text-xl font-semibold text-[#ff851b]'>
                  Previous Orders
                </h2>
                <button className='text-sm border rounded px-3 py-1 flex items-center text-[#ff851b]'>
                  <ArrowUpDown className='w-4 h-4 mr-1' />
                  Sort
                </button>
              </div>
              {renderOrdersTable(filteredPreviousOrders, false)}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
