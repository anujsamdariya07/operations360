import React, { useEffect } from 'react';
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
import useCustomerStore from '../../store/useCustomerStore';

const CustomerPage = () => {
  const { customerId } = useParams();
  const navigate = useNavigate();
  const {
    selectedCustomer: customer,
    fetchCustomerById,
    loading,
  } = useCustomerStore();

  useEffect(() => {
    if (customerId) {
      fetchCustomerById(customerId);
    }
  }, [customerId, fetchCustomerById]);

  const copyCustomerLink = (id) => {
    const url = `${window.location.origin}/customers/${id}`;
    navigator.clipboard.writeText(url);
    alert(`Link copied: ${url}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#2d2d2d] text-white flex justify-center items-center">
        <p className="text-lg text-gray-400">Loading customer details...</p>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="min-h-screen bg-[#2d2d2d] text-white flex flex-col justify-center items-center p-4">
        <h1 className="text-2xl font-bold mb-2 text-[#ff851b]">Customer Not Found</h1>
        <p className="text-[#a0a0a0] mb-6 text-center max-w-md">
          The customer you're looking for doesn't exist or has been removed.
        </p>
        <button
          className="btn border border-white text-white"
          onClick={() => navigate('/customers')}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Customers
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#2d2d2d] text-white p-4 space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/customers')}
            className="btn btn-sm border border-[#ff851b] text-[#ff851b] hover:bg-[#ff851b] hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-[#ff851b]">{customer.name}</h1>
            <p className="text-sm text-[#a0a0a0]">Customer ID: {customer.id}
              {console.log(customer)}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => copyCustomerLink(customer.id)}
            className="btn btn-sm border border-white text-white"
          >
            <Copy className="w-4 h-4 mr-2" />
            Copy Link
          </button>
          <button
            className="btn btn-sm bg-[#ff851b] text-white hover:bg-orange-500"
            onClick={() => navigate(`/customers/edit/${customer.id}`)}
          >
            Edit Customer
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Card title="Status">
          <div className="flex items-center justify-between">
            <div className="badge border border-[#ff851b] text-[#ff851b] bg-transparent">
              {customer.status}
            </div>
            <p className="text-sm text-[#a0a0a0]">Total Orders: {customer.orders?.length ?? 0}</p>
          </div>
        </Card>

        <Card title="GST Number">
          <p className="text-lg">{customer.gstNo || 'N/A'}</p>
        </Card>

        <Card title="Location">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#a0a0a0]" />
            <span>{customer.address || 'N/A'}</span>
          </div>
        </Card>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="space-y-6">
          <Card title="Contact Information">
            <div className="space-y-3 text-sm">
              <InfoRow icon={<User />} label="Name" value={customer.name} />
              <InfoRow icon={<Phone />} label="Phone" value={customer.phone} />
              <InfoRow icon={<Mail />} label="Email" value={customer.email} />
              <InfoRow icon={<MapPin />} label="Address" value={customer.address} />
            </div>
          </Card>

          <Card title="Business Details">
            <Row label="GST Number" value={customer.gstNo || 'N/A'} />
            <Row label="Total Orders" value={customer.orders?.length ?? 0} />
            <Row
              label="Status"
              value={
                <span className="badge border border-[#ff851b] text-[#ff851b] bg-transparent">
                  {customer.status}
                </span>
              }
            />
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card title="Pending Orders" subtitle="Orders that are not yet delivered">
            {customer.pendingOrders?.length ? (
              <div className="overflow-x-auto">
                <table className="table w-full text-sm">
                  <thead className="text-white bg-[#1e1e1e]">
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
                      <tr key={order.id} className="hover bg-[#2e2e2e]">
                        <td>{order.id}</td>
                        <td>{order.name}</td>
                        <td>
                          <span className={`badge ${getStatusBadge(order.status)}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="flex items-center gap-1">
                          <Calendar className="w-4 h-4 text-[#a0a0a0]" />
                          {order.deadline}
                        </td>
                        <td>{order.total}</td>
                        <td>
                          <button
                            className="btn btn-sm border border-white text-white"
                            onClick={() => navigate(`/dashboard/orders/${order.id}`)}
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
              <div className="p-6 text-center text-[#a0a0a0] border border-gray-600 rounded-md">
                No pending orders for this customer.
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

// Reusable components
const Card = ({ title, subtitle, children }) => (
  <div className="bg-[#1e1e1e] p-4 rounded-xl shadow border border-gray-700">
    <h2 className="text-lg font-semibold text-[#ff851b]">{title}</h2>
    {subtitle && <p className="text-sm text-[#a0a0a0] mb-2">{subtitle}</p>}
    <div>{children}</div>
  </div>
);

const InfoRow = ({ icon, label, value }) => (
  <div className="flex items-start gap-2">
    <div className="mt-1 text-[#a0a0a0]">{icon}</div>
    <div>
      <div className="font-medium text-white">{label}</div>
      <div className="text-[#a0a0a0]">{value}</div>
    </div>
  </div>
);

const Row = ({ label, value }) => (
  <div className="flex justify-between py-1 text-sm">
    <span className="text-[#a0a0a0]">{label}:</span>
    <span className="text-white">{value}</span>
  </div>
);

function getStatusBadge(status) {
  switch (status) {
    case 'Processing':
      return 'border border-yellow-400 text-yellow-400 bg-transparent';
    case 'Ready for Delivery':
      return 'border border-cyan-400 text-cyan-400 bg-transparent';
    case 'Out for Delivery':
      return 'border border-blue-400 text-blue-400 bg-transparent';
    case 'Under Process':
      return 'border border-purple-400 text-purple-400 bg-transparent';
    case 'Delivered':
      return 'border border-green-400 text-green-400 bg-transparent';
    default:
      return 'border border-gray-400 text-gray-400 bg-transparent';
  }
}

export default CustomerPage;
