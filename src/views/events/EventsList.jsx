import { useEffect, useState } from "react";
import {
  fetchEvents,
  archiveEvent,
  deleteEvent,
} from "../../services/event/eventService";
import { useNavigate } from "react-router-dom";
import AddEvent from "./components/AddEvent";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { MdDelete, MdEdit } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { IoMdSearch } from "react-icons/io";
import { GrFormPreviousLink, GrFormNextLink } from "react-icons/gr";
import * as XLSX from "xlsx";
import { FaFileDownload } from "react-icons/fa";
import { FaArchive, FaFilePdf } from "react-icons/fa";
import jsPDF from "jspdf";
import "jspdf-autotable";
import img1 from "assets/img/nfts/img1.jpg";
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
  const handleClick = () => {
    navigate("/admin/events/archived");
  };

  const handlePopoverOpen = (event, eventItem) => {
    setSelectedEvent(eventItem);
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setSelectedEvent(null);
    setAnchorEl(null);
  };

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

  // Helper function to format date and time
  const formatDateTime = (isoString, onlyDate = false) => {
    const options = onlyDate
      ? { year: "numeric", month: "2-digit", day: "2-digit" }
      : {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        };
    return new Date(isoString).toLocaleString("en-US", options);
  };
  // Function to prepare data for export
  const prepareDataForExport = (data) => {
    return data.map((event) => {
      const { _id, ...rest } = event;

      return {
        Title: rest.title,
        Type: rest.eventType,
        Location: rest.location,
        Status: rest.status,
        Description: rest.description,
        Capacity: rest.capacity,
        StartDate: formatDateTime(event.startDate, true),
        EndDate: formatDateTime(event.endDate, true),
      };
    });
  };

  // Function to export data as CSV
  const exportToCSV = (csvData, fileName) => {
    const modifiedData = prepareDataForExport(csvData);
    const worksheet = XLSX.utils.json_to_sheet(modifiedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, fileName + ".csv");
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

  // Pagination logic
  const indexOfLastEvent = currentPage * itemsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - itemsPerPage;
  const currentEvents = filteredEvents.slice(
    indexOfFirstEvent,
    indexOfLastEvent
  );
  const handlePreviousPage = () => {
    setCurrentPage(currentPage > 1 ? currentPage - 1 : currentPage);
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredEvents.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageNumberClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleArchiveEvent = async (eventId) => {
    try {
      await archiveEvent(eventId);
      fetchEvents().then(setEvents);
      toast.success("Event archived successfully!");
    } catch (error) {
      console.error("Failed to archive event:", error);
    }
  };
  const handleGeneratePDF = () => {
    const doc = new jsPDF('l', 'mm', [210, 297]); // Landscape format
  
    events.forEach((event, index) => {
      if (index !== 0) {
        doc.addPage();
      }
  
      // Card dimensions
      doc.setDrawColor(0);
      doc.roundedRect(10, 10, 260, 90, 4, 4, 'S');
  
      // Logo at the top left with increased size
      doc.addImage(img1, "JPEG", 15, 15, 70, 70); // Logo dimensions
  
      // Event title in the middle at the top
      doc.setFontSize(16);
      doc.setFont(undefined, 'bold');
      doc.text(event.title, 140, 20, { align: "center" });

      doc.setFontSize(12);
      doc.setFont(undefined, 'normal');
   
      doc.text(`Location: ${event.location}`, 95, 20, { align: "right" });
  
      doc.setFontSize(11);
      doc.text(event.description, 140, 35, { align: "center", maxWidth: 250 });
  
      const newY = 80; 
  
      doc.setFontSize(10);
      doc.setTextColor(0);
      doc.text(`Start Date: ${formatDateTime(event.startDate)}`, 20, newY);
      doc.setTextColor(255, 165, 0);
      doc.text(`Start Time: ${event.startTime}`, 20, newY + 10);
  
      doc.setFontSize(10);
      doc.setTextColor(0); 
      doc.text(`End Date: ${formatDateTime(event.endDate)}`, 250, newY, { align: "right" });
      doc.setTextColor(0, 0, 255); 
      doc.text(`End Time: ${event.endTime}`, 250, newY + 10, { align: "right" });
  
      doc.setFontSize(12);
      doc.setTextColor(0); 
      doc.text(`Capacity: ${event.capacity}`, 140, 95, { align: "center" }); 
    });


    
  
    doc.save("events.pdf");
  };
  
  
  

  return (
    <>
      <ToastContainer position="top-center" />
      <div className="mt-6 flex flex-col">
        <div className="overflow-x-auto rounded-lg">
          <div className="inline-block min-w-full align-middle">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center">
                <AddEvent onEventAdded={handleEventAdded} />
                {/* Export Button */}
                <button
                  className="m-2 mr-0  flex h-10 w-40 items-center justify-center bg-green-500 text-white"
                  style={{ borderRadius: " 0px 22px" }}
                  onClick={() => exportToCSV(events, "events_export")}
                  title="Export Event Table"
                >
                  <FaFileDownload className="mr-2" />
                  Export as CSV
                </button>
                <button
                  className="m-2   mr-0 flex h-10 w-40 items-center justify-center bg-gray-500 text-white"
                  style={{ borderRadius: "22px 0px" }}
                  onClick={handleClick}
                  title="View All Archived Events"
                >
                  <FaArchive className="mr-2" />
                  Archived Events
                </button>
                <button
                  className="m-2  flex h-10 w-40 items-center justify-center bg-blue-500 text-white"
                  style={{ borderRadius: " 0px 22px" }}
                  onClick={handleGeneratePDF}
                  title="Generate PDF of Events"
                >
                  <FaFilePdf className="mr-2" />
                  Generate PDF
                </button>
              </div>
              {/* Search bar */}
              <div className="flex items-center">
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
                  {currentEvents.map((event) => (
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
                        className="cursor-pointer items-center whitespace-nowrap p-4 text-sm font-normal text-black dark:text-gray-400"
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
                              title="View event details"
                            >
                              Details
                            </Button>
                            <Button
                              startIcon={<MdEdit />}
                              onClick={() => handleEditClick(selectedEvent._id)}
                              title="Edit event"
                            >
                              Edit
                            </Button>
                            <Button
                              startIcon={<MdDelete />}
                              onClick={() => handleDeleteClick(event._id)}
                              title="Delete event"
                            >
                              Delete
                            </Button>
                            <Button
                              startIcon={<FaArchive />}
                              onClick={() => handleArchiveEvent(event._id)}
                              title="Archive event"
                            >
                              Archive
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
      <DeleteConfirmationDialog
        open={deleteConfirmationOpen}
        onClose={() => setDeleteConfirmationOpen(false)}
        onConfirm={handleDeleteConfirmation}
        eventTitle={selectedEvent ? selectedEvent.title : null}
      />
      {/* Pagination Controls */}
      <div className="mt-4 flex items-center justify-center gap-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`flex items-center gap-2 rounded-full px-4 py-2 text-white transition-colors ${
            currentPage === 1
              ? "cursor-not-allowed bg-gray-300"
              : "bg-[#f6a12d] hover:bg-blue-500"
          }`}
        >
          <GrFormPreviousLink />
          Previous
        </button>

        {Array.from(
          { length: Math.ceil(filteredEvents.length / itemsPerPage) },
          (_, i) => i + 1
        ).map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageNumberClick(pageNumber)}
            className={`flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors ${
              currentPage === pageNumber
                ? "bg-blue-500"
                : "bg-[#f6a12d] hover:bg-blue-500"
            }`}
          >
            {pageNumber}
          </button>
        ))}

        <button
          onClick={handleNextPage}
          disabled={
            currentPage === Math.ceil(filteredEvents.length / itemsPerPage)
          }
          className={`flex items-center gap-2 rounded-full px-4 py-2 text-white transition-colors ${
            currentPage === Math.ceil(filteredEvents.length / itemsPerPage)
              ? "cursor-not-allowed bg-gray-300"
              : "bg-[#f6a12d] hover:bg-blue-500"
          }`}
        >
          Next
          <GrFormNextLink />
        </button>
      </div>
    </>
  );
};

export default EventsList;
