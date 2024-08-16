import { create } from "zustand";
import DataService from "../services/marketplace/data.service";

const useInstrumentStore = create((set) => ({
  instruments: [],
  instrument: null,
  loading: false,
  hasMorePages: true,
  setHasMorePages: (hasMore) => set({ hasMorePages: hasMore }),
  fetchInstruments: async (status, age, sort, page, accessToken) => {
    try {
      set({ loading: true });
      const { data } = await DataService.getPublicContent(
        accessToken,
        status,
        age,
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
      const { data } = await DataService.getInstrument(id, accessToken);
      set({ instrument: data.instrument });
      set({ loading: false });
    } catch (error) {
      set({ loading: false });
    }
  },

  likePost: async (id, accessToken) => {
    try {
      // set({ loading: true });
      const response = await DataService.likePost(id, accessToken);
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
  searchInstruments: async (
    status,
    age,
    sort,
    searchQuery,
    page,
    accessToken
  ) => {
    try {
      set({ loading: true });
      const { data } = await DataService.getPublicContent(
        accessToken,
        age,
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
  addUserSearch: async (searchData, accessToken) => {
    try {
      set({ loading: true });
      const { data } = await DataService.addUserSearch(searchData, accessToken);
      set({ loading: false });
      return data;
    } catch (error) {
      set({ loading: false });
    }
  },
  getUserSearches: async (accessToken) => {
    try {
      const { data } = await DataService.getUserSearches(accessToken);
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  deleteUserSearch: async (searchId, accessToken) => {
    try {
      set({ loading: true });
      const data  = await DataService.deleteUserSearch(
        searchId,
        accessToken
      );
      console.log(data)
      set({ loading: false });
      return data;
    } catch (error) {
      set({ loading: false });
    }
  },
}));
export default useInstrumentStore;
