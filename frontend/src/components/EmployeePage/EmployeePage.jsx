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

const employeeData = {
  'EMP-001': {
    id: 'EMP-001',
    name: 'John Doe',
    role: 'Admin',
    email: 'john@company.com',
    phone: '123-456-7890',
    address: '123 Main St, Cityville',
    joiningDate: '2023-01-15',
    status: 'Active',
    location: 'Head Office',
    assignedTasks: [],
  },
  'EMP-002': {
    id: 'EMP-002',
    name: 'Jane Smith',
    role: 'Manager',
    email: 'jane@company.com',
    phone: '987-654-3210',
    address: '456 Maple Ave, Townsville',
    joiningDate: '2022-08-20',
    status: 'Active',
    location: 'Branch Office',
    assignedTasks: [],
  },
  'EMP-003': {
    id: 'EMP-003',
    name: 'Alice Johnson',
    role: 'Worker',
    email: 'alice@company.com',
    phone: '555-000-1111',
    address: '789 Oak Blvd, Hamlet',
    joiningDate: '2024-03-10',
    status: 'Inactive',
    location: 'Remote',
    assignedTasks: [],
  },
};

const EmployeePage = () => {
  const { employeeId } = useParams();
  const navigate = useNavigate();
  const employee = employeeData[employeeId];

  if (!employee) {
    return (
      <div className='flex items-center justify-center h-64 text-red-400'>
        Employee not found
      </div>
    );
  }

  const copyEmployeeLink = (employeeId) => {
    const url = `${window.location.origin}/employees/${employeeId}`;
    navigator.clipboard.writeText(url);
    alert(`Link copied: ${url}`);
  };

  return (
    <div className='p-6 mx-auto w-full bg-[#2b2b2b] rounded-xl shadow-md text-white'>
      <div className='flex justify-between items-center mb-6'>
        <div className='flex items-center gap-4'>
          <button
            className='btn btn-sm btn-outline border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-white'
            onClick={() => navigate('/employees')}
          >
            <ArrowLeft className='w-4 h-4 mr-1' />
          </button>
          <div>
            <h1 className='text-3xl font-bold text-[#ff851b]'>{employee.name}</h1>
            <p className='text-sm text-gray-400'>Employee ID: {employee.id}</p>
          </div>
        </div>
        <div className='flex gap-2'>
          <button
            className='btn btn-sm btn-outline border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-white'
            onClick={() => copyEmployeeLink(employee.id)}
          >
            <Copy className='w-4 h-4 mr-1' />
            Copy Link
          </button>
          <button className='btn btn-sm bg-orange-500 text-white hover:bg-orange-600'>
            Edit
          </button>
        </div>
      </div>

      <div className='grid md:grid-cols-3 gap-4 mb-6'>
        <Card title='Status'>
          <div className='flex items-center gap-4'>
            <div className={`badge ${employee.status === 'Active' ? 'badge-outline' : 'badge-secondary'}`}>
              {employee.status}
            </div>
            <p className='text-sm text-gray-400'>{employee.role}</p>
          </div>
        </Card>
        <Card title='Joining Date'>
          <div className='flex items-center gap-2'>
            <Calendar className='w-5 h-5 text-gray-400' />
            <span className='text-base'>{employee.joiningDate}</span>
          </div>
        </Card>
        <Card title='Location'>
          <div className='flex items-center gap-2'>
            <MapPin className='w-5 h-5 text-gray-400' />
            <span className='text-base'>{employee.location}</span>
          </div>
        </Card>
      </div>

      <div className='grid md:grid-cols-3 gap-4'>
        <div className='space-y-4'>
          <Card title='Contact Information'>
            <InfoRow icon={<User />} label='Name' value={employee.name} />
            <InfoRow icon={<Phone />} label='Phone' value={employee.phone} />
            <InfoRow icon={<Mail />} label='Email' value={employee.email} />
            <InfoRow icon={<MapPin />} label='Address' value={employee.address} />
          </Card>

          <Card title='Employee Details'>
            <Detail label='Role' value={employee.role} />
            <Detail label='Joining Date' value={employee.joiningDate} />
            <Detail label='Status' value={<span className={`badge ${employee.status === 'Active' ? 'badge-outline' : 'badge-secondary'}`}>{employee.status}</span>} />
          </Card>
        </div>

        <div className='md:col-span-2'>
          <Card title='Assigned Tasks'>
            {employee.assignedTasks?.length ? (
              <div className='overflow-x-auto'>
                <table className='table table-zebra w-full'>
                  <thead>
                    <tr>
                      <th>Task ID</th>
                      <th>Title</th>
                      <th>Status</th>
                      <th>Deadline</th>
                      <th>Priority</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employee.assignedTasks.map((task) => (
                      <tr key={task.id}>
                        <td>{task.id}</td>
                        <td>{task.title}</td>
                        <td>
                          <span className={`badge ${getStatusBadge(task.status)}`}>{task.status}</span>
                        </td>
                        <td className='flex items-center gap-1'>
                          <Calendar className='w-4 h-4 text-gray-400' />
                          {task.deadline}
                        </td>
                        <td>{task.priority}</td>
                        <td>
                          <button
                            className='btn btn-sm btn-outline text-orange-400 border-orange-500 hover:bg-orange-500 hover:text-white'
                            onClick={() => navigate(`/dashboard/tasks/${task.id}`)}
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
              <div className='p-8 text-center text-gray-400 border border-gray-600 rounded-md'>
                No tasks assigned to this employee.
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

const Card = ({ title, children }) => (
  <div className='bg-[#2d2d2d] border border-gray-700 rounded-xl p-4'>
    <h2 className='text-lg font-bold text-[#ff851b] mb-3'>{title}</h2>
    <div className='text-sm text-white space-y-2'>{children}</div>
  </div>
);

const InfoRow = ({ icon, label, value }) => (
  <div className='flex items-start gap-3'>
    <div className='mt-1 text-gray-400'>{icon}</div>
    <div>
      <div className='font-medium'>{label}</div>
      <div className='text-gray-300'>{value}</div>
    </div>
  </div>
);

const Detail = ({ label, value }) => (
  <div className='flex justify-between text-gray-300'>
    <span className='text-gray-400'>{label}:</span>
    <span>{value}</span>
  </div>
);

function getStatusBadge(status) {
  switch (status) {
    case 'In Progress':
      return 'badge-primary';
    case 'Assigned':
      return 'badge-outline';
    case 'Completed':
      return 'badge-success';
    default:
      return 'badge-outline';
  }
}

export default EmployeePage;
