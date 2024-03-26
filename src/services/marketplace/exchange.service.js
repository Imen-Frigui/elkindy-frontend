import { apiRoutes } from "../../config/api";
import apiHeader from "../../utils/apiHeader";

export default class ExchangeService {
  static async createExchange(exchangeData, accessToken) {
    return apiRoutes
      .post("/exchanges/create", exchangeData, apiHeader(accessToken))
      .catch((error) => {
        if (error.response && error.response.status === 409) {
          throw new Error("This exchange request has already been sent");
        } else {
          throw new Error("Error creating exchange: " + error.message);
        }
      });
  }
  static async fetchReceivedExchanges(accessToken, itemId) {
    return await apiRoutes
      .get(`/exchanges/received/${itemId}`, apiHeader(accessToken))
      .catch((error) => {
        throw new Error("Error fetching trades: " + error.message);
      });
  }
  static async fetchSentExchanges(accessToken) {
    try {
      const response = await apiRoutes.get(
        "/exchanges/sent",
        apiHeader(accessToken)
      );
      return response.data.exchangesSent;
    } catch (error) {
      throw new Error("Error fetching sent exchanges: " + error.message);
    }
  }

  static async fetchLatestTrades(accessToken) {
    return await apiRoutes
      .get(`/exchanges/recent`, apiHeader(accessToken))
      .catch((error) => {
        throw new Error("Error fetching trades: " + error.message);
      });
  }

  static async updateTradeStatus(accessToken, exchangeId, newStatus) {
    const requestBody = { status: newStatus };
    return await apiRoutes
      .put(`/exchanges/${exchangeId}`, requestBody, apiHeader(accessToken))
      .catch((error) => {
        throw new Error("Error fetching trades: " + error.message);
      });
  }
}
