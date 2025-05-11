import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';

export const useBillStore = create((set) => ({
  generating: false,
  error: null,

  generateBill: async (order) => {
    try {
      set({ generating: true, error: null });
      
      const res = await axiosInstance.post(
        `/bills/generate`,
        order,
        { responseType: 'blob' } 
      );
      console.log('HERE')

      // Create a blob URL to download
      const blob = new Blob([res.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = `${order.id}_bill.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      set({ generating: false });
    } catch (err) {
      console.error('Generate Bill Error:', err);
      set({ generating: false, error: 'Failed to generate bill' });
    }
  },
}));
