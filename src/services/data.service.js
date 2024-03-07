import { apiRoutes } from "../config/api";
import apiHeader from "../utils/apiHeader";

export default class DataService {
  static async getPublicContent(status = "", sort = "", search = "") {
    console.log("executing service");
    console.log(search);
    if (search.length) {
      return apiRoutes.get(
        `/instruments/search/?status=${status}&sort=${sort}&query=${search}`
      );
    }
    return apiRoutes.get(
      `/instruments/?status=${status}&sort=${sort}&query=${search}`
    );
  }
  static async getInstrument(id) {
    console.log("printing values");
    return apiRoutes.get(`/instruments/${id}`);
  }
  static async addInstrument(instrumentData, status) {
    const { author, title, type, brand, details, condition } = instrumentData;

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
      }
      // apiHeader(accessToken)
    );
  }

  static async likePost(id) {
    return apiRoutes.patch(`/instruments/${id}/like`);
  }
}
