import { apiRoutes } from "../../config/api";
import apiHeader from "../../utils/apiHeader";

export default class ChatService {
  static async getConversations(accessToken) {
    return apiRoutes.get(`/chat/conversations`, apiHeader(accessToken));
  }
  static async getMessagesWithUser(accessToken, otherUserId) {
    return apiRoutes.get(`/chat/${otherUserId}`, apiHeader(accessToken));
  }
  static async sendMessage(accessToken, messageData) {
    return apiRoutes.post(`/chat`, messageData, apiHeader(accessToken));
  }
}
