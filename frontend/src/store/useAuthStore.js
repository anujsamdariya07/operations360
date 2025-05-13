import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';

const useAuthStore = create((set) => ({
  token: null,
  employee: null,
  organization: null,
  isAuthenticated: false,
  mustChangePassword: false,
  loading: false,
  error: null,
  authUser: null,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      console.log('checkAuth-1');
      const res = await axiosInstance.get('/auth/check');
      console.log('checkAuth-2');
      set({ authUser: res.data });
    } catch (error) {
      console.log('Error in checkAuth', error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signIn: async (username, password) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.post('/auth/sign-in', {
        username,
        password,
      });

      const { token, employee, organization, message } = response.data;

      set({
        token,
        employee,
        organization,
        isAuthenticated: true,
        mustChangePassword: false,
        loading: false,
      });

      localStorage.setItem('auth_token', token);

      toast.success('Logged In Successfully!');
      return { success: true };
    } catch (error) {
      const res = error.response;

      if (res?.data?.redirectToChangePassword) {
        set({
          mustChangePassword: true,
          employee: { id: res.data.employeeId, username },
          isAuthenticated: false,
          loading: false,
        });

        return {
          success: false,
          requiresPasswordChange: true,
        };
      }

      set({
        loading: false,
        error: res?.data?.message || 'Login failed',
      });

      toast.error('Error registering organization!');

      return { success: false, error: res?.data?.message };
    }
  },

  signUp: async (orgData) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.post('/auth/sign-up', orgData);
      set({
        loading: false,
        authUser: response.data.employee,
        organization: response.data.organization,
      });

      toast.success('Organization registered successfully!');

      return { success: true, message: response.data.message };
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || 'Organization signup failed.',
      });

      toast.error('Error registering organization!', error);

      return { success: false, error: error.response?.data?.message };
    }
  },

  logout: async () => {
    try {
      console.log('logout')
      await axiosInstance.post('/auth/logout');
      set({
        token: null,
        employee: null,
        organization: null,
        isAuthenticated: false,
        mustChangePassword: false,
        error: null,
        authUser: null,
      });
      toast.success('Logged out successfully!');
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Error logging out!');
      console.log('ERROR: ', error);
    }
  },

  setPasswordChanged: () => {
    set({
      mustChangePassword: false,
      isAuthenticated: true,
    });
  },

  setEmployeeData: (employee) => set({ employee }),

  setOrganizationData: (organization) => set({ organization }),
}));

export default useAuthStore;
