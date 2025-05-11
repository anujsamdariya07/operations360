import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  Copy,
  Mail,
  MapPin,
  Phone,
  User,
} from 'lucide-react';

const customerData = {
  1: {
    id: 1,
    name: 'Acme Corp',
    email: 'contact@acmecorp.com',
    phone: '+91 9876543210',
    location: 'New York, NY',
    orders: 12,
    status: 'Active',
    address: '123 Business Ave, NY',
    gstNo: 'GSTIN1234567890',
    pendingOrders: [
      {
        id: 'ORD001',
        name: 'Bulk Cement',
        status: 'Processing',
        deadline: '2025-05-20',
        total: '$3,200',
      },
      {
        id: 'ORD002',
        name: 'Rebar Steel',
        status: 'Out for Delivery',
        deadline: '2025-05-25',
        total: '$7,800',
      },
    ],
  },
  2: {
    id: 2,
    name: 'TechGiant Inc',
    email: 'info@techgiant.com',
    phone: '+91 9876543211',
    location: 'San Francisco, CA',
    orders: 8,
    status: 'Active',
    address: 'Silicon Park, SF',
    gstNo: 'GSTIN2345678901',
    pendingOrders: [],
  },
  3: {
    id: 3,
    name: 'Global Supplies',
    email: 'orders@globalsupplies.com',
    phone: '+91 9876543212',
    location: 'Chicago, IL',
    orders: 5,
    status: 'Active',
    address: 'Warehouse Lane, IL',
    gstNo: 'GSTIN3456789012',
    pendingOrders: [],
  },
  4: {
    id: 4,
    name: 'Local Manufacturing',
    email: 'info@localmfg.com',
    phone: '+91 9876543213',
    location: 'Detroit, MI',
    orders: 3,
    status: 'Inactive',
    address: 'Factory Road, MI',
    gstNo: 'GSTIN4567890123',
    pendingOrders: [],
  },
  5: {
    id: 5,
    name: 'City Builders',
    email: 'projects@citybuilders.com',
    phone: '+91 9876543214',
    location: 'Dallas, TX',
    orders: 7,
    status: 'Active',
    address: 'Construction Blvd, TX',
    gstNo: 'GSTIN5678901234',
    pendingOrders: [],
  },
};

const CustomerPage = () => {
  const { customerId } = useParams();
  const navigate = useNavigate();
  const customer = customerData[customerId];

  if (!customer) {
    return (
      <div className='flex flex-col items-center justify-center h-full p-6'>
        <h1 className='text-2xl font-bold mb-4'>Customer Not Found</h1>
        <p className='text-gray-500 mb-6'>
          The customer you're looking for doesn't exist or has been removed.
        </p>
        <button
          className='btn btn-outline'
          onClick={() => navigate('/customers')}
        >
          <ArrowLeft className='w-4 h-4 mr-2' />
          Back to Customers
        </button>
      </div>
    );
  }

  const copyCustomerLink = (customerId) => {
    const url = `${window.location.origin}/customers/${customerId}`;
    navigator.clipboard.writeText(url);
    alert(`Link copied: ${url}`);
  };

  return (
    <div className='p-4 space-y-6'>
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
        <div className='flex items-center gap-3'>
          <button
            className='btn btn-sm btn-outline'
            onClick={() => navigate('/customers')}
          >
            <ArrowLeft className='w-4 h-4' />
          </button>
          <div>
            <h1 className='text-2xl font-bold'>{customer.name}</h1>
            <p className='text-sm text-gray-500'>Customer ID: {customer.id}</p>
          </div>
        </div>
        <div className='flex gap-2'>
          <button className='btn btn-sm btn-outline' onClick={() => copyCustomerLink(customer.id)}>
            <Copy className='w-4 h-4 mr-2' />
            Copy Link
          </button>
          <button
            className='btn btn-sm bg-orange-500 text-white hover:bg-orange-600'
            onClick={() => navigate(`/dashboard/customers/${id}/edit`)}
          >
            Edit Customer
          </button>
        </div>
      </div>

      <div className='grid md:grid-cols-3 gap-4'>
        <div className='card bg-base-100 p-4 shadow'>
          <h2 className='font-bold mb-2'>Status</h2>
          <div className='flex items-center gap-4'>
            <div
              className={`badge ${
                customer.status === 'Active'
                  ? 'badge-outline'
                  : 'badge-secondary'
              }`}
            >
              {customer.status}
            </div>
            <p className='text-sm text-gray-500'>
              Total Orders: {customer.orders}
            </p>
          </div>
        </div>

        <div className='card bg-base-100 p-4 shadow'>
          <h2 className='font-bold mb-2'>GST Number</h2>
          <p className='text-lg'>{customer.gstNo}</p>
        </div>

        <div className='card bg-base-100 p-4 shadow'>
          <h2 className='font-bold mb-2'>Location</h2>
          <div className='flex items-center gap-2'>
            <MapPin className='w-5 h-5 text-gray-500' />
            <span className='text-lg'>{customer.location}</span>
          </div>
        </div>
      </div>

      <div className='grid md:grid-cols-3 gap-6'>
        <div className='space-y-6'>
          <div className='card bg-base-100 p-4 shadow'>
            <h2 className='font-bold mb-4'>Contact Information</h2>
            <div className='space-y-3 text-sm'>
              <InfoRow icon={<User />} label='Name' value={customer.name} />
              <InfoRow icon={<Phone />} label='Phone' value={customer.phone} />
              <InfoRow icon={<Mail />} label='Email' value={customer.email} />
              <InfoRow
                icon={<MapPin />}
                label='Address'
                value={customer.address}
              />
            </div>
          </div>

          <div className='card bg-base-100 p-4 shadow'>
            <h2 className='font-bold mb-4'>Business Details</h2>
            <div className='flex justify-between mb-2'>
              <span className='text-gray-500'>GST Number:</span>
              <span>{customer.gstNo}</span>
            </div>
            <div className='flex justify-between mb-2'>
              <span className='text-gray-500'>Total Orders:</span>
              <span>{customer.orders}</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-gray-500'>Status:</span>
              <div
                className={`badge ${
                  customer.status === 'Active'
                    ? 'badge-outline'
                    : 'badge-secondary'
                }`}
              >
                {customer.status}
              </div>
            </div>
          </div>
        </div>

        <div className='md:col-span-2 space-y-6'>
          <div className='card bg-base-100 p-4 shadow'>
            <div className='mb-4'>
              <h2 className='text-lg font-bold'>Pending Orders</h2>
              <p className='text-sm text-gray-500'>
                Orders that are not yet delivered
              </p>
            </div>

            {customer.pendingOrders?.length ? (
              <div className='overflow-x-auto'>
                <table className='table table-zebra w-full'>
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Name</th>
                      <th>Status</th>
                      <th>Deadline</th>
                      <th>Total</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customer.pendingOrders.map((order) => (
                      <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.name}</td>
                        <td>
                          <div
                            className={`badge ${getStatusBadge(order.status)}`}
                          >
                            {order.status}
                          </div>
                        </td>
                        <td className='flex items-center gap-1'>
                          <Calendar className='w-4 h-4 text-gray-500' />
                          {order.deadline}
                        </td>
                        <td>{order.total}</td>
                        <td>
                          <button
                            className='btn btn-sm btn-outline'
                            onClick={() =>
                              navigate(`/dashboard/orders/${order.id}`)
                            }
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className='p-8 text-center text-gray-500 border rounded-md'>
                No pending orders for this customer.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoRow = ({ icon, label, value }) => (
  <div className='flex items-start gap-2'>
    <div className='mt-1 text-gray-500'>{icon}</div>
    <div>
      <div className='font-medium'>{label}</div>
      <div>{value}</div>
    </div>
  </div>
);

function getStatusBadge(status) {
  switch (status) {
    case 'Processing':
      return 'badge-outline';
    case 'Ready for Delivery':
      return 'badge-secondary';
    case 'Out for Delivery':
      return 'badge-primary';
    case 'Under Process':
      return 'badge-accent';
    default:
      return 'badge-outline';
  }
}

export default CustomerPage;
