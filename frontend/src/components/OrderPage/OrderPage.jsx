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

const currentOrders = {
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
    status: 'Processing',
    deadline: '2025-04-25',
    createdAt: '2025-04-10',
    products: [
      {
        id: 'PROD-001',
        name: 'Box Type A',
        quantity: 10,
        rate: 50,
        available: 30,
      },
      {
        id: 'PROD-002',
        name: 'Packaging Tape',
        quantity: 5,
        rate: 40,
        available: 10,
      },
    ],
    advance: '₹1,000.00',
    description: 'Packaging for Q2 production.',
    totalAmount: '₹1,200.00',
    amountPaid: '₹1,000.00',
    amountRemaining: '₹200.00',
    paymentMode: 'UPI',
    payments: [
      { id: 'PAY-001', date: '2025-04-10', amount: '₹1,000.00', mode: 'UPI' },
    ],
  },

  'ORD-7891': {
    id: 'ORD-7891',
    name: 'Tech Component Order',
    customer: 'TechGiant Inc',
    customerDetails: {
      name: 'TechGiant Inc.',
      address: '456 Innovation Lane, Bengaluru, KA 560001',
      phone: '+91 9123456780',
      email: 'procure@techgiant.com',
      gstNo: '29ABCDE1234F2Z5',
    },
    status: 'Ready',
    deadline: '2025-04-22',
    createdAt: '2025-04-05',
    products: [
      {
        id: 'PROD-005',
        name: 'Circuit Board',
        quantity: 30,
        rate: 100,
        available: 100,
      },
      {
        id: 'PROD-007',
        name: 'Heat Sink',
        quantity: 15,
        rate: 90,
        available: 50,
      },
    ],
    advance: '₹1,000.00',
    description: 'Components for device batch A7.',
    totalAmount: '₹3,450.00',
    amountPaid: '₹1,000.00',
    amountRemaining: '₹2,450.00',
    paymentMode: 'Bank Transfer',
    payments: [
      {
        id: 'PAY-002',
        date: '2025-04-05',
        amount: '₹1,000.00',
        mode: 'Bank Transfer',
      },
    ],
  },

  'ORD-7890': {
    id: 'ORD-7890',
    name: 'Safety Kit Order',
    customer: 'Global Supplies',
    customerDetails: {
      name: 'Global Supplies Pvt Ltd',
      address: '12 Export Nagar, Delhi 110001',
      phone: '+91 9988776655',
      email: 'safety@globalsupplies.com',
      gstNo: '07GHJKL7890P1Z6',
    },
    status: 'In Production',
    deadline: '2025-04-30',
    createdAt: '2025-04-12',
    products: [
      {
        id: 'PROD-011',
        name: 'Safety Gloves',
        quantity: 20,
        rate: 20,
        available: 100,
      },
      {
        id: 'PROD-012',
        name: 'Helmets',
        quantity: 5,
        rate: 98.1,
        available: 50,
      },
    ],
    advance: '₹300.00',
    description: 'Safety kits for construction team.',
    totalAmount: '₹890.50',
    amountPaid: '₹300.00',
    amountRemaining: '₹590.50',
    paymentMode: 'Cash',
    payments: [
      { id: 'PAY-003', date: '2025-04-12', amount: '₹300.00', mode: 'Cash' },
    ],
  },

  'ORD-7889': {
    id: 'ORD-7889',
    name: 'Packaging Order - Local',
    customer: 'Local Manufacturing',
    customerDetails: {
      name: 'Local Manufacturing Co.',
      address: '88 Industrial Area, Pune, MH 411001',
      phone: '+91 9090909090',
      email: 'local@manufacturing.in',
      gstNo: '27LMNOP3456Z1Z1',
    },
    status: 'Shipped',
    deadline: '2025-04-20',
    createdAt: '2025-04-01',
    products: [
      {
        id: 'PROD-021',
        name: 'Corrugated Sheets',
        quantity: 30,
        rate: 70,
        available: 60,
      },
    ],
    advance: '₹1,000.00',
    description: 'Urgent packaging order.',
    totalAmount: '₹2,100.00',
    amountPaid: '₹1,000.00',
    amountRemaining: '₹1,100.00',
    paymentMode: 'Cheque',
    payments: [
      {
        id: 'PAY-004',
        date: '2025-04-01',
        amount: '₹1,000.00',
        mode: 'Cheque',
      },
    ],
  },

  'ORD-7888': {
    id: 'ORD-7888',
    name: 'Construction Supplies',
    customer: 'City Builders',
    customerDetails: {
      name: 'City Builders Ltd',
      address: '89 Builders Road, Chennai 600001',
      phone: '+91 9876501234',
      email: 'supply@citybuilders.com',
      gstNo: '33ZXYC0987U1Z9',
    },
    status: 'Processing',
    deadline: '2025-05-05',
    createdAt: '2025-04-15',
    products: [
      {
        id: 'PROD-030',
        name: 'Steel Rods',
        quantity: 20,
        rate: 150,
        available: 40,
      },
      {
        id: 'PROD-031',
        name: 'Concrete Bags',
        quantity: 10,
        rate: 300,
        available: 20,
      },
    ],
    advance: '₹2,500.00',
    description: 'Supplies for site #14.',
    totalAmount: '₹4,500.00',
    amountPaid: '₹2,500.00',
    amountRemaining: '₹2,000.00',
    paymentMode: 'Bank Transfer',
    payments: [
      {
        id: 'PAY-005',
        date: '2025-04-15',
        amount: '₹2,500.00',
        mode: 'Bank Transfer',
      },
    ],
  },
};

const previousOrders = {
  'ORD-7850': {
    id: 'ORD-7850',
    name: 'Bulk Cartons',
    customer: 'Acme Corp',
    customerDetails: {
      name: 'Acme Corporation',
      address: '123 Business Park, Mumbai, Maharashtra 400001',
      phone: '+91 9876543210',
      email: 'orders@acmecorp.com',
      gstNo: '27AABCU9603R1ZX',
    },
    status: 'Completed',
    deadline: '2025-04-10',
    createdAt: '2025-03-28',
    products: [
      { id: 'PROD-041', name: 'Carton Boxes', quantity: 50, rate: 46 },
    ],
    advance: '₹2,300.00',
    description: 'Monthly carton supply.',
    totalAmount: '₹2,300.00',
    amountPaid: '₹2,300.00',
    amountRemaining: '₹0.00',
    paymentMode: 'Bank Transfer',
    payments: [
      {
        id: 'PAY-006',
        date: '2025-03-28',
        amount: '₹2,300.00',
        mode: 'Bank Transfer',
      },
    ],
  },

  'ORD-7842': {
    id: 'ORD-7842',
    name: 'Component Delivery',
    customer: 'TechGiant Inc',
    customerDetails: {
      name: 'TechGiant Inc.',
      address: '456 Innovation Lane, Bengaluru, KA 560001',
      phone: '+91 9123456780',
      email: 'procure@techgiant.com',
      gstNo: '29ABCDE1234F2Z5',
    },
    status: 'Completed',
    deadline: '2025-04-05',
    createdAt: '2025-03-20',
    products: [{ id: 'PROD-050', name: 'Chip Set X1', quantity: 25, rate: 70 }],
    advance: '₹1,750.00',
    description: 'Delivery of chipsets for Q1.',
    totalAmount: '₹1,750.00',
    amountPaid: '₹1,750.00',
    amountRemaining: '₹0.00',
    paymentMode: 'UPI',
    payments: [
      { id: 'PAY-007', date: '2025-03-20', amount: '₹1,750.00', mode: 'UPI' },
    ],
  },

  'ORD-7835': {
    id: 'ORD-7835',
    name: 'Safety Delivery',
    customer: 'Global Supplies',
    customerDetails: {
      name: 'Global Supplies Pvt Ltd',
      address: '12 Export Nagar, Delhi 110001',
      phone: '+91 9988776655',
      email: 'safety@globalsupplies.com',
      gstNo: '07GHJKL7890P1Z6',
    },
    status: 'Completed',
    deadline: '2025-03-28',
    createdAt: '2025-03-10',
    products: [
      { id: 'PROD-060', name: 'Safety Goggles', quantity: 20, rate: 40 },
      { id: 'PROD-061', name: 'Face Shields', quantity: 10, rate: 89.05 },
    ],
    advance: '₹3,290.50',
    description: 'Safety materials for plant.',
    totalAmount: '₹3,290.50',
    amountPaid: '₹3,290.50',
    amountRemaining: '₹0.00',
    paymentMode: 'Cash',
    payments: [
      { id: 'PAY-008', date: '2025-03-10', amount: '₹3,290.50', mode: 'Cash' },
    ],
  },

  'ORD-7830': {
    id: 'ORD-7830',
    name: 'Local Boxes',
    customer: 'Local Manufacturing',
    customerDetails: {
      name: 'Local Manufacturing Co.',
      address: '88 Industrial Area, Pune, MH 411001',
      phone: '+91 9090909090',
      email: 'local@manufacturing.in',
      gstNo: '27LMNOP3456Z1Z1',
    },
    status: 'Completed',
    deadline: '2025-03-22',
    createdAt: '2025-03-01',
    products: [{ id: 'PROD-071', name: 'Box Type B', quantity: 30, rate: 60 }],
    advance: '₹1,800.00',
    description: 'End of quarter shipment.',
    totalAmount: '₹1,800.00',
    amountPaid: '₹1,800.00',
    amountRemaining: '₹0.00',
    paymentMode: 'UPI',
    payments: [
      { id: 'PAY-009', date: '2025-03-01', amount: '₹1,800.00', mode: 'UPI' },
    ],
  },

  'ORD-7825': {
    id: 'ORD-7825',
    name: 'Heavy Supplies',
    customer: 'City Builders',
    customerDetails: {
      name: 'City Builders Ltd',
      address: '89 Builders Road, Chennai 600001',
      phone: '+91 9876501234',
      email: 'supply@citybuilders.com',
      gstNo: '33ZXYC0987U1Z9',
    },
    status: 'Completed',
    deadline: '2025-03-15',
    createdAt: '2025-02-25',
    products: [
      { id: 'PROD-081', name: 'Concrete Mix', quantity: 10, rate: 400 },
      { id: 'PROD-082', name: 'Bricks', quantity: 100, rate: 8 },
    ],
    advance: '₹5,200.00',
    description: 'Bulk construction supplies.',
    totalAmount: '₹5,200.00',
    amountPaid: '₹5,200.00',
    amountRemaining: '₹0.00',
    paymentMode: 'Bank Transfer',
    payments: [
      {
        id: 'PAY-010',
        date: '2025-02-25',
        amount: '₹5,200.00',
        mode: 'Bank Transfer',
      },
    ],
  },
};

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
  let order = currentOrders[orderId];

  if (!order) order = previousOrders[orderId];

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
                  order.status === 'Processing'
                    ? 'badge-warning'
                    : order.status === 'Shipped'
                    ? 'badge-success'
                    : order.status === 'In Production'
                    ? 'badge-primary'
                    : 'badge-info'
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
