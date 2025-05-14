import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';

const useItemStore = create((set) => ({
  items: [],
  selectedItem: null,
  loading: false,

  fetchItems: async () => {
    try {
      set({ loading: true });
      const res = await axiosInstance.get('/item/items');
      set({ items: res.data.items, loading: false });
    } catch (err) {
      console.error('Fetch Items Error:', err);
      set({ loading: false });
    }
  },

  fetchItemById: async (id) => {
    try {
      const res = await axiosInstance.get(`/item/items/${id}`);
      set({ selectedItem: res.data.item });
    } catch (err) {
      console.error('Fetch Item Error:', err);
    }
  },

  createItem: async (itemData) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.post('/item/items', itemData);
      set((state) => ({
        items: [...state.items, res.data.item],
      }));
      toast.success('Item added successfully!');
      console.log('createItem');
    } catch (err) {
      toast.error('Error adding item!');
      console.error('Create Item Error:', err);
    }
    set({ loading: false });
  },

  updateItem: async (id, data) => {
    try {
      console.log('updateItem-1');
      const res = await axiosInstance.put(`/item/items/${id}`, data);
      console.log('updateItem-2');
      set((state) => ({
        items: state.items.map((item) =>
          item._id === id ? res.data.item : item
        ),
      }));
      toast.success('Item Updated Successfully!');
    } catch (err) {
      toast.error(err.message);
      console.error('Update Item Error:', err);
    }
  },

  deleteItem: async (id) => {
    set({ loading: true });
    try {
      await axiosInstance.delete(`/item/items/${id}`);
      set((state) => ({
        items: state.items.filter((item) => item._id !== id),
      }));
      toast.success('Item Deleted Successfully!');
    } catch (err) {
      console.error('Delete Item Error:', err);
      toast.error(err?.message);
    }
    set({ loading: false });
  },
}));

export default useItemStore;
