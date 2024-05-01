import Card from "components/card";
import React, { useState,useEffect } from "react";
import DataService from "services/marketplace/data.service";

const StudentForm = ({ studentId,userData }) => {
  const [formData, setFormData] = useState({
    motherJob: "",
    fatherJob: "",
    activity: "",
    familySize: "",
    Pstatus: "",
    Medu: "",
    Fedu: "",
  });

  useEffect(() => {
    if (userData) {
      setFormData({
        motherJob: userData.motherJob || "",
        fatherJob: userData.fatherJob || "",
        activity: userData.activity || "",
        familySize: userData.familySize || "",
        Pstatus: userData.Pstatus || "",
        Medu: userData.Medu ? userData.Medu.toString() : "", 
        Fedu: userData.Fedu ? userData.Fedu.toString() : "", 
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(studentId)
      const token = localStorage.getItem("token");
      await DataService.updateStudentDetails(studentId, formData, token);
      console.log("Student details updated successfully");
    } catch (error) {
      console.error("Error updating student details:", error);
    }
  };

  return (
    <Card extra={"w-full p-4 h-full"}>
      <div className="flex w-full flex-wrap">
        <form onSubmit={handleSubmit} className="mx-auto mt-8 max-w-md">
          <div className="mb-4 flex">
            <div className="mr-2 w-1/2">
              <label htmlFor="motherJob" className="mb-1 block">
                Mother's Job:
              </label>
              <select
                name="motherJob"
                value={formData.motherJob}
                onChange={handleChange}
                className="block w-full rounded border border-gray-300 p-2"
              >
                <option value="">Select</option>
                <option value="teacher">Teacher</option>
                <option value="health">Health care related</option>
                <option value="services">Civil services</option>
                <option value="at_home">At home</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="ml-2 w-1/2">
              <label htmlFor="fatherJob" className="mb-1 block">
                Father's Job:
              </label>
              <select
                name="fatherJob"
                value={formData.fatherJob}
                onChange={handleChange}
                className="block w-full rounded border border-gray-300 p-2"
              >
                <option value="">Select</option>
                <option value="teacher">Teacher</option>
                <option value="health">Health care related</option>
                <option value="services">Civil services</option>
                <option value="at_home">At home</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          <div className="mb-4 flex">
            <div className="mr-2 w-1/2">
              <label htmlFor="activity" className="mb-1 block">
                Extra Activities:
              </label>
              <select
                name="activity"
                value={formData.activity}
                onChange={handleChange}
                className="block w-full rounded border border-gray-300 p-2"
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div className="ml-2 w-1/2">
              <label htmlFor="familySize" className="mb-1 block">
                Family Size:
              </label>
              <select
                name="familySize"
                value={formData.familySize}
                onChange={handleChange}
                className="block w-full rounded border border-gray-300 p-2"
              >
                <option value="">Select</option>
                <option value="LE3">Less or equal to 3</option>
                <option value="GT3">Greater than 3</option>
              </select>
            </div>
          </div>
          <div className="mb-4 flex">
            <div className="mr-2 w-1/2">
              <label htmlFor="Pstatus" className="mb-1 block">
                Parent's Cohabitation Status:
              </label>
              <select
                name="Pstatus"
                value={formData.Pstatus}
                onChange={handleChange}
                className="block w-full rounded border border-gray-300 p-2"
              >
                <option value="">Select</option>
                <option value="T">Living together</option>
                <option value="A">Apart</option>
              </select>
            </div>
            <div className="ml-2 w-1/2">
              <label htmlFor="Medu" className="mb-1 block">
                Mother's Education:
              </label>
              <select
                name="Medu"
                value={formData.Medu}
                onChange={handleChange}
                className="block w-full rounded border border-gray-300 p-2"
              >
                <option value="">Select</option>
                <option value="0">None</option>
                <option value="1">Primary Education (4th grade)</option>
                <option value="2">5th to 9th grade</option>
                <option value="3">Secondary Education</option>
                <option value="4">Higher Education</option>
              </select>
            </div>
          </div>
          <div className="mb-4 flex">
            <div className="mr-2 w-1/2">
              <label htmlFor="Fedu" className="mb-1 block">
                Father's Education:
              </label>
              <select
                name="Fedu"
                value={formData.Fedu}
                onChange={handleChange}
                className="block w-full rounded border border-gray-300 p-2"
              >
                <option value="">Select</option>
                <option value="0">None</option>
                <option value="1">Primary Education (4th grade)</option>
                <option value="2">5th to 9th grade</option>
                <option value="3">Secondary Education</option>
                <option value="4">Higher Education</option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600"
          >
            Save My Details
          </button>
        </form>
      </div>
    </Card>
  );
};

export default StudentForm;
