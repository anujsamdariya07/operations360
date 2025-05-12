import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
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
  let order = currentOrders[orderId] || previousOrders[orderId];
  const navigate = useNavigate();
  const { generateBill, generating } = useBillStore();

  const Card = ({ title, children }) => (
    <div className='bg-[#1e1e1e] p-4 rounded-xl shadow border border-gray-700'>
      <h2 className='text-lg font-semibold text-[#ff851b] mb-2'>{title}</h2>
      {children}
    </div>
  );

  const Row = ({ label, value, color = 'text-white' }) => (
    <div className='flex justify-between text-sm py-1'>
      <span className='text-[#a0a0a0]'>{label}</span>
      <span className={color}>{value}</span>
    </div>
  );

  function getStatusBadge(status) {
    switch (status) {
      case 'Processing':
        return 'border border-yellow-400 text-yellow-400 bg-transparent';
      case 'Ready':
        return 'border border-cyan-400 text-cyan-400 bg-transparent';
      case 'In Production':
        return 'border border-blue-400 text-blue-400 bg-transparent';
      case 'Shipped':
        return 'border border-green-400 text-green-400 bg-transparent';
      default:
        return 'border border-gray-400 text-gray-400 bg-transparent';
    }
  }

  if (!order) {
    return (
      <div className='min-h-screen bg-[#2d2d2d] text-white flex flex-col justify-center items-center p-4'>
        <h1 className='text-2xl font-bold mb-2 text-[#ff851b]'>
          Order Not Found
        </h1>
        <p className='text-[#a0a0a0] mb-6 text-center max-w-md'>
          The order you're looking for doesn't exist or has been removed.
        </p>
        <button
          className='btn border border-white text-white'
          onClick={() => navigate('/orders')}
        >
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
    <div className='min-h-screen bg-[#2d2d2d] text-white p-4 space-y-6'>
      {/* Header */}
      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-3'>
          <button
            onClick={() => navigate('/orders')}
            className='btn btn-sm border border-[#ff851b] text-[#ff851b] hover:bg-[#ff851b] hover:text-white'
          >
            <ArrowLeft className='w-4 h-4' />
          </button>
          <div>
            <h1 className='text-2xl font-bold text-[#ff851b]'>{order.name}</h1>
            <p className='text-sm text-[#a0a0a0]'>Order ID: {order.id}</p>
          </div>
        </div>

        <div className='flex gap-2'>
          <button
            onClick={() => copyOrderLink(order.id)}
            className='btn btn-sm border border-white text-white'
          >
            <Copy className='w-4 h-4 mr-2' />
            Copy Link
          </button>
          <button
            onClick={() => generateBill(order)}
            className={`btn btn-sm bg-[#ff851b] text-white hover:bg-orange-500 ${
              generating ? 'btn-disabled opacity-50' : ''
            }`}
          >
            <Download className='w-4 h-4 mr-2' />
            {generating ? 'Generating...' : 'Generate Bill'}
          </button>
        </div>
      </div>

      {/* Status + Deadline */}
      <div className='grid md:grid-cols-2 gap-4'>
        <Card title='Order Status'>
          <div className='flex items-center justify-between'>
            <span className={`badge ${getStatusBadge(order.status)}`}>
              {order.status}
            </span>
            <p className='text-sm text-[#a0a0a0]'>
              Created on {order.createdAt}
            </p>
          </div>
        </Card>

        <Card title='Deadline'>
          <div className='flex items-center gap-2 text-lg'>
            <Calendar className='w-5 h-5 text-[#a0a0a0]' />
            <span>{order.deadline}</span>
          </div>
        </Card>
      </div>

      {/* Inventory Alert */}
      {inventoryAlerts.length > 0 && (
        <div className='border border-yellow-400 text-yellow-400 bg-[#3a2f1e] p-4 rounded-md'>
          <AlertCircle className='h-5 w-5 inline mr-2' />
          Low inventory for some items!
        </div>
      )}

      {/* Products */}
      <Card title='Products'>
        <ul className='divide-y divide-gray-700'>
          {order.products.map((p) => (
            <li key={p.id} className='py-3 flex justify-between items-center'>
              <div>
                <p className='font-medium text-white'>{p.name}</p>
                <p className='text-sm text-[#a0a0a0]'>{p.id}</p>
              </div>
              <div className='text-right'>
                <p className='text-sm text-[#a0a0a0]'>
                  {p.quantity} × ₹{p.rate}
                </p>
                <p className='text-lg font-bold text-white'>
                  ₹{p.quantity * p.rate}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Card>

      {/* Payment Summary */}
      <Card title='Payment Summary'>
        <Row label='Total Amount' value={order.totalAmount} />
        <Row
          label='Amount Paid'
          value={order.amountPaid}
          color='text-green-400'
        />
        <Row
          label='Amount Remaining'
          value={order.amountRemaining}
          color='text-red-400'
        />
      </Card>

      {/* Payment History */}
      <Card title='Payment History'>
        <ul className='divide-y divide-gray-700'>
          {order.payments.map((p) => (
            <li key={p.id} className='py-3 flex justify-between'>
              <div>
                <p className='font-medium text-white'>Payment ID: {p.id}</p>
                <p className='text-sm text-[#a0a0a0]'>Date: {p.date}</p>
              </div>
              <div className='text-right'>
                <p className='text-sm text-[#a0a0a0]'>Mode: {p.mode}</p>
                <p className='text-lg font-bold text-white'>{p.amount}</p>
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
};

export default OrderPage;
