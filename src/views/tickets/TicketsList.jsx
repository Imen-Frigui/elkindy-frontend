import { useEffect, useState } from "react";
import { fetchTickets, deleteTicket} from "../../services/tickets/ticketService";
import AddTicket from "./components/AddTicket";
import SuccessAlert from "../../components/alert/AlertComponent";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { MdDelete, MdEdit } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";


const TicketsList = () => {
  const [successMessage, setSuccessMessage] = useState("");


  const [tickets, setTickets] = useState([]);


  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTicket, setSelectedTicket] = useState(null);


  useEffect(() => {
    const getTickets = async () => {
      try {
        const fetchedTickets = await fetchTickets();
        if (fetchedTickets) {
          setTickets(fetchedTickets);
          //const eventIds = fetchedTickets.map((ticket) => ticket.eventId); 
          //const fetchedEvents = await Promise.all(eventIds.map((id) => fetchEventById(id)));
          //setEvents(fetchedEvents);
          console.log(fetchedTickets);
        }
      } catch (error) {
        console.error("Failed to fetch Tickets:", error);
      }
    };

    getTickets().then((r) => console.log(r));
  }, []);

  const handleTicketAdded = () => {
    fetchTickets().then(setTickets);
  };

  const handlePopoverOpen = (ticket, ticketItem) => {
    setSelectedTicket(ticketItem);
    setAnchorEl(ticket.currentTarget);
  };

  const handlePopoverClose = () => {
    setSelectedTicket(null);
    setAnchorEl(null);
  };
  const handleDetailsClick = () => {
    // Handle Details action
    //navigate(`/admin/courses/assign-teachers/${selectedTicket._id}`);
    handlePopoverClose();
  };

  const handleDeleteClick = async () => {
    if (!selectedTicket) return;

    try {
        await deleteTicket(selectedTicket._id);
        // Refresh Tickets list
        fetchTickets().then(setTickets);
    } catch (error) {
        console.error('Failed to delete Tickets:', error);
    }

    handlePopoverClose();
};

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
     {successMessage && <SuccessAlert message={successMessage} />}
      <div className="mt-6 flex flex-col">
        <div className="overflow-x-auto rounded-lg">
          <div className="inline-block min-w-full align-middle">
            <AddTicket onTicketAdded={handleTicketAdded} />
            <div className="col-span-9 mt-4 overflow-hidden shadow sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
  <thead className="bg-gray-50 dark:bg-gray-700">
    <tr>
      <th
        scope="col"
        className="p-4 text-left text-xs font-medium uppercase tracking-wider text-black dark:text-white"
      >
        Ticket Name
      </th>
      <th
        scope="col"
        className="p-4 text-left text-xs font-medium uppercase tracking-wider text-black dark:text-white"
      >
        Price
      </th>
      <th
        scope="col"
        className="p-4 text-left text-xs font-medium uppercase tracking-wider text-black dark:text-white"
      >
        Status
      </th>
      {/* <th
        scope="col"
        className="p-4 text-left text-xs font-medium uppercase tracking-wider text-black dark:text-white"
      >
        Event Associated
      </th> */}
      <th
        scope="col"
        className="p-4 text-left text-xs font-medium uppercase tracking-wider text-black dark:text-white"
      >
        Actions
      </th>
    </tr>
  </thead>
  <tbody className="bg-white dark:bg-gray-800">
    {tickets.map((ticket) => (
      <tr key={ticket._id} role="row">
        <td
          role="cell"
          className="whitespace-nowrap p-4 text-sm font-normal text-gray-900 dark:text-white"
        >
          <p className="font-bold">{ticket.name}</p>
        </td>
        <td
          role="cell"
          className="whitespace-nowrap p-4 text-sm font-normal text-black dark:text-gray-400"
        >
          <p>{ticket.price} DT</p>
        </td>
        <td
          role="cell"
          className="whitespace-nowrap p-4 text-sm font-normal text-black dark:text-gray-400"
        >
          <p>{ticket.status}</p>
        </td>
        {/* <td
          role="cell"
          className="whitespace-nowrap p-4 text-sm font-normal text-black dark:text-gray-400"
        >
          {events.find((event) => event._id === ticket.eventId)?.name || "Unknown Event"}
        </td> */}
        <td className="whitespace-nowrap p-4">
          <IconButton
            aria-describedby={selectedTicket ? "popover" : undefined}
            onClick={(e) => handlePopoverOpen(e, ticket)}
          >
            <BiDotsVerticalRounded />
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
                onClick={handleDetailsClick}
              >
                Details
              </Button>
              <Button
                startIcon={<MdEdit />}
                //onClick={handleEditClick}
              >
                Edit
              </Button>
              <Button
                startIcon={<MdDelete />}
                onClick={handleDeleteClick}
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
    </>
  );
};

export default TicketsList;
