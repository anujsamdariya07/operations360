import React from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  AlertCircle,
  ArrowLeft,
  Calendar,
  Check,
  Copy,
  Download,
  FileText,
  User,
} from 'lucide-react';
import { useBillStore } from '../../store/useBillStore';

const orderData = {
  'ORD-7892': {
    id: 'ORD-7892',
    name: 'Packaging Materials Order',
    customer: 'Acme Corp',
    customerDetails: {
      name: 'Acme Corporation',
      address: '123 Business Park, Mumbai, Maharashtra 400001',
      phone: '+91 9876543210',
      email: 'orders@acmecorp.com',
      gstNo: '27AABCU9603R1ZX',
    },
    status: 'Under Process',
    deadline: '2025-04-25',
    createdAt: '2025-04-10',
    products: [
      {
        id: 'PROD-001',
        name: 'Box Type A',
        quantity: 50,
        rate: 120,
        available: 120,
      },
      {
        id: 'PROD-002',
        name: 'Packaging Tape',
        quantity: 20,
        rate: 80,
        available: 2,
      },
    ],
    advance: '₹5,000.00',
    description: 'Order for standard packaging materials for Q2 product line.',
    totalAmount: '₹7,600.00',
    amountPaid: '₹5,000.00',
    amountRemaining: '₹2,600.00',
    paymentMode: 'Bank Transfer',
    payments: [
      {
        id: 'PAY-001',
        date: '2025-04-10',
        amount: '₹5,000.00',
        mode: 'Bank Transfer',
      },
    ],
  },
};

const generatePDF = (order) => {
  const pdfContent = `INVOICE\n\n${order.name} (${
    order.id
  })\nDate: ${new Date().toLocaleDateString()}\n\nBILL TO:\n${
    order.customerDetails.name
  }\n${order.customerDetails.address}\nPhone: ${
    order.customerDetails.phone
  }\nEmail: ${order.customerDetails.email}\nGST No: ${
    order.customerDetails.gstNo
  }\n\nPRODUCTS:\n${order.products
    .map(
      (p, i) =>
        `${i + 1}. ${p.name} (${p.id})\nQuantity: ${p.quantity} × Rate: ₹${
          p.rate
        } = ₹${p.quantity * p.rate}`
    )
    .join('\n\n')}\n\nPAYMENT DETAILS:\nTotal Amount: ${
    order.totalAmount
  }\nAmount Paid: ${order.amountPaid}\nAmount Remaining: ${
    order.amountRemaining
  }\nPayment Mode: ${order.paymentMode}\n\nThank you for your business!`;
  alert('PDF Bill Generated:\n\n' + pdfContent);
  navigator.clipboard.writeText(pdfContent);
  alert('PDF content copied to clipboard');
};

const copyOrderLink = (orderId) => {
  const url = `${window.location.origin}/orders/${orderId}`;
  navigator.clipboard.writeText(url);
  alert(`Link copied to clipboard: ${url}`);
};

const OrderPage = () => {
  const { orderId } = useParams();
  const order = orderData[orderId];

  const { generateBill, generating } = useBillStore();

  if (!order) {
    return (
      <div className='flex flex-col items-center justify-center min-h-screen px-4 py-10 text-center'>
        <h1 className='text-3xl font-bold text-error mb-4'>Order Not Found</h1>
        <p className='text-gray-500 mb-6'>
          The order you're looking for doesn't exist or has been removed.
        </p>
        <button className='btn btn-outline'>
          <ArrowLeft className='w-4 h-4 mr-2' />
          Back to Orders
        </button>
      </div>
    );
  }

  const inventoryAlerts = order.products.filter(
    (product) => product.available < product.quantity
  );

  return (
    <div className='space-y-6 px-4 md:px-8 py-6'>
      {/* Header */}
      <div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-4'>
        <div className='flex items-center gap-3'>
          <Link to={'/orders'}>
            <button className='btn btn-sm btn-outline'>
              <ArrowLeft className='h-4 w-4' />
            </button>
          </Link>
          <div>
            <h1 className='text-2xl font-bold'>{order.name}</h1>
            <p className='text-sm text-gray-500'>Order ID: {order.id}</p>
          </div>
        </div>
        <div className='flex gap-2'>
          <button
            onClick={() => copyOrderLink(order.id)}
            className='btn btn-outline btn-sm'
          >
            <Copy className='h-4 w-4 mr-1' />
            Copy Link
          </button>
          <button
            onClick={() => generateBill(order)}
            className={`btn btn-outline btn-sm ${
              generating ? 'btn-disabled' : ''
            }`}
          >
            <Download className='h-4 w-4 mr-1' />
            {generating ? 'Generating...' : 'Generate Bill'}
          </button>
        </div>
      </div>

      {/* Status and Deadline */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='card bg-base-100 shadow'>
          <div className='card-body'>
            <h2 className='card-title'>Order Status</h2>
            <div className='flex items-center gap-4'>
              <span
                className={`badge badge-lg ${
                  order.status === 'Under Process'
                    ? 'badge-warning'
                    : 'badge-success'
                }`}
              >
                {order.status}
              </span>
              <p className='text-sm text-gray-500'>
                {order.status === 'Delivered'
                  ? `Completed on ${order.completedAt}`
                  : `Created on ${order.createdAt}`}
              </p>
            </div>
          </div>
        </div>

        <div className='card bg-base-100 shadow'>
          <div className='card-body'>
            <h2 className='card-title'>Deadline</h2>
            <div className='flex items-center gap-2 text-lg'>
              <Calendar className='h-5 w-5 text-primary' />
              <span>{order.deadline}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Inventory Alert */}
      {inventoryAlerts.length > 0 && (
        <div className='alert alert-warning shadow-lg'>
          <AlertCircle className='h-6 w-6' />
          <span>Low inventory for some items!</span>
        </div>
      )}

      {/* Products */}
      <div className='card bg-base-100 shadow'>
        <div className='card-body'>
          <h2 className='card-title mb-2'>Products</h2>
          <ul className='divide-y'>
            {order.products.map((product) => (
              <li
                key={product.id}
                className='py-3 flex justify-between items-center'
              >
                <div>
                  <p className='font-medium'>{product.name}</p>
                  <p className='text-sm text-gray-500'>{product.id}</p>
                </div>
                <div className='text-right'>
                  <p className='text-sm'>
                    {product.quantity} × ₹{product.rate}
                  </p>
                  <p className='text-lg font-bold'>
                    ₹{product.quantity * product.rate}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Payment Summary */}
      <div className='card bg-base-100 shadow'>
        <div className='card-body'>
          <h2 className='card-title mb-2'>Payment Summary</h2>
          <div className='space-y-2 text-sm'>
            <div className='flex justify-between'>
              <span>Total Amount</span>
              <span className='font-medium'>{order.totalAmount}</span>
            </div>
            <div className='flex justify-between'>
              <span>Amount Paid</span>
              <span className='text-success'>{order.amountPaid}</span>
            </div>
            <div className='flex justify-between'>
              <span>Amount Remaining</span>
              <span className='text-error'>{order.amountRemaining}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment History */}
      <div className='card bg-base-100 shadow'>
        <div className='card-body'>
          <h2 className='card-title mb-2'>Payment History</h2>
          <ul className='divide-y'>
            {order.payments.map((payment) => (
              <li key={payment.id} className='py-3 flex justify-between'>
                <div>
                  <p className='font-medium'>Payment ID: {payment.id}</p>
                  <p className='text-sm text-gray-500'>Date: {payment.date}</p>
                </div>
                <div className='text-right'>
                  <p className='text-sm'>Mode: {payment.mode}</p>
                  <p className='text-lg font-bold'>{payment.amount}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
