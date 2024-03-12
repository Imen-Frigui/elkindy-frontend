import zustand, { create } from "zustand";
import DataService from "../services/data.service";

const useInstrumentStore = create((set) => ({
  instruments: [],
  instrument: {},
  loading: false,
  fetchInstruments: async (status, sort) => {
    try {
      set({ loading: true });
      const { data } = await DataService.getPublicContent(status, sort);
      console.log(data)
      set({ instruments: data.instruments });
      set({ loading: false });
    } catch (error) {
      console.error(error);
      set({ loading: false });
    }
  },
  postInstrument: async (postData) => {
    try {
      set({ loading: true });
      const { data } = await DataService.addInstrument(postData);
      console.log(data)
      set({ loading: false });
      return data;
    } catch (error) {
      set({ loading: false });
    }
  },
  getInstrument: async (id) => {
    try {
      set({ loading: true });
      const { data } = await DataService.getInstrument(id);
      console.log(data);
      set({ instrument: data.instrument });
      set({ loading: false });
    } catch (error) {
      console.error(error);
      set({ loading: false });
    }
  },

  likePost: async (id) => {
    try {
      // set({ loading: true });
      const { response } = await DataService.likePost(id);
      // set({ loading: false });
    } catch (error) {
      console.error(error);
      // set({ loading: false });
    }
  },
  searchInstruments: async (status, sort, searchQuery) => {
    try {
      set({ loading: true });
      const { data } = await DataService.getPublicContent(
        status,
        sort,
        searchQuery
      );
      set({ instruments: data.instruments });
      set({ loading: false });
    } catch (error) {
      console.error(error);
      set({ loading: false });
    }
  },
}));
export default useInstrumentStore;
