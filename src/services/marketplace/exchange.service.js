import { apiRoutes } from "../../config/api";
import apiHeader from "../../utils/apiHeader";
import axios from "axios";

export default class ExchangeService {
  static async createExchange(exchangeData, accessToken) {
    return apiRoutes
      .post("/exchanges/create", exchangeData, apiHeader(accessToken))
      .catch((error) => {
        if (error.response && error.response.status === 409) {
          throw new Error("Exchange already exists");
        } else {
          throw new Error("Error creating exchange: " + error.message);
        }
      });
  }
  static async fetchReceivedExchanges(accessToken) {
    try {
      const response = await apiRoutes.get(
        "/exchanges/received",
        apiHeader(accessToken)
      );
      return response.data.exchangesReceived;
    } catch (error) {
      throw new Error("Error fetching received exchanges: " + error.message);
    }
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
}
