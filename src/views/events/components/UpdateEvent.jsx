import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  fetchEventById,
  updateEvent,
} from "../../../services/event/eventService";
import { MdOutlineEditCalendar } from "react-icons/md";
import Card from "components/card";
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateEvent = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [editable, setEditable] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [titleValid, setTitleValid] = useState(true);
  const [locationValid, setLocationValid] = useState(true);
  const [descriptionValid, setDescriptionValid] = useState(true);
  const [capacityValid, setCapacityValid] = useState(true);
  const [startDateValid, setStartDateValid] = useState(true);
  const [endDateValid, setEndDateValid] = useState(true);
  const [startTimeValid, setStartTimeValid] = useState(true);
  const [endTimeValid, setEndTimeValid] = useState(true);

  useEffect(() => {
    fetchEvent();
  }, []);

  const fetchEvent = async () => {
    try {
      const eventData = await fetchEventById(eventId);
      // Parse date strings to Date objects
      eventData.startDate = new Date(eventData.startDate);
      eventData.endDate = new Date(eventData.endDate);
      setEvent(eventData);
    } catch (error) {
      console.error("Error fetching event details:", error);
    }
  };

  const handleEditToggle = () => {
    setEditable(!editable);
  };

  const handleUpdate = async () => {
    try {
      await updateEvent(eventId, event);
      setUpdated(true);
      console.log("Event updated:", event);
      toast.success('Event updated successfully!');
      window.location.href = "/admin/events";
      // toast.success('Event updated successfully!', {
      //   onClose: () => {
      //     setTimeout(() => {
      //       window.location.href = "/admin/events"; // Redirect after 2 seconds
      //     }, 1000); // Wait for 2 seconds before redirecting
      //   }
      // });
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };
  const validateTitle = () => {
    const titleLength = event.title.trim().length;
    setTitleValid(titleLength >= 3 && titleLength <= 20);
  };

  const validateLocation = () => {
    setLocationValid(event.location.trim().length > 0);
  };

  const validateDescription = () => {
    setDescriptionValid(event.description.trim().length > 0);
  };

  const validateCapacity = () => {
    setCapacityValid(event.capacity !== undefined && event.capacity > 0);
  };

  const validateStartDate = () => {
    const today = new Date().setHours(0, 0, 0, 0);
    const selectedStartDate = new Date(event.startDate).setHours(0, 0, 0, 0);
    setStartDateValid(selectedStartDate >= today);
  };

  const validateEndDate = () => {
    const selectedStartDate = new Date(event.startDate).setHours(0, 0, 0, 0);
    const selectedEndDate = new Date(event.endDate).setHours(0, 0, 0, 0);
    setEndDateValid(selectedEndDate >= selectedStartDate);
  };

  const validateStartTime = () => {
    // Convert start time to minutes for comparison
    const startMinutes =
      parseInt(event.startTime.split(":")[0]) * 60 +
      parseInt(event.startTime.split(":")[1]);
    // Convert end time to minutes for comparison
    const endMinutes =
      parseInt(event.endTime.split(":")[0]) * 60 +
      parseInt(event.endTime.split(":")[1]);
    // Check if start time is before end time
    setStartTimeValid(startMinutes < endMinutes);
  };

  const validateEndTime = () => {
    // Convert start time to minutes for comparison
    const startMinutes =
      parseInt(event.startTime.split(":")[0]) * 60 +
      parseInt(event.startTime.split(":")[1]);
    // Convert end time to minutes for comparison
    const endMinutes =
      parseInt(event.endTime.split(":")[0]) * 60 +
      parseInt(event.endTime.split(":")[1]);
    // Check if end time is after start time
    setEndTimeValid(endMinutes > startMinutes);
  };

  const isFormValid = () => {
    return (
      titleValid &&
      locationValid &&
      descriptionValid &&
      capacityValid &&
      startDateValid &&
      endDateValid &&
      startTimeValid &&
      endTimeValid
    );
  };

  return (
    <>
    <ToastContainer position="top-center" />
    <Card extra={"mt-3 !z-5 overflow-hidden"}>
      <div className="text-center">
      <h1 className="relative mb-4 mt-2 text-2xl font-semibold">
  <MdOutlineEditCalendar
    className="absolute top-0 right-0 mt-2 mr-3 cursor-pointer"
    onClick={handleEditToggle}
  />
  <span className="inline-block mr-2">Edit</span>
  <span className="text-blue-500">{event?.title}</span>
</h1>
        <div className="mb-4 flex items-center justify-center">
          {/* <img src={event?.imageUrl} alt="Event Image" className="w-64 h-64 object-cover rounded-lg" /> */}
          {/* <Link to="/admin/events" className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-md flex items-center hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                    <IoCloudUploadOutline className="mr-2" /> Upload Image
                </Link> */}
        </div>
        <form className="mx-auto mt-4 w-full max-w-lg">
          {/* Form Fields */}
          <div className="mb-5 flex">
            <div className="mr-2 w-full md:w-1/2">
              <label
                htmlFor="event-title"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Event Title
              </label>
              <input
                id="event-title"
                type="text"
                placeholder="Enter your Event title"
                value={event?.title}
                onChange={(e) => {
                  setEvent({ ...event, title: e.target.value });
                  validateTitle();
                }}
                onBlur={validateTitle}
                className={`block w-full rounded-lg border ${
                  titleValid ? "border-gray-300" : "border-red-500"
                } bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500`}
                required
              />
              {!titleValid && (
                <p className="mt-1 text-xs text-red-500">
                  {event.title.trim().length === 0
                    ? "Event title is required"
                    : "Title must be between 3 and 20 characters"}
                </p>
              )}
            </div>
            <div className="ml-2 w-full md:w-1/2">
              <label
                htmlFor="event-location"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Location
              </label>
              <input
                id="event-location"
                placeholder="Enter your Event location"
                type="text"
                value={event?.location}
                onChange={(e) => {
                  setEvent({ ...event, location: e.target.value });
                  validateLocation();
                }}
                onBlur={validateLocation}
                className={`block w-full rounded-lg border ${
                  locationValid ? "border-gray-300" : "border-red-500"
                } bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500`}
                required
              />
              {!locationValid && (
                <p className="mt-1 text-xs text-red-500">
                  Location is required
                </p>
              )}
            </div>
          </div>
          <div className="mb-5 flex">
            <div className="mr-2 w-full md:w-1/2">
              <label
                htmlFor="event-type"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Event Type
              </label>
              <select
                id="event-type"
                value={event?.eventType}
                onChange={(e) =>
                  setEvent({ ...event, eventType: e.target.value })
                }
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                required
              >
                <option value="Charity Concert">Charity Concert</option>
                <option value="Final Year Party">Final Year Party</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="ml-2 w-full md:w-1/2">
              <label
                htmlFor="status"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Status
              </label>
              <select
                id="status"
                value={event?.status}
                onChange={(e) => setEvent({ ...event, status: e.target.value })}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
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
          <div className="mb-5">
            <label
              htmlFor="event-description"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Description
            </label>
            <textarea
              id="event-description"
              placeholder="write your event description  here..."
              value={event?.description}
              onChange={(e) =>
                setEvent({ ...event, description: e.target.value })
              }
              onBlur={validateDescription}
              className={`block w-full rounded-lg border ${
                descriptionValid ? "border-gray-300" : "border-red-500"
              } bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500`}
              required
            ></textarea>
            {!descriptionValid && (
              <p className="mt-1 text-xs text-red-500">
                Description is required
              </p>
            )}
          </div>
          <div className="mb-5 flex">
            <div className="mr-2 w-full md:w-1/2">
              <label
                htmlFor="event-start-date"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Start Date
              </label>
              <input
                id="event-start-date"
                type="date"
                value={
                  event?.startDate
                    ? event.startDate.toISOString().split("T")[0]
                    : ""
                }
                onChange={(e) =>
                  setEvent({ ...event, startDate: new Date(e.target.value) })
                }
                onBlur={() => {
                  validateStartDate();
                  validateEndDate();
                }}
                className={`block w-full rounded-lg border ${
                  startDateValid ? "border-gray-300" : "border-red-500"
                } bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500`}
                required
              />
              {!startDateValid && (
                <p className="mt-1 text-xs text-red-500">
                  Start date must be today or later
                </p>
              )}
              <label
                htmlFor="event-start-time"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Start Time
              </label>
              <input
                id="event-start-time"
                type="time"
                value={event?.startTime}
                onChange={(e) =>
                  setEvent({ ...event, startTime: e.target.value })
                }
                onBlur={() => {
                  validateStartTime();
                  validateEndTime();
                }}
                className={`block w-full rounded-lg border ${
                  startTimeValid ? "border-gray-300" : "border-red-500"
                } bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500`}
                required
              />
              {!startTimeValid && (
                <p className="mt-1 text-xs text-red-500">
                  Start time must be before end time.
                </p>
              )}
            </div>
            <div className="ml-2 w-full md:w-1/2">
              <label
                htmlFor="event-end-date"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                End Date
              </label>
              <input
                id="event-end-date"
                type="date"
                value={
                  event?.endDate
                    ? event.endDate.toISOString().split("T")[0]
                    : ""
                }
                onChange={(e) =>
                  setEvent({ ...event, endDate: new Date(e.target.value) })
                }
                onBlur={validateEndDate}
                className={`block w-full rounded-lg border ${
                  endDateValid ? "border-gray-300" : "border-red-500"
                } bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500`}
                required
              />
              {!endDateValid && (
                <p className="mt-1 text-xs text-red-500">
                  End date can be today or after the start date.
                </p>
              )}
              <label
                htmlFor="event-end-time"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                End Time
              </label>
              <input
                id="event-end-time"
                type="time"
                value={event?.endTime}
                onChange={(e) =>
                  setEvent({ ...event, endTime: e.target.value })
                }
                onBlur={() => {
                  validateStartTime();
                  validateEndTime();
                }}
                className={`block w-full rounded-lg border ${
                  endTimeValid ? "border-gray-300" : "border-red-500"
                } bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500`}
                required
              />
              {!endTimeValid && (
                <p className="mt-1 text-xs text-red-500">
                  End time must be after start time.
                </p>
              )}
            </div>
          </div>
          <div className="mb-5">
            <label
              htmlFor="capacity"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Capacity
            </label>
            <input
              id="capacity"
              type="number"
              placeholder="capacity"
              value={event?.capacity}
              onChange={(e) =>
                setEvent({ ...event, capacity: parseInt(e.target.value) })
              }
              onBlur={validateCapacity}
              className={`block w-full rounded-lg border ${
                capacityValid ? "border-gray-300" : "border-red-500"
              } bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500`}
              required
            />
            {!capacityValid && (
              <p className="mt-1 text-xs text-red-500">
                Capacity is required and must be a positive number
              </p>
            )}
          </div>
          {/* Add more input fields for other event attributes */}

          <div className="mb-4 flex justify-center">
            <button
              onClick={handleUpdate}
              className={`focus:shadow-outline mr-4 rounded bg-blue-500 py-2 px-8 font-bold text-white hover:bg-blue-600 focus:outline-none ${
                !isFormValid() && "cursor-not-allowed opacity-50"
              }`}
              type="button"
              disabled={!isFormValid()}
            >
              Update
            </button>
            <Link
              to="/admin/events"
              className="focus:shadow-outline rounded bg-yellow-500 py-2 px-8 font-bold text-white hover:bg-yellow-600 focus:outline-none"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </Card>
    </>
  );
};

export default UpdateEvent;
