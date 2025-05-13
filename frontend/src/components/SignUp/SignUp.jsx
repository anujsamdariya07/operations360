import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LoaderCircle, UserPlus } from 'lucide-react';
import useAuthStore from '../../store/useAuthStore';
import toast from 'react-hot-toast';
import { useEffect } from 'react';

const Signup = () => {
  const navigate = useNavigate();

  const { signUp, loading, authUser } = useAuthStore();

  const [orgForm, setOrgForm] = useState({
    name: '',
    mobileNo: '',
    email: '',
    password: '',
    gstNo: '',
    address: '',
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setOrgForm({ ...orgForm, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, mobileNo, email, password, gstNo, address } = orgForm;
    if (!name || !mobileNo || !email || !password || !gstNo || !address) {
      alert('Please fill in all required fields.');
      return;
    }

    const result = await signUp(orgForm);
    if (result.success) {
      console.log(result.success);
      // navigate('/dashboard');
    }
  };

  useEffect(() => {
    if (authUser) {
      navigate('/dashboard');
    }
  }, [authUser, navigate]);

  return (
    <div className='min-h-screen bg-[#2d2d2d] text-white flex items-center justify-center px-4'>
      <div className='w-full max-w-4xl space-y-8'>
        <div className='text-center'>
          <div className='flex justify-center mb-4'>
            <UserPlus className='text-[#ff851b]' size={36} />
          </div>
          <h1 className='text-4xl font-bold text-[#ff851b]'>
            Organization Signup
          </h1>
          <p className='text-gray-400'>
            Register your organization to get started
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className='bg-[#1f1f1f] border border-gray-700 rounded-xl px-8 py-4 shadow-lg space-y-6'
        >
          <h2 className='text-xl font-semibold text-[#ff851b]'>
            Organization Details
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <InputField
              label='Organization Name'
              id='name'
              value={orgForm.name}
              onChange={handleFormChange}
            />
            <InputField
              label='Mobile Number'
              id='mobileNo'
              value={orgForm.mobileNo}
              onChange={handleFormChange}
            />
            <InputField
              label='Email Address'
              id='email'
              type='email'
              value={orgForm.email}
              onChange={handleFormChange}
            />
            <InputField
              label='Password'
              id='password'
              type='password'
              value={orgForm.password}
              onChange={handleFormChange}
            />
            <InputField
              label='GST Number'
              id='gstNo'
              value={orgForm.gstNo}
              onChange={handleFormChange}
            />
            <div className='md:col-span-2'>
              <label
                htmlFor='address'
                className='text-sm font-medium block mb-1'
              >
                Address
              </label>
              <textarea
                id='address'
                name='address'
                rows={3}
                value={orgForm.address}
                onChange={handleFormChange}
                placeholder='Enter complete address'
                className='textarea textarea-bordered w-full bg-[#3a3a3a] text-white border-gray-600 placeholder-gray-400 focus:border-[#ff851b] focus:outline-none'
                required
              />
            </div>
          </div>

          <div className='flex justify-end gap-4 mt-4'>
            <button
              type='submit'
              className='btn bg-[#ff851b] text-white hover:bg-[#ff571d] transition-all'
              disabled={loading}
            >
              {loading ? <LoaderCircle className='animate-spin' /> : 'Sign Up'}
            </button>
          </div>
        </form>

        <p className='text-sm text-gray-400 text-center'>
          Already have an account?{' '}
          <Link to='/sign-in' className='text-[#ff851b] hover:underline'>
            Sign in here.
          </Link>
        </p>
      </div>
    </div>
  );
};

const InputField = ({ label, id, type = 'text', value, onChange }) => (
  <div>
    <label htmlFor={id} className='block text-sm font-medium mb-1'>
      {label}
    </label>
    <input
      id={id}
      name={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={`Enter ${label.toLowerCase()}`}
      className='input input-bordered w-full bg-[#3a3a3a] text-white border-gray-600 placeholder-gray-400 focus:border-[#ff851b] focus:outline-none transition-all'
      required
    />
  </div>
);

export default Signup;
