import { create } from "zustand";
import ChatService from "../services/marketplace/chat.service";

const useChatStore = create((set) => ({
  conversations: [],
  messages: [],
  loadingConversations: false,
  loadingMessages: false,
  users: [],
  sendMessage: async (accessToken, messageData) => {
    try {
      console.log(messageData);
      await ChatService.sendMessage(accessToken, messageData);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  },
  getConversations: async (accessToken) => {
    try {
      set({ loadingConversations: true });
      const response = await ChatService.getConversations(accessToken);
      set({ conversations: response.data });
      set({ loadingConversations: false });
    } catch (error) {
      console.error("Error getting conversations:", error);
    }
  },
  getMessagesWithUser: async (accessToken, otherUserId) => {
    try {
      set({ loadingMessages: true });
      const response = await ChatService.getMessagesWithUser(
        accessToken,
        otherUserId
      );
      set({ messages: response.data });
      set({ loadingMessages: false });
      return response.data;
    } catch (error) {
      console.error("Error getting messages:", error);
    }
  },
  getUsers: async (accessToken) => {
    try {
      set({ loadingMessages: true });
      const response = await ChatService.getUsersList(accessToken);
      set({ users: response.data });
      set({ loadingMessages: false });
      return response.data;
    } catch (error) {
      console.error("Error getting messages:", error);
    }
  },
}));

export default useChatStore;
