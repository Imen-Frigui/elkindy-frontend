import { apiRoutes } from "../../config/api";
import apiHeader from "../../utils/apiHeader";

export default class DataService {
  static async getPublicContent(
    accessToken,
    status = "",
    age = "",
    sort = "",
    search = "",
    page
  ) {
    if (search.length) {
      return apiRoutes.get(
        `/instruments/search/?status=${status}&sort=${sort}&age=${age}&query=${search}`,
        apiHeader(accessToken)
      );
    }
    return apiRoutes.get(
      `/instruments/?status=${status}&sort=${sort}&age=${age}`,
      apiHeader(accessToken)
    );
  }

  static async getUserInstruments(accessToken) {
    return apiRoutes.get(
      `/instruments/user/instruments`,
      apiHeader(accessToken)
    );
  }

  static async getInstrument(id, accessToken) {
    return apiRoutes.get(`/instruments/${id}`, apiHeader(accessToken));
  }

  static async addInstrument(instrumentData, accessToken) {
    const {
      author,
      title,
      type,
      details,
      price,
      status,
      brand,
      condition,
      img,
      age,
    } = instrumentData;
    console.log(console.log(age));
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
        img,
        age,
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

  static async addUserSearch(searchData, accessToken) {
    const { status, age, searchQuery } = searchData;
    return apiRoutes.post(
      "/instruments/addusersearch",
      { status, age, searchQuery },
      apiHeader(accessToken)
    );
  }
  static async getUserSearches(accessToken) {
    return apiRoutes.get(
      "/instruments/user/usersearches",
      apiHeader(accessToken)
    );
  }
  static async deleteUserSearch(searchId, accessToken) {
    try {
      const response = await apiRoutes.delete(
        `/instruments/user/usersearches/${searchId}`,
        apiHeader(accessToken)
      );
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  static async updateStudentDetails(studentId, formData, accessToken) {
    try {
      const response = await apiRoutes.put(
        `/instruments/students/${studentId}`,
        formData,
        apiHeader(accessToken)
      );
      return response.data;
    } catch (error) {
      console.error("Error updating student:", error);
      return null;
    }
  }
  static async predictIStudentOutcome(studentId, accessToken) {
    try {
      const response = await apiRoutes.post(
        `/instruments/predict/${studentId}`,
        {},
        apiHeader(accessToken)
      );
      return response.data;
    } catch (error) {
      console.error("Error predicting instrument outcome:", error);
      return null;
    }
  }
}
