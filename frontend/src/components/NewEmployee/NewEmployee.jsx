import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NewEmployee = () => {
  const navigate = useNavigate();

  const [employeeForm, setEmployeeForm] = useState({
    name: '',
    role: '',
    email: '',
    status: 'active',
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEmployeeForm({
      ...employeeForm,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!employeeForm.name || !employeeForm.email || !employeeForm.role) {
      alert('Please fill in all required fields.');
      return;
    }

    console.log('Employee created:', {
      id: `EMP-${Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, '0')}`,
      ...employeeForm,
    });

    navigate('/dashboard/employees');
  };

  return (
    <div className='space-y-6 p-6 bg-[#2d2d2d] min-h-screen text-white'>
      <div>
        <h1 className='text-3xl font-bold text-[#ff851b]'>Add New Employee</h1>
        <p className='text-gray-400'>
          Enter employee details to add them to the system
        </p>
      </div>

      <form onSubmit={handleSubmit} className='space-y-8'>
        {/* Employee Information Card */}
        <div className='bg-[#1f1f1f] border border-gray-700 p-6 rounded-md'>
          <h2 className='font-bold text-lg mb-2 text-[#ff851b]'>
            Employee Information
          </h2>
          <p className='text-sm text-gray-400 mb-4'>
            Basic information about the employee
          </p>
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
            <div className='space-y-2'>
              <label htmlFor='name' className='block text-sm font-medium'>
                Employee Name
              </label>
              <input
                id='name'
                name='name'
                value={employeeForm.name}
                onChange={handleFormChange}
                placeholder='Enter employee name'
                className='input input-bordered w-full bg-[#3a3a3a] text-white border-gray-600 placeholder-gray-400'
                required
              />
            </div>

            <div className='space-y-2'>
              <label htmlFor='email' className='block text-sm font-medium'>
                Email Address
              </label>
              <input
                id='email'
                name='email'
                type='email'
                value={employeeForm.email}
                onChange={handleFormChange}
                placeholder='Enter email address'
                className='input input-bordered w-full bg-[#3a3a3a] text-white border-gray-600 placeholder-gray-400'
                required
              />
            </div>

            <div className='space-y-2'>
              <label htmlFor='role' className='block text-sm font-medium'>
                Role
              </label>
              <input
                id='role'
                name='role'
                value={employeeForm.role}
                onChange={handleFormChange}
                placeholder='Enter employee role (e.g., Admin, Manager)'
                className='input input-bordered w-full bg-[#3a3a3a] text-white border-gray-600 placeholder-gray-400'
                required
              />
            </div>

            <div className='space-y-2'>
              <label htmlFor='status' className='block text-sm font-medium'>
                Status
              </label>
              <input
                id='status'
                name='status'
                value={employeeForm.status}
                readOnly
                className='input input-bordered w-full bg-[#3a3a3a] text-white border-gray-600 cursor-not-allowed'
              />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className='flex justify-end gap-4'>
          <button
            type='button'
            className='px-4 py-2 rounded border border-gray-600 text-gray-300 hover:bg-[#444]'
            onClick={() => navigate('/dashboard/employees')}
          >
            Cancel
          </button>
          <button
            type='submit'
            className='inline-flex items-center bg-[#ff851b] text-white px-4 py-2 rounded hover:bg-[#ff571d]'
          >
            Save Employee
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewEmployee;
