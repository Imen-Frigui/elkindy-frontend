import React, { useState, useEffect } from "react";
import {
  fetchArchivedEvents,
  restoreEvent as restoreEventService,
  deleteEvent,
} from "../../../services/event/eventService";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoMdSearch } from "react-icons/io";
import { GrFormPreviousLink, GrFormNextLink } from "react-icons/gr";
import { IoArrowBackCircle } from "react-icons/io5";
import { MdOutlineRestore, MdDelete } from "react-icons/md";
const ArchivedEvents = () => {
  const [archivedEvents, setArchivedEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    const getArchivedEvents = async () => {
      try {
        const fetchedArchivedEvents = await fetchArchivedEvents();
        if (fetchedArchivedEvents) {
          setArchivedEvents(fetchedArchivedEvents);
          console.log(fetchedArchivedEvents);
        }
      } catch (error) {
        console.error("Failed to fetch archived events:", error);
      }
    };

    getArchivedEvents();
  }, []);

  // Filter archived events based on search query
  const filteredArchivedEvents = archivedEvents.filter((event) =>
    Object.values(event).some((value) =>
      typeof value === "string"
        ? value.toLowerCase().includes(searchQuery.toLowerCase())
        : value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  // Pagination logic
  const indexOfLastEvent = currentPage * itemsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - itemsPerPage;
  const currentEvents = filteredArchivedEvents.slice(
    indexOfFirstEvent,
    indexOfLastEvent
  );
  const handlePreviousPage = () => {
    setCurrentPage(currentPage > 1 ? currentPage - 1 : currentPage);
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredArchivedEvents.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageNumberClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDeletePermanently = async (eventId) => {
    try {
      await deleteEvent(eventId);
      setArchivedEvents((prevEvents) =>
        prevEvents.filter((event) => event._id !== eventId)
      );
      toast.success("Event deleted permanently.");
    } catch (error) {
      console.error("Failed to delete event permanently:", error);
    }
  };

  const handleRestore = async (eventId) => {
    console.log("Restoring event with ID:", eventId);
    try {
      const restoredEvent = await restoreEventService(eventId);
      console.log("Event restored successfully:", restoredEvent);
      setArchivedEvents((prevEvents) =>
        prevEvents.filter((event) => event._id !== eventId)
      );
      toast.success("Event Restored successfully!");
    } catch (error) {
      console.error("Failed to restore event:", error);
    }
  };
  const handleBackToMainPage = () => {
    navigate("/admin/events");
  };

  return (
    <div>
<h1 
className="cursor-pointer text-4xl font-extrabold mb-4 m-6 text-center text-gray-500 hover:text-blue-500 transition-colors duration-300 bg-gray-200 hover:bg-blue-200 p-4 rounded-lg font-poppins transform hover:scale-105 transition-transform duration-300"
style={{ fontFamily: "Georgia, serif" }}
>
  Review your Archived Events
</h1>
   
<div className="mt-6 flex flex-col">
        <div className="overflow-x-auto rounded-lg">
          <div className="inline-block min-w-full align-middle">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center">
                <IconButton
                  onClick={handleBackToMainPage}
                  aria-label="Back to Main Page"
                  title="Back to Main Page"
                  className="dark:text-white"
                >
                  <IoArrowBackCircle />
                </IconButton>
              </div>
              {/* Search bar */}
              <div className="flex items-center">
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="h-10 rounded-md border border-gray-300 px-3 py-2 "
                    style={{ width: "300px", borderRadius: '22px 0 0 22px' }}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button
                    className="rounded-r-md bg-gray-200 p-2"
                    style={{ backgroundColor: "rgb(0, 107, 190)", borderRadius: "0 22px 22px 0" }}
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
                      Description
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
                        className=" cursor-pointer items-center whitespace-nowrap p-4 text-sm font-normal text-black dark:text-gray-400"
                      >
                        <p>{event.description}</p>
                      </td>

                      <td
                        role="cell"
                        className="cursor-pointer whitespace-nowrap p-4 text-sm font-normal dark:text-white"
                      >
                        <p>{event.status}</p>
                      </td>

                      <td className="whitespace-nowrap p-4">
                        <button
                          className="mr-2 rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
                          onClick={() => handleRestore(event._id)}
                          style={{ borderRadius: "0px 22px" }}
                          title="Restore event"

                        >
                          <MdOutlineRestore className="mr-1 inline-block" />
                          Restore
                        </button>
                        <button
                          className="rounded bg-red-500 py-2 px-4 font-bold text-white hover:bg-red-700"
                          onClick={() => handleDeletePermanently(event._id)}
                          style={{ borderRadius: "0px 22px" }}
                          title="Delete event"

                        >
                          <MdDelete className="mr-1 inline-block" />
                          Delete Permanently
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
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
          { length: Math.ceil(filteredArchivedEvents.length / itemsPerPage) },
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
            currentPage ===
            Math.ceil(filteredArchivedEvents.length / itemsPerPage)
          }
          className={`flex items-center gap-2 rounded-full px-4 py-2 text-white transition-colors ${
            currentPage ===
            Math.ceil(filteredArchivedEvents.length / itemsPerPage)
              ? "cursor-not-allowed bg-gray-300"
              : "bg-[#f6a12d] hover:bg-blue-500"
          }`}
        >
          Next
          <GrFormNextLink />
        </button>
      </div>
    </div>
  );
};

export default ArchivedEvents;
