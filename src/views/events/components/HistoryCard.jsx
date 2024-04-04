import React, { useState } from "react";
import Card from "components/card";
import nft7 from "assets/img/nfts/Nft7.jpg";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HistoryCard = ({ event , tickets ,reservations, reservationsCount , onDeleteTicket, onDeleteReservation}) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };

  const formatTime = (timeString) => {
    const time = new Date(`1970-01-01T${timeString}`);
    return time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  };
  const handleDelete = (ticketId) => {
    onDeleteTicket(ticketId);
  };

  const SectionHeader = ({ title }) => (
    <h5 className="text-lg font-bold mb-2 text-navy-700 dark:text-white">
      {title}
    </h5>
  );

  const TicketItem = ({ ticket }) => {
    const [openModal, setOpenModal] = useState(false);

    const handleDeleteTicket = () => {
      onDeleteTicket(ticket._id);
      setOpenModal(false);
      toast.success(`Ticket "${ticket.name}" deleted successfully!`);
    };

    return (
      <>
        <div className="flex justify-between items-center p-3 mb-2 bg-gray-50 dark:bg-navy-900 rounded-lg">
          <div>
            <span className="font-bold">Name:</span> {ticket.name}
            <span className="mx-2">|</span>
            <span className="font-bold">Type:</span> {ticket.ticketType}
            <span className="mx-2">|</span>
            <span className="font-bold">Price:</span> {ticket.price} TND
            <span className="mx-2">|</span>
            <span className="font-bold">Status:</span> {ticket.status}
          </div>
          <MdDelete
            onClick={() => setOpenModal(true)}
            className="text-red-600 hover:text-red-800 cursor-pointer"
          />
        </div>
        <Dialog open={openModal} onClose={() => setOpenModal(false)} size="sm">
          <DialogHeader>Confirm Ticket Deletion</DialogHeader>
          <DialogBody>
            Are you sure you want to delete the ticket <strong>{ticket.name}</strong>?
          </DialogBody>
          <DialogFooter>
            <Button variant="gradient" color="green" onClick={() => setOpenModal(false)}>
              Cancel
            </Button>{" "}
            &nbsp;&nbsp;
            <Button variant="gradient" color="red" onClick={handleDeleteTicket}>
              Confirm
            </Button>
          </DialogFooter>
        </Dialog>
      </>
    );
  };

  // const TicketItem = ({ ticket }) => (
  //   <div className="flex justify-between items-center p-3 mb-2 bg-gray-50 dark:bg-navy-900 rounded-lg">
  //     <div>
  //       <span className="font-bold">Name:</span> {ticket.name}
  //       <span className="mx-2">|</span>
  //       <span className="font-bold">Type:</span> {ticket.ticketType}
  //       <span className="mx-2">|</span>
  //       <span className="font-bold">Price:</span> {ticket.price} TND
  //       <span className="mx-2">|</span>
  //       <span className="font-bold">Status:</span> {ticket.status}
  //     </div>
  //     <MdDelete onClick={() => onDeleteTicket(ticket._id)} className="text-red-600 hover:text-red-800 cursor-pointer" />
  //   </div>
  // );

  const ReservationItem = ({ reservation }) => {
    const [openModal, setOpenModal] = useState(false);

    const handleDeleteReservation = () => {
      onDeleteReservation(reservation.id);
      setOpenModal(false);
      toast.success(`Reservation deleted successfully!`);

    };
    
    return (
      <>
        <div className="flex justify-between items-center p-3 mb-2 bg-gray-50 dark:bg-navy-900 rounded-lg">
          {/* Reservation details */}
          <div>
            <span className="font-bold">Name:</span> {reservation.name}
            <span className="mx-2">|</span>
            <span className="font-bold">Email:</span> {reservation.email}
            <span className="mx-2">|</span>
            <span className="font-bold">Phone:</span> {reservation.phoneNumber}
            <span className="mx-2">|</span>
            <span className="font-bold">Type:</span> {reservation.ticketType}
            <span className="mx-2">|</span>
            <span className="font-bold">Status:</span> {reservation.status}
          </div>
          <MdDelete onClick={() => setOpenModal(true)} className="text-red-600 hover:text-red-800 cursor-pointer" />
        </div>
        <Dialog open={openModal} onClose={() => setOpenModal(false)} size="sm">
          <DialogHeader>Confirm Reservation Delete</DialogHeader>
          <DialogBody>Are you sure you want to delete this reservation?</DialogBody>
          <DialogFooter>
            <Button variant="gradient" color="green" onClick={() => setOpenModal(false)}>
              Cancel
            </Button> &nbsp;&nbsp; 
            <Button variant="gradient" color="red" onClick={handleDeleteReservation}>
              Confirm
            </Button>
          </DialogFooter>
        </Dialog>
      </>
    );
  };

  // const ReservationItem = ({ reservation  }) => (
  //   <div className="flex justify-between items-center p-3 mb-2 bg-gray-50 dark:bg-navy-900 rounded-lg">
  //     {/* Reservation details */}
  //     <div>
  //       <span className="font-bold">Name:</span> {reservation.name}
  //       <span className="mx-2">|</span>
  //       <span className="font-bold">Email:</span> {reservation.email}
  //       <span className="mx-2">|</span>
  //       <span className="font-bold">Phone:</span> {reservation.phoneNumber}
  //       <span className="mx-2">|</span>
  //       <span className="font-bold">Type:</span> {reservation.ticketType}
  //       <span className="mx-2">|</span>
  //       <span className="font-bold">Status:</span> {reservation.status}
  //     </div>
  //     <MdDelete onClick={() => onDeleteReservation(reservation.id)} className="text-red-600 hover:text-red-800 cursor-pointer" />
  //   </div>
  // );

  return (
    <>
    <ToastContainer position="top-center" />
    <Card extra={"mt-3 !z-5 overflow-hidden"}>
      {/* HistoryCard Header */}
      <div className="flex items-center justify-between rounded-t-3xl p-3">
        <div className="text-lg font-bold text-navy-700 dark:text-white">
          {event ? event.title : "Loading..."}
        </div>
        <button className="linear rounded-[20px] bg-lightPrimary px-4 py-2 text-base font-medium text-brand-500 transition duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:active:bg-white/20">
          See All Details
        </button>
      </div>

      {/* History CardData */}
      {event && (
        <div className="flex flex-col bg-white hover:shadow-2xl dark:!bg-navy-800 dark:shadow-none dark:hover:!bg-navy-700">
          <div className="flex items-center gap-3 p-3">
            <div className="h-40 w-40">
              <img
                className="h-full w-full rounded-xl"
                src={event && event.image ? event.image : nft7}
                alt=""
              />
            </div>
            <div className="flex flex-col">
              <h5 className="text-base font-bold text-navy-700 dark:text-white">
                {event.description}
              </h5>
              <p className="mt-1 text-sm font-normal text-gray-600">
                {event.owner}
              </p>
            </div>
          </div>

          <div className="p-3 flex items-center justify-between text-navy-700 dark:text-white">
            <div className="flex items-center text-sm font-bold text-navy-700 dark:text-white">
              <p>Start Date: {formatDate(event.startDate)}</p>
              <p className="mx-2">-</p>
              <p>End Date: {formatDate(event.endDate)}</p>
            </div>
            <div className="flex items-center text-sm font-bold text-navy-700 dark:text-white">
              <p>Start Time: {formatTime(event.startTime)}</p>
              <p className="mx-2">-</p>
              <p>End Time: {formatTime(event.endTime)}</p>
            </div>
          </div>

          <div className="p-3 flex items-center justify-between text-navy-700 dark:text-white">
            <p>Capacity: {event.capacity}</p>
            <p>Event Type: {event.eventType}</p>
            <p>Location: {event.location}</p>
          </div>
        </div>
        
      )}

<div className="mt-4 px-4 py-3 bg-white dark:bg-navy-800 shadow-md rounded-xl">
        <SectionHeader title="Available Event Tickets" />
        {tickets.length > 0 ? (
          tickets.map(ticket => <TicketItem key={ticket._id} ticket={ticket} />)
        ) : (
          <p>No tickets available.</p>
        )}
        <div className="mt-2 p-3 text-right">
          <span className="text-lg font-semibold text-navy-700 dark:text-white">
            Total Tickets : {tickets.length}
          </span>
        </div>
      </div>



      <div className="mt-4 p-4 bg-white shadow-md rounded-xl border border-gray-200 dark:bg-navy-800 dark:border-gray-700">
  <SectionHeader title="Reservations Section" />
  <div className="mt-2">
    {reservations.slice(0, 5).map(reservation => (
      <ReservationItem key={reservation._id} reservation={reservation}  />
    ))}
  </div>
  <div className="mt-2 p-3 text-right">
          <span className="text-lg font-semibold text-navy-700 dark:text-white">
            Total Reservations : <span className="text-indigo-600 dark:text-indigo-400">{reservationsCount}</span>
          </span>
        </div>
    </div>
    </Card>
    </>
  );
};

export default HistoryCard;
