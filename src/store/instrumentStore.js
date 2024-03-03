import zustand, { create } from "zustand";
import DataService from "../services/data.service";

const useInstrumentStore = create((set) => ({
  instruments: [],
  instrument: null,
  loading: false,
  fetchInstruments: async (status, sort) => {
    try {
      set({ loading: true });
      const { data } = await DataService.getPublicContent(status, sort);
      set({ instruments: data.instruments });
      set({ loading: false });
    } catch (error) {
      console.error(error);
      set({ loading: false });
    }
  },
  postInstrument: async (data) => {
    try {
      set({ loading: true });
      const { response } = await DataService.addInstrument(data);
      set({ loading: false });
    } catch (error) {
      console.error(error);
      set({ loading: false });
    }
  },
  getInstrument: async (id) => {
    try {
      set({ loading: true });
      const { data } = await DataService.getInstrument(id);
      console.log("data");
      set({ instrument: data.instrument });
      set({ loading: false });
    } catch (error) {
      console.error(error);
      set({ loading: false });
    }
  },

  likePost: async (id) => {
    try {
      set({ loading: true });
      const { response } = await DataService.likePost(id);
      set({ loading: false });
    } catch (error) {
      console.error(error);
      set({ loading: false });
    }
  },
}));
export default useInstrumentStore;
