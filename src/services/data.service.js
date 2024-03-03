import { apiRoutes } from "../config/api";
import apiHeader from "../utils/apiHeader";

export default class DataService {
  static async getPublicContent(status = "", sort = "") {
    return apiRoutes.get(`/instruments/?status=${status}&sort=${sort}`);
  }
  static async getInstrument(id) {
    console.log("printing values");
    return apiRoutes.get(`/instruments/${id}`);
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
