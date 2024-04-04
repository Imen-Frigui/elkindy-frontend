import React, { useState, useEffect } from "react";
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button, Typography, Input, Select } from "@material-tailwind/react";
import { IoTicketOutline } from "react-icons/io5";
import { MdAttachMoney } from "react-icons/md";
import { fetchEvents , updateEvent , fetchEventById} from "../../../services/event/eventService";
import { addTicket } from "../../../services/tickets/ticketService";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const TicketManagementModal = ({ open, onClose }) => {
    
    const initialTicketData = {
        name: "",
        price: "",
        status: "valid",
        ticketType: "General Admission",
        barcode: "",
        quantity: 1,
        eventId: "",
      };


      const initialErrors = {
        name: '',
        price: '',
        barcode: '',
        quantity: '',
        eventId: '',
    };

      const [ticketData, setTicketData] = useState(initialTicketData);
      const [events, setEvents] = useState([]);
      const [errors, setErrors] = useState(initialErrors);
      const [isFormValid, setIsFormValid] = useState(false);
  
      useEffect(() => {
        
        if (open) {
            setTicketData(initialTicketData); 
            setErrors(initialErrors); 
        }
    const fetchEventData = async () => {
      try {
        const eventList = await fetchEvents();
        console.log("Fetched Events:", eventList); 
        setEvents(eventList);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
    };
  
    fetchEventData();
  }, [open]);


  useEffect(() => {
    const hasErrors = Object.values(errors).some(error => error);
    const hasEmptyFields = Object.keys(initialTicketData).some(key => !ticketData[key]);
    setIsFormValid(!hasErrors && !hasEmptyFields);
}, [ticketData, errors]);


  const validateField = (name, value) => {
    let error = '';
    switch (name) {
        case 'name':
            if (!value) error = 'Ticket name is required';
            else if (value.length > 50) error = 'Name must not exceed 50 characters';
            break;
        case 'price':
            if (!value) error = 'Price is required';
            else if (isNaN(value) || value <= 0) error = 'Enter a valid price';
            break;
        case 'barcode':
            if (value.length !== 12) error = 'Barcode should be 12 characters';
            break;
        case 'quantity':
            if (!value || isNaN(value) || value <= 0) error = 'Enter a valid quantity';
            break;
        case 'eventId':
            if (!value) error = 'Selecting an event is required';
            break;
    }
    return error;
};
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error });
    setTicketData({ ...ticketData, [name]: value });
  };


  const handleClose = () => {
    onClose();   
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const hasErrors = Object.values(errors).some(error => error);
        if (hasErrors) {
            toast.error("Please fix the errors before submitting.");
            return;
        }
    try {
      const ticketPayload = {
        ...ticketData,
        event: ticketData.eventId 
      };
      
      const addedTicket = await addTicket(ticketPayload);
      if (addedTicket) {
        onClose();
        toast.success("Ticket created successfully!");
      } else {
        toast.error("Failed to add ticket.");
      }
    } catch (error) {
      console.error("Error adding ticket:", error);
      toast.error("Error adding ticket.");
    }
  };
  
 
  
  return (
    <Dialog open={open} onClose={handleClose} size="md">
  <DialogHeader>
    <div className="flex items-center justify-center">
      <h3 className="text-lg font-bold text-center mr-2">Manage Tickets Section</h3>
      <IoTicketOutline className="text-lg" />
    </div>
  </DialogHeader>
  <DialogBody className="flex flex-col space-y-4">
    <div className="flex items-center justify-center">
      <h3 className="text-lg font-bold text-center mr-2">Here you Can Manage Efficiently Your Tickets Creation</h3>
      <IoTicketOutline className="text-lg" />
    </div>
    <form onSubmit={handleSubmit}>
      <div className="flex flex-wrap -mx-3 mb-4">
        <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Ticket Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={handleInputChange}
            value={ticketData.name}
            className={`mt-1 p-2 border rounded-md w-full ${errors.name ? 'border-red-500' : ''}`}

          />
        {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}

        </div>
        <div className="w-full md:w-1/2 px-3 relative">
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MdAttachMoney className="text-gray-400 mt-6 ml-4" />
          </div>
          <input
            type="number"
            id="price"
            name="price"
            className={`mt-1 p-2 border rounded-md w-full ${errors.price ? 'border-red-500' : ''}`}
            onChange={handleInputChange}
            value={ticketData.price}
          />
         {errors.price && <span className="text-red-500 text-sm">{errors.price}</span>}

        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-4">
        <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            id="status"
            name="status"
            className="mt-1 p-2 border rounded-md w-full"
            onChange={handleInputChange}
            value={ticketData.status}
            required
          >
            <option value="valid">Valid</option>
            <option value="expired">Expired</option>
            <option value="canceled">Canceled</option>
          </select>
        </div>
        <div className="w-full md:w-1/2 px-3">
          <label htmlFor="ticketType" className="block text-sm font-medium text-gray-700">
            Ticket Type
          </label>
          <select
            id="ticketType"
            name="ticketType"
            className="mt-1 p-2 border rounded-md w-full"
            onChange={handleInputChange}
            value={ticketData.ticketType}
            required
          >
            <option value="General Admission">General Admission</option>
            <option value="VIP">VIP</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="barcode" className="block text-sm font-medium text-gray-700">
          BarCode
        </label>
        <input
          type="text"
          id="barcode"
          name="barcode"
          className={`mt-1 p-2 border rounded-md w-full ${errors.barcode ? 'border-red-500' : ''}`}
          onChange={handleInputChange}
          value={ticketData.barcode}
        />
                 {errors.barcode && <span className="text-red-500 text-sm">{errors.barcode}</span>}

      </div>
      <div className="mb-4">
        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
          Number of Tickets
        </label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          className={`mt-1 p-2 border rounded-md w-full ${errors.quantity ? 'border-red-500' : ''}`}
          min="1"
          onChange={handleInputChange}
          value={ticketData.quantity}
        />
                         {errors.quantity && <span className="text-red-500 text-sm">{errors.quantity}</span>}

      </div>
      <div className="mb-4">
        <label htmlFor="eventId" className="block text-sm font-medium text-gray-700">
          Here you can Select the Specific Event For Those Tickets 
        </label>
        <select
          id="eventId"
          name="eventId"
          className={`mt-1 p-2 border rounded-md w-full ${errors.eventId ? 'border-red-500' : ''}`}
          onChange={handleInputChange}
          value={ticketData.eventId}
        >
          <option value="">Select an event</option>
          {events.length > 0 &&
            events.map((event) => (
              <option key={event._id} value={event._id}>
                {event.title}
              </option>
            ))}
        </select>
        {errors.eventId && <span className="text-red-500 text-sm">{errors.eventId}</span>}

      </div>
      <DialogFooter>
        <Button  onClick={onClose} className="mr-2 focus:shadow-outline rounded-lg border border-gray-200 bg-yellow-500 font-bold text-white hover:bg-yellow-600 focus:outline-none">
          Cancel
        </Button>
        <Button  type="submit" 
        className="ml-2 focus:shadow-outline rounded-lg border border-gray-200 bg-blue-500 font-bold text-white hover:bg-blue-600 focus:outline-none"
        disabled={!isFormValid}
        >
          Confirm
        </Button>
      </DialogFooter>
    </form>
  </DialogBody>
</Dialog>
  );
};

export default TicketManagementModal;
