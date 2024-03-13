import { useEffect, useState } from "react";
import { fetchEvents, deleteEvent } from "../../services/event/eventService";
import { useNavigate } from "react-router-dom";
import AddEvent from "./components/AddEvent";
import SuccessAlert from "../../components/alert/AlertComponent";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { MdDelete, MdEdit } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { IoMdSearch } from "react-icons/io";
import { DefaultPagination } from "./components/DefaultPagination";
import {
  MdCheckCircle,
  MdCancel,
  MdOutlineError,
  MdPause,
  MdSchedule,
  MdReduceCapacity,
} from "react-icons/md";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteConfirmationDialog from "./components/DeleteConfirmationDialog";

const EventsList = () => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  // const [successMessage, setSuccessMessage] = useState("");
  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  useEffect(() => {
    const getEvents = async () => {
      try {
        const fetchedEvents = await fetchEvents();
        if (fetchedEvents) {
          setEvents(fetchedEvents);
          console.log(fetchedEvents);
        }
      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
    };

    getEvents();
  }, []);

  const getStatusIconAndColor = (status) => {
    switch (status) {
      case "Scheduled":
        return { icon: <MdSchedule />, color: "text-blue-500" };
      case "Active":
        return { icon: <MdCheckCircle />, color: "text-green-500" };
      case "Completed":
        return { icon: <MdCheckCircle />, color: "text-green-500" };
      case "Cancelled":
        return { icon: <MdCancel />, color: "text-red-500" };
      case "Postponed":
        return { icon: <MdPause />, color: "text-yellow-500" };
      case "Pending":
        return { icon: <MdOutlineError />, color: "text-orange-500" };
      default:
        return { icon: null, color: "text-black" };
    }
  };

  const handleEventAdded = () => {
    fetchEvents().then(setEvents);
    toast.success("Event added successfully!");
  };

  const handlePopoverOpen = (event, eventItem) => {
    setSelectedEvent(eventItem);
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setSelectedEvent(null);
    setAnchorEl(null);
  };

  // const handleDeleteClick = async () => {
  //   if (!selectedEvent) return;

  //   try {
  //     await deleteEvent(selectedEvent._id);
  //     // Refresh event list
  //     fetchEvents().then(setEvents);
  //   } catch (error) {
  //     console.error("Failed to delete event:", error);
  //   }

  //   handlePopoverClose();
  // };

  const handleDeleteClick = (eventId) => {
    setSelectedEventId(eventId);
    setDeleteConfirmationOpen(true);
  };

  const handleDeleteConfirmation = async () => {
    if (!selectedEventId) return;
    console.log("Selected event ID:", selectedEventId);

    try {
      await deleteEvent(selectedEventId);
      // Refresh event list
      fetchEvents().then(setEvents);
    } catch (error) {
      console.error("Failed to delete event:", error);
    }

    setDeleteConfirmationOpen(false);
    toast.success("Event deleted successfully!");
  };
  const handleDetailsClick = () => {
    if (selectedEvent) {
      console.log("Selected Event:", selectedEvent);
      navigate(`/admin/events/details/${selectedEvent._id}`);
      handlePopoverClose();
    } else {
      console.error("No event selected.");
    }
  };

  const handleEditClick = (eventId) => {
    setSelectedEventId(eventId);
    navigate(`/admin/events/edit/${eventId}`);
    handlePopoverClose();
  };

  // Calculate the index of the first item on the current page
  const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
  // Get the current page of items
  const currentEvents = events.slice(indexOfFirstItem, indexOfFirstItem + itemsPerPage);

  // Calculate the total number of pages
  const totalPages = Math.ceil(events.length / itemsPerPage);

  // Pagination handler
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  // Filter events based on search query
  const filteredEvents = events.filter((event) =>
    Object.values(event).some((value) =>
      typeof value === "string"
        ? value.toLowerCase().includes(searchQuery.toLowerCase())
        : value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <>
      {/* {successMessage && <SuccessAlert message={successMessage} />} */}
      <ToastContainer position="top-center" />
      <div className="mt-6 flex flex-col">
        <div className="overflow-x-auto rounded-lg">
          <div className="inline-block min-w-full align-middle">
            <div className="mb-4 flex items-center justify-between">
              <AddEvent onEventAdded={handleEventAdded} />
              {/* Search bar */}
              <div className="mt-4 mr-4 flex items-center">
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="h-10 rounded-md border border-gray-300 px-3 py-2 "
                    style={{ width: "300px" }}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button
                    className="rounded-r-md bg-gray-200 p-2"
                    style={{ backgroundColor: "rgb(0, 107, 190)" }}
                  >
                    <IoMdSearch style={{ color: "white" }} />
                  </button>
                </div>
              </div>
            </div>
            <div className="col-span-9 mt-4 overflow-hidden shadow sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th
                      scope="col"
                      className="p-4 text-left text-xs font-medium uppercase tracking-wider text-black dark:text-white"
                    >
                      Title
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-left text-xs font-medium uppercase tracking-wider text-black dark:text-white"
                    >
                      Type
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-left text-xs font-medium uppercase tracking-wider text-black dark:text-white"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-left text-xs font-medium uppercase tracking-wider text-black dark:text-white"
                    >
                      Location
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-left text-xs font-medium uppercase tracking-wider text-black dark:text-white"
                    >
                      Description
                    </th>
                    {/* <th
                      scope="col"
                      className="p-4 text-left text-xs font-medium uppercase tracking-wider text-black dark:text-white"
                    >
                      Start Date
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-left text-xs font-medium uppercase tracking-wider text-black dark:text-white"
                    >
                      End Date
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-left text-xs font-medium uppercase tracking-wider text-black dark:text-white"
                    >
                      Start Time
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-left text-xs font-medium uppercase tracking-wider text-black dark:text-white"
                    >
                      End Time
                    </th> */}
                    <th
                      scope="col"
                      className="p-4 text-left text-xs font-medium uppercase tracking-wider text-black dark:text-white"
                    >
                      Capacity
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-left text-xs font-medium uppercase tracking-wider text-black dark:text-white "
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800">
                  {filteredEvents.map((event) => (
                    <tr key={event._id} role="row">
                      <td
                        role="cell"
                        className="cursor-pointer whitespace-nowrap p-4 text-sm font-normal text-gray-900 dark:text-white"
                      >
                        <p className="font-bold">{event.title}</p>
                      </td>

                      <td
                        role="cell"
                        className="cursor-pointer whitespace-nowrap p-4 text-sm font-normal text-black dark:text-gray-400"
                      >
                        <p>{event.eventType}</p>
                      </td>
                      <td
                        role="cell"
                        className="cursor-pointer whitespace-nowrap p-4 text-sm font-normal dark:text-white"
                      >
                        <div className="flex items-center gap-2 ">
                          <div
                            className={`rounded-full text-xl ${
                              getStatusIconAndColor(event.status).color
                            }`}
                          >
                            {getStatusIconAndColor(event.status).icon}
                          </div>
                          <p>{event.status}</p>
                        </div>
                      </td>
                      <td
                        role="cell"
                        className="cursor-pointer whitespace-nowrap p-4 text-sm font-normal text-black dark:text-gray-400"
                      >
                        <p>{event.location}</p>
                      </td>
                      <td
                        role="cell"
                        className="flex w-1/4 cursor-pointer items-center whitespace-nowrap p-4 text-sm font-normal text-black dark:text-gray-400"
                      >
                        <div style={{ display: "flex", alignItems: "center" }}>
                          {showFullDescription ? (
                            <>
                              <p>{event.description}</p>
                              <MdKeyboardArrowLeft
                                className="ml-2 cursor-pointer text-blue-500"
                                onClick={toggleDescription}
                              />
                            </>
                          ) : (
                            <>
                              <p>
                                {event.description.length > 30
                                  ? event.description.substring(0, 30) + "..."
                                  : event.description}
                              </p>
                              {event.description.length > 30 && (
                                <MdKeyboardArrowRight
                                  className="ml-2 cursor-pointer text-blue-500 "
                                  onClick={toggleDescription}
                                />
                              )}
                            </>
                          )}
                        </div>
                      </td>
                      {/* <td
                        role="cell"
                        className="w-1/4 cursor-pointer whitespace-nowrap p-4 text-sm font-normal text-black dark:text-gray-400"
                      >
                        {showFullDescription ? (
                          <div>
                            <p>{event.description}</p>
                            <button
                              className="mt-2 rounded bg-blue-500 py-1 px-2 text-white"
                              onClick={toggleDescription}
                            >
                              Show Less
                            </button>
                          </div>
                        ) : (
                          <div>
                            <p>
                              {event.description.length > 30
                                ? event.description.substring(0, 30) + "..."
                                : event.description}
                            </p>
                            {event.description.length > 30 && (
                              <button
                                className="mt-2 rounded bg-blue-500 py-1 px-2 text-white"
                                onClick={toggleDescription}
                              >
                                Show More
                              </button>
                            )}
                          </div>
                        )}
                      </td> */}
                      {/* <td
                        role="cell"
                        className="whitespace-nowrap p-4 text-sm font-normal text-black dark:text-gray-400"
                      >
                        <p>{new Date(event.startDate).toLocaleDateString()}</p>
                      </td> */}
                      {/* <td
                        role="cell"
                        className="whitespace-nowrap p-4 text-sm font-normal text-black dark:text-gray-400"
                      >
                        <p>{new Date(event.endDate).toLocaleDateString()}</p>
                      </td>
                      <td
                        role="cell"
                        className="whitespace-nowrap p-4 text-sm font-normal text-black dark:text-gray-400"
                      >
                        <p>{event.startTime}</p>
                      </td>
                      <td
                        role="cell"
                        className="whitespace-nowrap p-4 text-sm font-normal text-black dark:text-gray-400"
                      >
                        <p>{event.endTime}</p>
                      </td> */}
                      <td
                        role="cell"
                        className="cursor-pointer whitespace-nowrap p-4 text-sm font-normal text-black hover:text-orange-500 dark:text-gray-400"
                      >
                        <div className="flex items-center gap-2">
                          <MdReduceCapacity />
                          <p>{event.capacity}</p>
                        </div>
                      </td>
                      {/* <td className="p-4 whitespace-nowrap">
                                                {editEventId === event._id ? (
                                                    <TextField
                                                        fullWidth
                                                        variant="outlined"
                                                        defaultValue={event.title}
                                                        value={editEventName}
                                                        onChange={(e) => setEditEventName(e.target.value)}
                                                        onKeyDown={(e) => {
                                                            if (e.key === 'Enter') {
                                                                e.preventDefault();
                                                                handleSaveClick(event._id, e.target.value).then(r => console.log(r));
                                                            }
                                                        }}
                                                    />
                                                ) : (
                                                    <span
                                                        onDoubleClick={() => handleEditClick(event)}>{event.title}</span>
                                                )}
                                            </td> */}
                      <td className="whitespace-nowrap p-4">
                        <IconButton
                          aria-describedby={
                            selectedEvent ? "popover" : undefined
                          }
                          onClick={(e) => handlePopoverOpen(e, event)}
                        >
                          <BiDotsVerticalRounded className="dark:text-gray-400" />
                        </IconButton>

                        <Popover
                          id={id}
                          open={open}
                          anchorEl={anchorEl}
                          onClose={handlePopoverClose}
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left",
                          }}
                        >
                          <Typography sx={{ p: 2 }}>
                            <Button
                              startIcon={<FaRegEye />}
                              onClick={() => handleDetailsClick()}
                            >
                              Details
                            </Button>
                            <Button
                              startIcon={<MdEdit />}
                              onClick={() => handleEditClick(selectedEvent._id)}
                            >
                              Edit
                            </Button>
                            <Button
                              startIcon={<MdDelete />}
                              onClick={() => handleDeleteClick(event._id)}
                            >
                              Delete
                            </Button>
                          </Typography>
                        </Popover>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* <DefaultPagination
        pageCount={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      /> */}
      <DeleteConfirmationDialog
        open={deleteConfirmationOpen}
        onClose={() => setDeleteConfirmationOpen(false)}
        onConfirm={handleDeleteConfirmation}
        eventTitle={selectedEvent ? selectedEvent.title : null}
      />
    </>
  );
};

export default EventsList;
