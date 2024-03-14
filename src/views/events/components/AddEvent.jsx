import React, { useState } from "react";
import { addEvent } from "../../../services/event/eventService";
import ButtonComponent from "../../../components/button/ButtonComponnent";
// import SuccessAlert from "../../../components/alert/AlertComponent";

const AddEvent = ({ onEventAdded }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [capacity, setCapacity] = useState("");
  const [eventType, setEventType] = useState("Other");
  const [eventTypeInput, setEventTypeInput] = useState("");
  const [eventStatus, setEventStatus] = useState("Scheduled");
  const [titleError, setTitleError] = useState("");
  const [locationError, setLocationError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [capacityError, setCapacityError] = useState("");
  const [startDateError, setStartDateError] = useState("");
  const [endDateError, setEndDateError] = useState("");
  const [formValid, setFormValid] = useState(false);
  const [startTimeError, setStartTimeError] = useState("");
  const [endTimeError, setEndTimeError] = useState("");
  // const [successMessage, setSuccessMessage] = useState("");

  const handleDrawerClose = () => setIsDrawerOpen(false);

  const handleAddEvent = async (event) => {
    event.preventDefault();
    // Form validation
    if (
      !eventName ||
      !eventLocation ||
      !eventDescription ||
      !startDate ||
      !endDate ||
      !startTime ||
      !endTime
    ) {
      setTitleError(eventName ? "" : "Title is required");
      setLocationError(eventLocation ? "" : "Location is required");
      setDescriptionError(eventDescription ? "" : "Description is required");
      setStartDateError(startDate ? "" : "Start date is required");
      setEndDateError(endDate ? "" : "End date is required");
      return;
    }
    const eventData = {
      title: eventName,
      location: eventLocation,
      description: eventDescription,
      startDate,
      endDate,
      startTime,
      endTime,
      capacity,
      eventType: eventType === "Other" ? eventTypeInput : eventType,
      status: eventStatus,
    };

    try {
      await addEvent(eventData);
      onEventAdded();
      // setSuccessMessage("Event added successfully!");
      handleDrawerClose();
      // Reset form fields
      // setEventName("");
      // setEventDescription("");
      // setEventLocation("");
      // setStartDate("");
      // setEndDate("");
      // setStartTime("");
      // setEndTime("");
      // setCapacity("");
      // setEventType("Other");
      // setEventStatus("Scheduled");
      resetForm();
    } catch (error) {
      alert("Failed to add event");
      console.error(error);
    }
  };

  // const handleAlertClose = () => {
  //   setSuccessMessage("");
  // };

  const resetForm = () => {
    setEventName("");
    setEventDescription("");
    setEventLocation("");
    setStartDate("");
    setEndDate("");
    setStartTime("");
    setEndTime("");
    setCapacity("");
    setEventType("Other");
    setEventStatus("Scheduled");
    setFormValid(false);
    setTitleError("");
  };

  const validateTitle = () => {
    if (!eventName) {
      setTitleError("Title is required");
      setFormValid(false);
    } else if (eventName.length > 20) {
      setTitleError("Title cannot exceed 20 characters");
      setFormValid(false);
    } else {
      setTitleError("");
      setFormValid(true);
    }
  };
  const validateLocation = () => {
    const locationRegex = /^[a-zA-Z0-9\s]+$/;
    if (!eventLocation) {
      setLocationError("Location is required");
      setFormValid(false);
    } else if (eventLocation.length > 50) {
      setLocationError("Location cannot exceed 50 characters");
      setFormValid(false);
    } else if (!locationRegex.test(eventLocation)) {
      setLocationError(
        "Location can only contain letters, numbers, and spaces"
      );
      setFormValid(false);
    } else {
      setLocationError("");
      setFormValid(true);
    }
  };
  const validateDescription = () => {
    if (!eventDescription) {
      setDescriptionError("Description is required");
      setFormValid(false);
    } else if (eventDescription.length > 200) {
      setDescriptionError("Description cannot exceed 200 characters");
      setFormValid(false);
    } else {
      setDescriptionError("");
      setFormValid(true);
    }
  };
  const validateCapacity = () => {
    const capacityRegex = /^[0-9]+$/;
    if (!capacity) {
      setCapacityError("Capacity is required");
      setFormValid(false);
    } else if (!capacityRegex.test(capacity)) {
      setCapacityError("Capacity can only contain numbers");
      setFormValid(false);
    } else {
      setCapacityError("");
      setFormValid(true);
    }
  };
  const validateStartDate = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset hours to start of the day
    const selectedStartDate = new Date(startDate);
    selectedStartDate.setHours(0, 0, 0, 0);
  
    if (selectedStartDate < today) {
      setStartDateError("Start date must be today or in the future");
      setFormValid(false);
    } else {
      setStartDateError("");
      setFormValid(true);
    }
  };

  const validateEndDate = () => {
    const selectedStartDate = new Date(startDate);
    selectedStartDate.setHours(0, 0, 0, 0);
    const selectedEndDate = new Date(endDate);
    selectedEndDate.setHours(0, 0, 0, 0);
  
    if (selectedEndDate < selectedStartDate) {
      setEndDateError("End date cannot be before start date");
      setFormValid(false);
    } else {
      setEndDateError("");
      setFormValid(true);
    }
  };
  const validateStartTime = () => {
    if (!startTime) {
      setStartTimeError("Start time is required");
      setFormValid(false);
    } else {
      setStartTimeError("");
      setFormValid(true);
    }
  };

  const validateEndTime = () => {
    if (!endTime) {
      setEndTimeError("End time is required");
      setFormValid(false);
    } else if (endTime <= startTime) {
      setEndTimeError("End time must be after start time");
      setFormValid(false);
    } else {
      setEndTimeError("");
      setFormValid(true);
    }
  };
  return (
    <>
      <ButtonComponent
        className="mb-3"
        text="Add Event"
        color="#006BBE"
        onClick={() => setIsDrawerOpen(true)}
      >
        Add Event
      </ButtonComponent>
      {/* {successMessage && (
        <SuccessAlert message={successMessage} onClose={handleAlertClose} />
      )} */}
      {isDrawerOpen && (
        <div
          id="drawer-create-event"
          className="fixed top-0 right-0 z-40 h-screen w-full max-w-xs transform-none overflow-y-auto bg-white p-4 transition-transform dark:bg-gray-800"
        >
          <h5
            id="drawer-label"
            className="mb-6 inline-flex items-center text-sm font-semibold uppercase text-gray-500 dark:text-gray-400"
          >
            New Event
          </h5>
          <button
            onClick={handleDrawerClose}
            className="bg-transparent absolute top-2.5 right-2.5 inline-flex items-center rounded-lg p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <span>Close</span>
          </button>
          <form onSubmit={handleAddEvent}>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Event Title
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your Event title"
                  value={eventName}
                  onChange={(e) => {
                    setEventName(e.target.value);
                    validateTitle();
                  }}
                  className={`focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 ${
                    titleError ? "border-red-500" : ""
                  }`}
                  required
                />
                {titleError && (
                  <p className="text-sm text-red-500">{titleError}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="event-type"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Event Type
                </label>
                <select
                  id="event-type"
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  className="focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                  required
                >
                  <option value="Charity Concert">Charity Concert</option>
                  <option value="Final Year Party">Final Year Party</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  rows="4"
                  placeholder="write your description here ..."
                  value={eventDescription}
                  onChange={(e) => {
                    setEventDescription(e.target.value);
                    validateDescription();
                  }}
                  className={`focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 ${
                    descriptionError ? "border-red-500" : ""
                  }`}
                  required
                ></textarea>
                {descriptionError && (
                  <p className="text-sm text-red-500">{descriptionError}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="status"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Status
                </label>
                <select
                  id="status"
                  value={eventStatus}
                  onChange={(e) => setEventStatus(e.target.value)}
                  className="focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                  required
                >
                  <option value="Scheduled">Scheduled</option>
                  <option value="Active">Active</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Postponed">Postponed</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="location"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  placeholder="Enter your location"
                  value={eventLocation}
                  onChange={(e) => {
                    setEventLocation(e.target.value);
                    validateLocation();
                  }}
                  className={`focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 ${
                    locationError ? "border-red-500" : ""
                  }`}
                  required
                />
                {locationError && (
                  <p className="text-sm text-red-500">{locationError}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="startDate"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Start Date
                </label>
                <input
                  type="date"
                  id="startDate"
                  value={startDate}
                  onChange={(e) => {
                    setStartDate(e.target.value);
                    validateStartDate();
                  }}
                  className={`focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 ${
                    startDateError ? "border-red-500" : ""
                  }`}
                  required
                />
                {startDateError && (
                  <p className="text-sm text-red-500">{startDateError}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="endDate"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  End Date
                </label>
                <input
                  type="date"
                  id="endDate"
                  value={endDate}
                  onChange={(e) => {
                    setEndDate(e.target.value);
                    validateEndDate();
                  }}
                  className={`focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 ${
                    endDateError ? "border-red-500" : ""
                  }`}
                  required
                />
                {endDateError && (
                  <p className="text-sm text-red-500">{endDateError}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="startTime"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Start Time
                </label>
                <input
                  type="time"
                  id="startTime"
                  value={startTime}
                  onChange={(e) => {
                    setStartTime(e.target.value);
                    validateStartTime();
                  }}
                  className={`focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 ${
                    startTimeError ? "border-red-500" : ""
                  }`}
                  required
                />
                {startTimeError && (
                  <p className="text-sm text-red-500">{startTimeError}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="endTime"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  End Time
                </label>
                <input
                  type="time"
                  id="endTime"
                  value={endTime}
                  onChange={(e) => {
                    setEndTime(e.target.value);
                    validateEndTime();
                  }}
                  className={`focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 ${
                    endTimeError ? "border-red-500" : ""
                  }`}
                  required
                />
                {endTimeError && (
                  <p className="text-sm text-red-500">{endTimeError}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="capacity"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Capacity
                </label>
                <input
                  type="number"
                  id="capacity"
                  placeholder="capacity"
                  value={capacity}
                  onChange={(e) => {
                    setCapacity(e.target.value);
                    validateCapacity();
                  }}
                  className={`focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 ${
                    capacityError ? "border-red-500" : ""
                  }`}
                  required
                />
                {capacityError && (
                  <p className="text-sm text-red-500">{capacityError}</p>
                )}
              </div>

              <div className="flex justify-center space-x-4">
                <button
                  type="submit"
                  className="focus:ring-primary-300 inline-flex items-center justify-center rounded-lg border border-gray-200 bg-blue-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-600 focus:z-10 focus:outline-none focus:ring-4"
                  disabled={!formValid}
                >
                  Add Event
                </button>
                <button
                  onClick={handleDrawerClose}
                  className="focus:shadow-outline rounded-lg border border-gray-200 bg-yellow-500 py-2 px-8 font-bold text-white hover:bg-yellow-600 focus:outline-none"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default AddEvent;
