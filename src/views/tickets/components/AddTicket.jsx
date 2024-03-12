import React, { useState, useEffect } from "react";
import { addTicket } from "../../../services/tickets/ticketService"; 
import ButtonComponent from "../../../components/button/ButtonComponnent";
import SuccessAlert from "../../../components/alert/AlertComponent";

const AddTicket = ({ onTicketAdded }) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [ticketName, setTicketName] = useState("");
    const [ticketPrice, setTicketPrice] = useState("");
    const [ticketStatus, setTicketStatus] = useState("");

    const handleDrawerClose = () => setIsDrawerOpen(false);
  
    const handleAddTicket = async (ticket) => {
      ticket.preventDefault();
      const ticketData = {
        name: ticketName,
        price: ticketPrice,
        status: ticketStatus,
      };
  
      try {
        await addTicket(ticketData);
        onTicketAdded();
        handleDrawerClose();
        // Reset form fields
        setTicketName("");
        setTicketPrice("");
        setTicketStatus("");
      } catch (error) {
        alert("Failed to add ticket");
        console.error(error);
      }
    };
  

    return (
        <>
          <ButtonComponent
            className="mb-3"
            text="Add Ticket"
            color="#006BBE"
            onClick={() => setIsDrawerOpen(true)}
          >
            Add Ticket
          </ButtonComponent>
          {isDrawerOpen && (
            <div
              id="drawer-create-ticket"
              className="fixed top-0 right-0 z-40 h-screen w-full max-w-xs transform-none overflow-y-auto bg-white p-4 transition-transform dark:bg-gray-800"
            >
              <h5
                id="drawer-label"
                className="mb-6 inline-flex items-center text-sm font-semibold uppercase text-gray-500 dark:text-gray-400"
              >
                New Ticket
              </h5>
              <button
                onClick={handleDrawerClose}
                className="bg-transparent absolute top-2.5 right-2.5 inline-flex items-center rounded-lg p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <span>Close</span>
              </button>
              <form onSubmit={handleAddTicket}>
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-medium text-gray-900"
                    >
                     Ticket Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={ticketName}
                      onChange={(t) => setTicketName(t.target.value)}
                      className="focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                      required
                    />
                  </div>
                  <div>
                <label
                  htmlFor="ticket-status"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                 Status
                </label>
                <select
                  id="ticket-status"
                  value={ticketStatus}
                  onChange={(t) => setTicketStatus(t.target.value)}
                  className="focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                  required
                >
                  <option value="valid">Valid</option>
                  <option value="canceled">Canceled</option>
                  <option value="expired">Expired</option>
                </select>
              </div>
                  {/* <div>
                    <label
                      htmlFor="status"
                      className="mb-2 block text-sm font-medium text-gray-900"
                    >
                     Ticket Status
                    </label>
                    <input
                      type="text"
                      id="status"
                      value={ticketStatus}
                      onChange={(t) => setTicketStatus(t.target.value)}
                      className="focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                      required
                    />
                  </div> */}
                  
                  <div>
                    <label
                      htmlFor="price"
                      className="mb-2 block text-sm font-medium text-gray-900"
                    >
                     price
                    </label>
                    <input
                      type="number"
                      id="price"
                      value={ticketPrice}
                      onChange={(t) => setTicketPrice(t.target.value)}
                      className="focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                      required
                    />
                  </div>
                  <div className="flex justify-center space-x-4">
      <button
        type="submit"
        className="focus:ring-primary-300 inline-flex items-center justify-center rounded-lg border border-gray-200 bg-blue-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-600 focus:z-10 focus:outline-none focus:ring-4"
      >
        Add Ticket
      </button>
      <button
        onClick={handleDrawerClose}
        className="focus:ring-primary-300 inline-flex items-center justify-center rounded-lg border border-gray-200 bg-gray-200 px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-300 focus:z-10 focus:outline-none focus:ring-4 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
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

export default AddTicket;



