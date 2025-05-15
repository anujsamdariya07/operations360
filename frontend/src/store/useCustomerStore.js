import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';

const useCustomerStore = create((set) => ({
  customers: [],
  selectedCustomer: null,
  loading: false,

  // Fetch all customers
  fetchCustomers: async () => {
    try {
      set({ loading: true });
      const res = await axiosInstance.get('/customer/customers');
      set({ customers: res.data.customers, loading: false });
    } catch (err) {
      console.error('Fetch Customers Error:', err);
      set({ loading: false });
      toast.error('Failed to load customers.');
    }
  },

// Fetch single customer by ID (with orgId handled via auth token)
fetchCustomerById: async (id) => {
  console.log('fetchCustomerById-1')
  try {
    console.log('fetchCustomerById-2')
    set({ loading: true });
    console.log('fetchCustomerById-3')
    const res = await axiosInstance.get(`/customer/customers/${id}`);
    console.log('fetchCustomerById-4')
    set({ selectedCustomer: res.data.customer });
    console.log('fetchCustomerById-5')
  } catch (err) {
    console.error('Fetch Customer Error:', err);
    toast.error(
      err?.response?.data?.message || 'Failed to load customer.'
    );
  } finally {
    set({ loading: false });
  }
},


  // Create a new customer
  createCustomer: async (customerData) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.post('/customer/customers', customerData);
      set((state) => ({
        customers: [...state.customers, res.data.customer],
      }));
      toast.success('Customer created successfully!');
      return true;
    } catch (err) {
      console.error('Create Customer Error:', err);
      toast.error(err?.response?.data?.error || 'Failed to create customer.');
      return false;
    } finally {
      set({ loading: false });
    }
  },

  // Update an existing customer
  updateCustomer: async (id, data) => {
    try {
      const res = await axiosInstance.put(`/customer/customers/${id}`, data);
      set((state) => ({
        customers: state.customers.map((cust) =>
          cust._id === id ? res.data : cust
        ),
      }));
      toast.success('Customer updated successfully!');
    } catch (err) {
      console.error('Update Customer Error:', err);
      toast.error('Failed to update customer.');
    }
  },

  // Delete a customer
  deleteCustomer: async (id) => {
    set({ loading: true });
    try {
      await axiosInstance.delete(`/customer/customers/${id}`);
      set((state) => ({
        customers: state.customers.filter((cust) => cust._id !== id),
      }));
      toast.success('Customer deleted successfully!');
    } catch (err) {
      console.error('Delete Customer Error:', err);
      toast.error('Failed to delete customer.');
    } finally {
      set({ loading: false });
    }
  },
}));

export default useCustomerStore;
