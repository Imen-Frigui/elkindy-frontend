import React, { useState, useEffect } from "react";
import { addEvent } from "../../../services/event/eventService";
import { Link } from "react-router-dom";
import axios from "axios";
import Select from 'react-select';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Card from "components/card";
import { FaRegCalendarPlus } from "react-icons/fa";
import { IoArrowBackCircle, IoTicketSharp } from "react-icons/io5";
import TicketManagementModal from "./TicketManagementModal";
const AddEvent = () => {
  // const [isDrawerOpen, setIsDrawerOpen] = useState(false);
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
  const [modalOpen, setModalOpen] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [selectedParticipants, setSelectedParticipants] = useState([]);
  const [users, setUsers] = useState([]);


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/users/getAllUsers');
        const options = response.data.map(user => ({
          value: user._id,
          label: user.email
        }));
        setUsers(options);
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Failed to fetch users.");
      }
    };
    
  fetchUsers();
}, []);

  const handleParticipantsChange = (selectedOptions) => {
    setSelectedParticipants(selectedOptions);
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
  }
 
  };
  const handleAddEvent = async (event) => {
    event.preventDefault();
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
    // const eventData = {
    //   title: eventName,
    //   location: eventLocation,
    //   description: eventDescription,
    //   startDate,
    //   endDate,
    //   startTime,
    //   endTime,
    //   capacity,
    //   eventType: eventType === "Other" ? eventTypeInput : eventType,
    //   status: eventStatus,
    //   image: imageFile 
    //     };
    const formData = new FormData();
    formData.append('title', eventName);
    formData.append('location', eventLocation);
    formData.append('description', eventDescription);
    formData.append('startDate', startDate);
    formData.append('endDate', endDate);
    formData.append('startTime', startTime);
    formData.append('endTime', endTime);
    formData.append('capacity', capacity);
    formData.append('eventType', eventType === "Other" ? eventTypeInput : eventType);
    formData.append('status', eventStatus);
  // Append other event details to formData
      selectedParticipants.forEach(option => {
      formData.append('participants', option.value);
  });
    if (imageFile) { 
      formData.append('image', imageFile);
    }

    try {
      await addEvent(formData);
      resetForm();
      toast.success("Event added successfully!");

    } catch (error) {
      alert("Failed to add event");
      console.error(error);
    }
  };

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
    setImageFile("");
    setSelectedParticipants("");
  };

  const validateTitle = () => {
    if (!eventName) {
      setTitleError("Title is required");
      setFormValid(false);
    } else if (eventName.length > 30) {
      setTitleError("Title cannot exceed 30 characters");
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
    } else if (eventDescription.length > 300) {
      setDescriptionError("Description cannot exceed 300 characters");
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
    today.setHours(0, 0, 0, 0);
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
        <ToastContainer position="top-center" />
      <Card extra={"mt-3 !z-5 overflow-hidden"}>
      <div className="text-center">
      <h1 className="relative mb-4 mt-2 text-2xl font-semibold">
  <FaRegCalendarPlus
    className="absolute top-0 right-0 mt-2 mr-3 cursor-pointer"
  />
    <Link to="/admin/events">
            <IoArrowBackCircle
              className="absolute top-0 left-0 mt-2 ml-3 cursor-pointer"
              title="Back To Events List"
            />
          </Link>
</h1>
{/* Manage Tickets section */}
          <div className="border border-gray-300 rounded-lg p-4 mb-4 inline-block mr-4">
            <button
              onClick={handleModalOpen}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center justify-center"
            >
              <IoTicketSharp className="mr-1" />
              Manage Tickets For This Event
            </button>
          </div>
<form onSubmit={handleAddEvent} className="inline-block mt-4 mb-4 w-full max-w-lg pt-2 pb-4 border-2 border-gray-300 shadow-lg rounded-xl p-2">
        <h1 className="text-sm font-semibold uppercase text-blue-500 dark:text-gray-500 mt-2 mb-4">
    Add New Event
</h1>
  <div className="space-y-4">
    <div>
              <label htmlFor="image" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                Event Image
              </label>
              <input
                type="file"
                id="image"
                onChange={handleImageChange}
                className="focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
              />
            </div>
  <div className="grid grid-cols-2 gap-4">
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
  <div className="grid grid-cols-2 gap-4">
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
  </div>
  <div className="grid grid-cols-2 gap-4">
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
  </div>
  <div className="grid grid-cols-2 gap-4">
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
  <div>
  <label htmlFor="participants" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
    Invite Participants
  </label>
  <Select
    id="participants"
    options={users}
    isMulti
    closeMenuOnSelect={false}
    value={selectedParticipants}
    onChange={handleParticipantsChange}
    className="basic-multi-select"
    classNamePrefix="select"
    required
  />
</div>
              <div className="flex justify-center space-x-4">
                <button
                  type="submit"
                  className="focus:ring-primary-300 inline-flex items-center justify-center rounded-lg border border-gray-200 bg-blue-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-600 focus:z-10 focus:outline-none focus:ring-4"
                  disabled={!formValid}
                >
                  Add Event
                </button>
                <Link
              title="Cancel Adding"
              to="/admin/events"
              className="focus:shadow-outline rounded-lg border border-gray-200 bg-yellow-500 py-2 px-8 font-bold text-white hover:bg-yellow-600 focus:outline-none"
              >
              Cancel
            </Link>
              </div>
            </div>
      </form>
      </div>
        </Card>
        <TicketManagementModal open={modalOpen} onClose={handleModalClose} />
    </>
  );
};

export default AddEvent;
