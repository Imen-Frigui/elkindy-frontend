import { apiRoutes } from "../config/api";
import apiHeader from "../utils/apiHeader";

export default class DataService {
  static async getPublicContent(status = "", sort = "") {
    console.log("service", sort);
    return apiRoutes.get(`/instruments/?status=${status}&sort=${sort}`);
  }
  static async getInstrument(id, cancelToken, accessToken) {
    return apiRoutes.get(`/instrument/${id}`, {
      cancelToken,
      ...apiHeader(accessToken),
    });
  }
  static async addInstrument(instrumentData, accessToken) {
    const { author, title, type, brand, details, condition, status } =
      instrumentData;

    return apiRoutes.post(
      "/instruments",
      {
        author,
        title,
        type,
        brand,
        details,
        condition,
        status,
      },
      apiHeader(accessToken)
    );
  }

  static async likePost(id) {
    return apiRoutes.patch(`/instruments/${id}/like`);
  }
}
