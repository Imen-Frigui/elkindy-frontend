import { create } from "zustand";
import ExchangeService from "../services/marketplace/exchange.service";
const useExchangeStore = create((set) => ({
  exchangesReceived: [],
  exchangesSent: [],
  recentTrades: [],
  loading: false,
  error: null,

  setExchangesReceived: (exchangesReceived) => set({ exchangesReceived }),
  setExchangesSent: (exchangesSent) => set({ exchangesSent }),
  setRecentTrades: (recentTrades) => set({ recentTrades }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  updateTradeStatus: async (
    accessToken,
    exchangeId,
    newStatus,
    reason,
    rating
  ) => {
    try {
      set({ loading: true });
      const response = await ExchangeService.updateTradeStatus(
        accessToken,
        exchangeId,
        newStatus,
        reason,
        rating
      );
      set({ loading: false });
      return response;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  fetchReceivedExchangesByItem: async (accessToken, itemId) => {
    try {
      set({ loading: true });
      const { data } = await ExchangeService.fetchReceivedExchanges(
        accessToken,
        itemId
      );
      set({ exchangesReceived: data.receivedExchanges, loading: false });
    } catch (error) {
      console.log(error);
      set({ error: error.message, loading: false });
    }
  },

  fetchSentExchanges: async (accessToken) => {
    try {
      set({ loading: true });
      const response = await ExchangeService.fetchSentExchanges(accessToken);
      set({ exchangesSent: response, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  createExchange: async (exchangeData, accessToken) => {
    try {
      set({ loading: true });
      const response = await ExchangeService.createExchange(
        exchangeData,
        accessToken
      );
      set((state) => ({
        exchangesSent: [...state.exchangesSent, response.data.exchange],
        loading: false,
        error: null,
      }));
      return response;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },
  fetchLatestTrades: async (accessToken) => {
    try {
      set({ loading: true });
      const response = await ExchangeService.fetchLatestTrades(accessToken);
      set({ recentTrades: response.data.recentTrades, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default useExchangeStore;
