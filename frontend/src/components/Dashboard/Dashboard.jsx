import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

const Dashboard = () => {
  const stats = [
    { title: 'Total Orders', value: 120, icon: '📦' },
    { title: 'Customers', value: 56, icon: '👥' },
    { title: 'Employees', value: 12, icon: '🧑‍💼' },
    { title: 'Items in Stock', value: 320, icon: '📋' },
  ];

  const systemStats = {
    revenueToday: '₹4,500',
    activeUsers: 22,
    lowStockItems: 5,
  };

  const topProducts = [
    { name: 'Product A', sales: 240 },
    { name: 'Product B', sales: 180 },
    { name: 'Product C', sales: 140 },
    { name: 'Product D', sales: 90 },
  ];

  const recentOrders = [
    {
      id: '#ORD001',
      name: 'Rahul',
      date: '10 May 2025',
      amount: '₹1,200',
      status: 'Completed',
    },
    {
      id: '#ORD002',
      name: 'Priya',
      date: '09 May 2025',
      amount: '₹800',
      status: 'Pending',
    },
    {
      id: '#ORD003',
      name: 'Vikram',
      date: '08 May 2025',
      amount: '₹2,000',
      status: 'Cancelled',
    },
  ];

  return (
    <div className='min-h-screen p-6 bg-[#222222] text-white'>
      <h1 className='text-3xl font-bold mb-6 text-[#ff851b]'>Dashboard</h1>

      {/* Top Stats */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10'>
        {stats.map((stat, i) => (
          <div
            key={i}
            className='bg-[#2d2d2d] p-6 rounded-2xl shadow-lg border border-[#ff851b]/30'
          >
            <div className='text-4xl mb-2'>{stat.icon}</div>
            <div className='text-sm text-gray-400'>{stat.title}</div>
            <div className='text-2xl font-semibold text-[#ff851b]'>
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      {/* System Summary */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-10'>
        <div className='bg-[#2d2d2d] p-6 rounded-2xl border-l-4 border-[#ff851b]'>
          <h2 className='text-lg font-semibold text-[#ff851b] mb-1'>
            Today's Revenue
          </h2>
          <p className='text-2xl font-bold'>{systemStats.revenueToday}</p>
        </div>
        <div className='bg-[#2d2d2d] p-6 rounded-2xl border-l-4 border-[#ff851b]'>
          <h2 className='text-lg font-semibold text-[#ff851b] mb-1'>
            Active Users
          </h2>
          <p className='text-2xl font-bold'>{systemStats.activeUsers}</p>
        </div>
        <div className='bg-[#2d2d2d] p-6 rounded-2xl border-l-4 border-[#ff851b]'>
          <h2 className='text-lg font-semibold text-[#ff851b] mb-1'>
            Low Stock Items
          </h2>
          <p className='text-2xl font-bold'>{systemStats.lowStockItems}</p>
        </div>
      </div>

      {/* Recent Orders */}
      <div className='bg-[#2d2d2d] p-6 rounded-2xl border border-[#ff851b]/20 mb-10'>
        <h2 className='text-xl font-semibold text-[#ff851b] mb-4'>
          Recent Orders
        </h2>
        <table className='w-full text-left'>
          <thead>
            <tr className='text-[#ff851b] border-b border-gray-600'>
              <th className='py-2'>Order ID</th>
              <th className='py-2'>Customer</th>
              <th className='py-2'>Date</th>
              <th className='py-2'>Amount</th>
              <th className='py-2'>Status</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order, i) => (
              <tr key={i} className='border-b border-gray-700'>
                <td className='py-2'>{order.id}</td>
                <td className='py-2'>{order.name}</td>
                <td className='py-2'>{order.date}</td>
                <td className='py-2'>{order.amount}</td>
                <td className='py-2'>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      order.status === 'Completed'
                        ? 'bg-green-600 text-white'
                        : order.status === 'Pending'
                        ? 'bg-yellow-500 text-black'
                        : 'bg-red-600 text-white'
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bottom Charts and Cards */}
      <div className='grid grid-cols-1 lg:grid-cols-1 gap-6'>
        {/* Most Performing Products Chart */}
        <div className='bg-[#2d2d2d] p-6 rounded-2xl border border-[#ff851b]/20'>
          <h2 className='text-xl font-semibold text-[#ff851b] mb-4'>
            Most Performing Products
          </h2>
          <ResponsiveContainer width='100%' height={300}>
            <BarChart data={topProducts}>
              <CartesianGrid strokeDasharray='3 3' stroke='#444' />
              <XAxis dataKey='name' stroke='#ccc' />
              <YAxis stroke='#ccc' />
              <Tooltip />
              <Bar dataKey='sales' fill='#ff851b' />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
