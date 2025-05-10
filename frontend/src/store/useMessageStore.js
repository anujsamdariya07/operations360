import { create } from 'zustand';
import { axiosInstance } from '../axios';

export const useMessageStore = create((set) => ({
  messages: [],
  loading: false,

  fetchMessages: async () => {
    try {
      set({ loading: true });
      const res = await axiosInstance.get('/message');
      set({ messages: res.data, loading: false });
    } catch (err) {
      console.error('Fetch Messages Error:', err);
      set({ loading: false });
    }
  },

  fetchMessagesReceived: async (employeeId) => {
    try {
      set({ loading: true });
      const res = await axiosInstance.get(`/message/received/${employeeId}`);
      set({ messages: res.data.messages, loading: false });
    } catch (err) {
      console.error('Fetch Received Messages Error:', err);
      set({ loading: false });
    }
  },

  createMessage: async (messageData) => {
    try {
      const res = await axiosInstance.post('/message', messageData);
      set((state) => ({
        messages: [...state.messages, res.data.message],
      }));
    } catch (err) {
      console.error('Create Message Error:', err);
    }
  },
}));
