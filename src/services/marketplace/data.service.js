import { apiRoutes } from "../../config/api";
import apiHeader from "../../utils/apiHeader";

export default class DataService {
  static async getPublicContent(
    accessToken,
    status = "",
    sort = "",
    search = "",
    page
  ) {
    if (search.length) {
      return apiRoutes.get(
        `/instruments/search/?status=${status}&sort=${sort}&query=${search}`,
        apiHeader(accessToken)
      );
    }
    return apiRoutes.get(
      `/instruments/?status=${status}&sort=${sort}`,
      apiHeader(accessToken)
    );
  }

  static async getUserInstruments(accessToken) {
    return apiRoutes.get(
      `/instruments/user/instruments`,
      apiHeader(accessToken)
    );
  }

  static async getInstrument(id) {
    return apiRoutes.get(`/instruments/${id}`);
  }

  static async addInstrument(instrumentData, accessToken) {
    const { author, title, type, details, price, status, brand, condition } =
      instrumentData;
    return apiRoutes.post(
      "/instruments",
      {
        author,
        title,
        type,
        brand,
        details,
        price,
        condition,
        status,
      },
      apiHeader(accessToken)
    );
  }

  static async likePost(id, accessToken) {
    return apiRoutes.patch(
      `/instruments/${id}/like`,
      {},
      apiHeader(accessToken)
    );
  }
  static async deleteInstrument(instrumentId, accessToken) {
    return apiRoutes.delete(
      `/instruments/${instrumentId}`,
      apiHeader(accessToken)
    );
  }
}
