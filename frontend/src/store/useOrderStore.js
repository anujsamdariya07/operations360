import { create } from 'zustand';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { axiosInstance } from '../lib/axios';

const useOrderStore = create((set, get) => ({
  orders: [],
  loading: false,

  fetchOrders: async () => {
    set({ loading: true });
    try {
      const { data } = await axiosInstance.get('/order/orders');
      set({ orders: data.orders || [], loading: false });
    } catch (error) {
      set({ loading: false });
      const message = error.response?.data?.message || 'Error fetching orders.';
      toast.error(message);
    }
  },

  getOrderById: async (id) => {
    try {
      const { data } = await axiosInstance.get(`/order/orders/${id}`);
      return data.order;
    } catch (error) {
      const message =
        error.response?.data?.message || 'Error fetching the order.';
      toast.error(message);
      return null;
    }
  },

  createOrder: async (orderData) => {
    console.log('createOrder-1');
    try {
      console.log('createOrder-2');
      const response = await axiosInstance.post('/order/orders', orderData);
      console.log('createOrder-3');
      toast.success('Order created successfully');
      console.log('createOrder-4');
      return response.data.order;
    } catch (error) {
      const message = error.response?.data?.message || 'Error creating order.';
      toast.error(message);
    }
  },

  updateOrder: async (id, orderData) => {
    try {
      const { data } = await axiosInstance.put(`/order/orders/${id}`, orderData);
      toast.success('Order updated successfully');
      return data.order;
    } catch (error) {
      const message = error.response?.data?.message || 'Error updating order.';
      toast.error(message);
    }
  },

  deleteOrder: async (id) => {
    try {
      const { data } = await axiosInstance.delete(`/order/orders/${id}`);
      toast.success('Order deleted successfully');
    } catch (error) {
      const message = error.response?.data?.message || 'Error deleting order.';
      toast.error(message);
    }
  },
}));

export default useOrderStore;
