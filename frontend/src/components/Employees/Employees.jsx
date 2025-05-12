import { useState } from 'react';
import {
  Plus,
  Search,
  Funnel,
  Copy,
  ArrowUpDown,
  BadgeCheck,
  ShieldCheck,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Employees = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('active');

  const activeEmployees = [
    {
      id: 'EMP-001',
      name: 'John Doe',
      role: 'Admin',
      email: 'john@company.com',
    },
    {
      id: 'EMP-002',
      name: 'Jane Smith',
      role: 'Manager',
      email: 'jane@company.com',
    },
    {
      id: 'EMP-003',
      name: 'Alice Johnson',
      role: 'Worker',
      email: 'alice@company.com',
    },
  ];

  const inactiveEmployees = [
    {
      id: 'EMP-004',
      name: 'Bob Brown',
      role: 'Worker',
      email: 'bob@company.com',
    },
  ];

  const filteredActive = activeEmployees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredInactive = inactiveEmployees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const copyEmail = (email) => {
    navigator.clipboard.writeText(email);
    alert(`Copied email to clipboard: ${email}`);
  };

  const RoleBadge = ({ role }) => {
    const colors = {
      Admin: 'bg-red-500',
      Manager: 'bg-blue-500',
      Worker: 'bg-green-500',
    };
    return (
      <span
        className={`px-2 py-1 text-xs rounded text-white font-semibold ${
          colors[role] || 'bg-gray-500'
        }`}
      >
        {role}
      </span>
    );
  };

  const renderEmployeeTable = (employees) => (
    <div className='overflow-x-auto border rounded-lg bg-[#2d2d2d]'>
      <table className='w-full text-sm text-white'>
        <thead className='border-b'>
          <tr>
            <th className='text-left p-4'>Employee ID</th>
            <th className='text-left p-4'>Name</th>
            <th className='text-left p-4'>Role</th>
            <th className='text-left p-4'>Email</th>
            <th className='text-left p-4'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((emp) => (
              <tr key={emp.id} className='border-t border-[#ff851b]/30'>
                <td className='p-4 font-medium'>{emp.id}</td>
                <td className='p-4'>{emp.name}</td>
                <td className='p-4'>
                  <RoleBadge role={emp.role} />
                </td>
                <td className='p-4'>{emp.email}</td>
                <td className='p-4 space-x-2'>
                  <Link
                    to={`/employees/${emp.id}`}
                    className='text-[#ff851b] underline text-sm'
                  >
                    Details
                  </Link>
                  <button
                    onClick={() => copyEmail(emp.email)}
                    className='inline-flex items-center gap-1 text-gray-400 text-sm hover:underline'
                  >
                    <Copy className='w-4 h-4' />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan='5' className='text-center text-gray-500 py-4'>
                No employees found matching your search.
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
          <h1 className='text-3xl font-bold text-[#ff851b]'>Employees</h1>
          <p className='text-gray-400'>Manage and track employees</p>
        </div>
        <Link
          to='/employees/new'
          className='inline-flex items-center bg-[#ff851b] text-white px-4 py-2 rounded hover:bg-[#ff571d]'
        >
          <Plus className='w-4 h-4 mr-2' />
          Add Employee
        </Link>
      </div>

      <div className='flex flex-col md:flex-row gap-4'>
        <div className='relative flex-1'>
          <Search className='absolute left-2 top-2.5 w-4 h-4 text-gray-400' />
          <input
            type='search'
            placeholder='Search employees...'
            className='pl-8 pr-4 py-2 border rounded w-full bg-[#2d2d2d] text-white'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className='px-4 py-2 border border-[#ff851b] text-[#ff851b] rounded-md font-medium transition duration-200 hover:bg-[#ff851b] hover:text-white shadow-md flex gap-1 items-center'>
          <Funnel className='w-4 h-4' />
        </button>
        <button
          onClick={() =>
            copyEmail(
              (activeTab === 'active' ? filteredActive : filteredInactive)[0]
                ?.email || ''
            )
          }
          className='px-4 py-2 border border-[#ff851b] text-[#ff851b] rounded-md font-medium transition duration-200 hover:bg-[#ff851b] hover:text-white shadow-md flex gap-1 items-center'
        >
          <Copy className='w-4 h-4' />
        </button>
      </div>

      <div>
        <div className='flex border-b border-[#ff851b]/30'>
          <button
            className={`px-4 py-2 text-sm text-[#ff851b] ${
              activeTab === 'active'
                ? 'border-b-2 border-[#ff851b] font-semibold'
                : ''
            }`}
            onClick={() => setActiveTab('active')}
          >
            Active Employees
          </button>
          <button
            className={`px-4 py-2 text-sm text-[#ff851b] ${
              activeTab === 'inactive'
                ? 'border-b-2 border-[#ff851b] font-semibold'
                : ''
            }`}
            onClick={() => setActiveTab('inactive')}
          >
            Inactive Employees
          </button>
        </div>

        <div className='pt-4 space-y-4'>
          <div className='flex items-center justify-between'>
            <h2 className='text-xl font-semibold text-[#ff851b]'>
              {activeTab === 'active' ? 'Active Employees' : 'Inactive Employees'}
            </h2>
            <button className='text-sm border rounded px-3 py-1 flex items-center text-[#ff851b]'>
              <ArrowUpDown className='w-4 h-4 mr-1' />
              Sort
            </button>
          </div>
          {renderEmployeeTable(
            activeTab === 'active' ? filteredActive : filteredInactive
          )}
        </div>
      </div>
    </div>
  );
};

export default Employees;
