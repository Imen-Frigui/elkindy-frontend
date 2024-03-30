import { create } from "zustand";
import DataService from "../services/marketplace/data.service";

const useInstrumentStore = create((set) => ({
  instruments: [],
  instrument: {},
  loading: false,
  hasMorePages: true,
  setHasMorePages: (hasMore) => set({ hasMorePages: hasMore }),
  fetchInstruments: async (status, sort, page, accessToken) => {
    try {
      set({ loading: true });
      const { data } = await DataService.getPublicContent(
        accessToken,
        status,
        sort,
        "",
        page
      );
      set({ instruments: data.instruments });
      set({ loading: false });
    } catch (error) {
      set({ loading: false });
    }
  },
  postInstrument: async (postData, accessToken) => {
    try {
      set({ loading: true });
      const { data } = await DataService.addInstrument(postData, accessToken);
      set({ loading: false });
      return data;
    } catch (error) {
      set({ loading: false });
    }
  },
  getInstrument: async (id, accessToken) => {
    try {
      set({ loading: true });
      const { data } = await DataService.getInstrument(id,accessToken);
      set({ instrument: data.instrument });
      set({ loading: false });
    } catch (error) {
      set({ loading: false });
    }
  },

  likePost: async (id, accessToken) => {
    try {
      // set({ loading: true });
      const  response  = await DataService.likePost(id, accessToken);
      return response.data;
      // set({ loading: false });
    } catch (error) {
      console.error(error);
      // set({ loading: false });
    }
  },
  fetchUserInstruments: async (accessToken) => {
    try {
      set({ loading: true });
      const { data } = await DataService.getUserInstruments(accessToken);
      set({ instruments: data.instruments });
      set({ loading: false });
    } catch (error) {
      set({ loading: false });
    }
  },
  searchInstruments: async (status, sort, searchQuery, page, accessToken) => {
    try {
      set({ loading: true });
      const { data } = await DataService.getPublicContent(
        accessToken,
        status,
        sort,
        searchQuery
      );
      if (data.instruments.length === 0) {
        set({ hasMorePages: false });
      }
      set({ instruments: data.instruments });
      set({ loading: false });
    } catch (error) {
      set({ loading: false });
    }
  },
  deleteInstrument: async (instrumentId) => {
    try {
      set({ loading: true });
      const { data } = await DataService.deleteInstrument(instrumentId);
      set({ loading: false });
      return data;
    } catch (error) {
      set({ loading: false });
    }
  },
}));
export default useInstrumentStore;
