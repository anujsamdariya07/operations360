import { create } from 'zustand';
import { axiosInstance } from '../axios';

export const useItemStore = create((set) => ({
  items: [],
  selectedItem: null,
  loading: false,

  fetchItems: async () => {
    try {
      set({ loading: true });
      const res = await axiosInstance.get('/item');
      set({ items: res.data.items, loading: false });
    } catch (err) {
      console.error('Fetch Items Error:', err);
      set({ loading: false });
    }
  },

  fetchItemById: async (id) => {
    try {
      const res = await axiosInstance.get(`/item/${id}`);
      set({ selectedItem: res.data.item });
    } catch (err) {
      console.error('Fetch Item Error:', err);
    }
  },

  createItem: async (itemData) => {
    try {
      const res = await axiosInstance.post('/item', itemData);
      set((state) => ({
        items: [...state.items, res.data.item],
      }));
    } catch (err) {
      console.error('Create Item Error:', err);
    }
  },

  updateItem: async (id, data) => {
    try {
      const res = await axiosInstance.put(`/item/${id}`, data);
      set((state) => ({
        items: state.items.map((item) =>
          item._id === id ? res.data.item : item
        ),
      }));
    } catch (err) {
      console.error('Update Item Error:', err);
    }
  },

  deleteItem: async (id) => {
    try {
      await axiosInstance.delete(`/item/${id}`);
      set((state) => ({
        items: state.items.filter((item) => item._id !== id),
      }));
    } catch (err) {
      console.error('Delete Item Error:', err);
    }
  },
}));
