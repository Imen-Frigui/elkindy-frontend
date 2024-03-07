import {create} from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create (persist((set) => ({
  token: null,
  isAuth: false,
  role: null, // Add a role state
  setToken: (token) => set({ token ,isAuth: true}),
  logout: () => set(() => ({ token: null, isAuth: false })),
}), {
  name: 'auth-storage', // unique name
  getStorage: () => localStorage, // define localStorage as the storage method
}


));

export default useAuthStore; 