import { create } from 'zustand';
import toast from 'react-hot-toast';
import { axiosInstance } from '../lib/axios';

const useVendorStore = create((set) => ({
  vendors: [],
  vendor: null,
  loading: false,
  error: null,

  fetchVendors: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get('/vendor/vendors');
      set({ vendors: res.data.vendors, loading: false });
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to fetch vendors';
      console.error('Fetch Vendors Error:', err);
      toast.error(message);
      set({ error: message, loading: false });
    }
  },

  fetchVendorById: async (id) => {
    console.log('fetchVendorById-1')
    set({ loading: true, error: null });
    console.log('fetchVendorById-2')
    try {
      console.log('fetchVendorById-3')
      const res = await axiosInstance.get(`/vendor/vendors/${id}`);
      console.log('fetchVendorById-4')
      set({ vendor: res.data.vendor, loading: false });
      console.log('fetchVendorById-5')
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to fetch vendor';
      console.error('Fetch Vendor Error:', err);
      toast.error(message);
      set({ error: message, loading: false });
    }
  },

  createVendor: async (vendorData) => {
    console.log('createVendor-1')
    set({ loading: true, error: null });
    console.log('createVendor-2')
    try {
      console.log('createVendor-3')
      const res = await axiosInstance.post('/vendor/vendors', vendorData);
      console.log('createVendor-4')
      set((state) => ({
        vendors: [res.data.vendor, ...state.vendors],
        loading: false,
      }));
      console.log('createVendor-5')
      toast.success('Vendor created successfully!');
      return { success: true, message: res.data.message };
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to create vendor';
      console.error('Create Vendor Error:', err);
      toast.error(message);
      set({ error: message, loading: false });
      return { success: false, message };
    }
  },

  clearVendor: () => set({ vendor: null }),
  clearError: () => set({ error: null }),
}));

export default useVendorStore;
