import zustand, { create } from "zustand";
import DataService from "../services/data.service";

const useInstrumentStore = create((set) => ({
  instruments: [],
  instrument: {},
  loading: false,
  hasMorePages: true,
  setHasMorePages: (hasMore) => set({ hasMorePages: hasMore }),
  fetchInstruments: async (status, sort, page) => {
    try {
      set({ loading: true });
      console.log(sort);
      console.log(status);
      if (sort !== "" || status !== "") {
        console.log("ture");
        page = 1;
        set({ instruments: [] });
        const { data } = await DataService.getPublicContent(
          status,
          sort,
          "",
          page
        );
        if (data.instruments.length === 0) {
          set({ hasMorePages: false });
        }
        set((state) => ({
          instruments: [...data.instruments],
        }));
        set({ loading: false });

        return;
      }
      console.log("no");

      const { data } = await DataService.getPublicContent(
        status,
        sort,
        "",
        page
      );
      if (data.instruments.length === 0) {
        set({ hasMorePages: false });
      }
      set((state) => ({
        instruments: [...state.instruments, ...data.instruments],
      }));
      set({ loading: false });
      return;
    } catch (error) {
      set({ loading: false });
    }
  },
  postInstrument: async (postData) => {
    try {
      set({ loading: true });
      const { data } = await DataService.addInstrument(postData);
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
      if (data.instruments.length === 0) {
        set({ hasMorePages: false });
      }
      set({ instruments: data.instruments });
      set({ loading: false });
    } catch (error) {
      console.error(error);
      set({ loading: false });
    }
  },
}));
export default useInstrumentStore;
