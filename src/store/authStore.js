/*import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(persist((set) => ({
  isAuth: false,
  role: null,
  token: null,
  setAuth: (isAuthenticated, userRole) => set({ isAuth: isAuthenticated, role: userRole }),

  logout: () => set({ isAuth: false, role: null ,token:null}), // Add a logout method to reset the auth state
}), {
  name: 'auth-storage',
  getStorage: () => sessionStorage, // Using sessionStorage for persistence
}));

export default useAuthStore;*/
