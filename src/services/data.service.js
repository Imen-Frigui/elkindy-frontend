import { apiRoutes } from "../config/api";
import apiHeader from "../utils/apiHeader";

export default class DataService {
  static async getPublicContent(status = "", sort = "", search = "", page) {
    if (search.length) {
      return apiRoutes.get(
        `/instruments/search/?status=${status}&sort=${sort}&query=${search}&pageNumber=${page}`
      );
    }
    return apiRoutes.get(
      `/instruments/?status=${status}&sort=${sort}&query=${search}&pageNumber=${page}`
    );
  }

  static async getInstrument(id) {
    console.log("printing values");
    return apiRoutes.get(`/instruments/${id}`);
  }

  static async addInstrument(instrumentData) {
    const { author, title, type, details, price, status, brand, condition } =
      instrumentData;
    console.log(instrumentData);
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
      }
      // apiHeader(accessToken)
    );
  }

  static async likePost(id) {
    return apiRoutes.patch(`/instruments/${id}/like`);
  }
}
