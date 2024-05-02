import React, { useState, useEffect, useMemo } from 'react';
import Card from "components/card";
import defaultEventImage from "assets/img/music.jpg";
import nodatafoundImage from "assets/img/nodatafound.png";
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaUsers, FaMusic } from "react-icons/fa";
import { MdAccessTimeFilled } from "react-icons/md";
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react";
import { GiTakeMyMoney } from "react-icons/gi";
import { IoTicketSharp , IoSearch} from "react-icons/io5";
import { GoAlertFill } from "react-icons/go";
import { IoMdSearch } from "react-icons/io";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './paymentform';
import { FaHandPointRight , FaEye, FaEyeSlash} from "react-icons/fa"; 
import { FaMapLocationDot } from "react-icons/fa6";
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51Mg75HLu7B1VCpQ0b4ZgPWHNSD6CMyopve92ZdRjRiAdyxQ4QXQnTs9ekK7Txt2oy5ktSM0X95mW3Jj9nIeZFqq100UazJdpTy');

const HistoryCard = ({ events , handleReservationSubmit , handleParticipationSubmit ,onLocationSearch }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [open, setOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [bookingMode, setBookingMode] = useState(false); 
  const [isCommunityMember, setIsCommunityMember] = useState(null); 
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false); 
  const [searchQuery, setSearchQuery] = useState('');
  const [participationMode, setParticipationMode] = useState(false);
  const [participationFormData, setParticipationFormData] = useState({username: '', email: ''});
  const [isFormValid, setFormValid] = useState(false);
  const [errors, setErrors] = useState({ username: '',email: '' });

  const [reservationFormData, setReservationFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    ticketType: '',
    ticketCount: 1, 
    isGuest: true, 
  });
  

  const resetForm = () => {
    setReservationFormData({
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      ticketType: '',
      ticketCount: 1, 
      isGuest: true,
    });
    // setIsFormTouched(false);
    // setErrors({});
  };

  const resetParticipationForm = () => {
    setParticipationFormData({
      username: '',
      email: '',
    });
  };

  const handleMoreInfoClick = (event) => {
    setSelectedEvent(event);
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
    // setIsFormTouched(false);
    // setErrors({}); 
    resetForm();
    resetParticipationForm(); 

  };

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const today = new Date();
  // Sort events by date but do not filter them here
  const sortedEvents = useMemo(() => {
    return events
      .filter(event => ["Scheduled", "Active", "Postponed"].includes(event.status))
      .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
  }, [events]);

 
  const upcomingEvents = sortedEvents.filter(event => new Date(event.startDate) >= today);

  // Decide which events to show based on 'showAll'
  const visibleEvents = showAll ? sortedEvents : upcomingEvents.slice(0, 2);


  const renderActionButton = (eventType, event) => {
    switch (eventType) {
      case "Charity Concert":
        return (
          <Button
            className="bg-customOrange text-white"
            onClick={() => handleBookNow(event)}
          >
            Book Now
          </Button>
        );
      case "Final Year Party":
      case "Other":
        return (
          <Button
            className="bg-kindydarkblue text-white"
          onClick={() => handleParticipateClick(event)}
          >
            Participate
          </Button>
        );
      default:
        return null;
    }
  };

  const handleBookNow = (event) => {
    console.log("Initiate booking for event:", event);
    setBookingMode(true);
    setShowPaymentForm(false);
    // setIsFormTouched(false);
    // setErrors({}); 
    resetForm();
    setReservationFormData(prevData => ({
      ...prevData,
      event: event._id
    }));
  };

  const validateForm = () => {
    let isValid = true;
    let errors = { username: '', email: '' };
  
   // Username length validation
  if (!participationFormData.username || participationFormData.username.length > 20) {
    errors.username = 'Username cannot be empty or longer than 20 characters.';
    isValid = false;
  }

  // Email format validation
  if (!participationFormData.email || !/^\S+@\S+\.\S+$/.test(participationFormData.email)) {
    errors.email = 'Please enter your account \'s email address.';
    isValid = false;
  }

  setErrors(errors);
  return isValid;
};

  const handleParticipateClick = (event) => {
    setSelectedEvent(event);
    setParticipationMode(true);
    resetForm();
  };

  const handleSubmitParticipation = async (event) => {
    event.preventDefault();
  
     // Clear previous errors
  setErrors({ username: '', email: '' });

  // Validate form before submission
  if (!validateForm()) {
    return; 
  }
  try {
    await handleParticipationSubmit({
      username: participationFormData.username,
      email: participationFormData.email,
      eventId: selectedEvent._id,
    });
    resetParticipationForm();
    setParticipationMode(false);
    setOpen(false);
    toast.success("Participation confirmed. Check your email for more details!");
  } catch (error) {
    console.error("Error in participation:", error);
    toast.error("Participation failed. Please try again.");
  }
};
  // const handleSubmitParticipation = async (event) => {
  //   event.preventDefault();
  
  //   const participationData = {
  //     username: participationFormData.username,
  //     email: participationFormData.email,
  //     eventId: selectedEvent._id, 
  //   };
  
  //   try {
  //     await handleParticipationSubmit(participationData);
  //     toast.success("Participation confirmed. Check your email for details!");
  //     setParticipationMode(false);
  //     setOpen(false); 
  //     resetParticipationForm();
  //   } catch (error) {
  //     console.error("Error in participation:", error);
  //     toast.error("Participation failed. Please try again.");
  //   }
  // };

  const handleCancelBooking = () => {
    console.log("Booking canceled");
    setBookingMode(false); 
    setShowPaymentForm(false);
    // setIsFormTouched(false);
    // setErrors({}); 
    resetForm();

  };

  const handleIsCommunityMemberChange = (event) => {
    const isCommunityMember = event.target.value === 'true';
    setIsCommunityMember(isCommunityMember);
    setReservationFormData(prevData => ({
      ...prevData,
      isGuest: !isCommunityMember
    }));  
  
  };


  const handleReservationFormChange = (event) => {
    // setIsFormTouched(true);
    const { name, value } = event.target;
    setReservationFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

//   const handleBlur = (name) => {
//     setIsFormTouched(true);
//     validateForm(name);
// };

  const handleSubmitReservation = async (event) => {
    event.preventDefault();
    setIsLoading(true); 

  //   if (!validateForm()) {
  //     toast.error("Please correct the errors in the form.");
  //     return;
  // }
    try {
        await handleReservationSubmit({
            ...reservationFormData,
            event: selectedEvent._id
        });
        // Close the modal and reset the form
        setIsLoading(false); // Stop loading
        setBookingMode(false);
        setOpen(false);
        setReservationFormData({
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            ticketType: '',
            ticketCount: 1, 
            isGuest: true,
        });
        toast.success("Congrats! Your reservation is confirmed. Check your Email to get your ticket ! and Get ready for an unforgettable experience!");
      } catch (error) {
        console.error("Error in reservation:", error);
        toast.error("Reservation failed. Please try again.");
        setIsLoading(false); 
    }
 };
//   if (!isFormTouched) {
//     return true;
// }
//   let newErrors = {};
//   let formIsValid = true;

// // First Name Validation
// if (!reservationFormData.firstName) {
//   formIsValid = false;
//   newErrors["firstName"] = "*First Name is required.";
// } else if (reservationFormData.firstName.length > 10) {
//   formIsValid = false;
//   newErrors["firstName"] = "*First Name must not exceed 10 characters.";
// } else if (/[^a-zA-Z]/.test(reservationFormData.firstName)) {
//   formIsValid = false;
//   newErrors["firstName"] = "*First Name should not contain special characters.";
// }

//  // Last Name Validation
//   if (!reservationFormData.lastName) {
//     formIsValid = false;
//     newErrors["lastName"] = "*Last Name is required.";
//   } else if (reservationFormData.lastName.length > 10) {
//     formIsValid = false;
//     newErrors["lastName"] = "*Last Name must not exceed 10 characters.";
//   } else if (/[^a-zA-Z]/.test(reservationFormData.lastName)) {
//     formIsValid = false;
//     newErrors["lastName"] = "*Last Name should not contain special characters.";
//   }

// // Email Validation
// if (!reservationFormData.email) {
//   formIsValid = false;
//   newErrors["email"] = "*Email is required.";
// } else if (!/\S+@\S+\.\S+/.test(reservationFormData.email)) {
//   formIsValid = false;
//   newErrors["email"] = "*Email is not valid.";
// }

// // Phone Number Validation
// if (!reservationFormData.phoneNumber) {
//   formIsValid = false;
//   newErrors["phoneNumber"] = "*Phone Number is required.";
// } else if (!/^\d{1,8}$/.test(reservationFormData.phoneNumber)) {
//   formIsValid = false;
//   newErrors["phoneNumber"] = "*Phone Number must not exceed 8 digits.";
// }

// // Ticket Count Validation
// if (reservationFormData.ticketCount < 1 || reservationFormData.ticketCount > 5) {
//   formIsValid = false;
//   newErrors["ticketCount"] = "*Ticket count must be between 1 and 5.";
// }

// // Ticket Type Validation
// if (!reservationFormData.ticketType) {
//   formIsValid = false;
//   newErrors["ticketType"] = "*Ticket Type must be selected.";
// }

// // Phone Number Validation
// if (!reservationFormData.phoneNumber) {
//   formIsValid = false;
//   newErrors["phoneNumber"] = "*Phone Number is required.";
// } else if (!/^[0-9]{1,8}$/.test(reservationFormData.phoneNumber)) {
//   formIsValid = false;
//   newErrors["phoneNumber"] = "*Phone Number must be a number and not exceed 8 digits.";
// }


//  // Username Validation (for community members)
//  if (isCommunityMember && !reservationFormData.username) {
//   formIsValid = false;
//   newErrors["username"] = "*Username is required.";
// }

// // Password Validation - required check only (for community members)
// if (isCommunityMember && !reservationFormData.password) {
//   formIsValid = false;
//   newErrors["password"] = "*Password is required.";
// }

//  // Email Validation - ensure it's a valid email format
//  if (isCommunityMember && !reservationFormData.email) {
//   formIsValid = false;
//   newErrors["email"] = "*Email is required.";
// } else if (!/\S+@\S+\.\S+/.test(reservationFormData.email)) {
//   formIsValid = false;
//   newErrors["email"] = "*Email is not valid.";
// }

// // Role Validation (for community members)
// if (isCommunityMember && !reservationFormData.role) {
//   formIsValid = false;
//   newErrors["role"] = "*Role is required.";
// }

//   // Set new errors
//   setErrors(newErrors);
//   return formIsValid;
// };

// useEffect(() => {
//   validateForm();
// }, [reservationFormData]);

const handleShowPaymentForm = (paymentMethod) => {
  setShowPaymentForm(true);
};

// Function to handle successful payment
const handlePaymentSuccess = () => {
  toast.success("Payment successful!");
  setShowPaymentForm(false); 
  setOpen(false); 
};

const handleProceedLater = () => {
  setShowPaymentForm(false); 
  setBookingMode(true);
};

const filteredEvents = useMemo(() => {
  if (!searchQuery) return showAll ? sortedEvents : upcomingEvents.slice(0, 2);

  // Now we filter the entire sortedEvents array based on the search query
  return sortedEvents.filter(event =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.eventType.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.startDate.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.endDate.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.startTime.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.endTime.toLowerCase().includes(searchQuery.toLowerCase()) 

  );
}, [sortedEvents, upcomingEvents, searchQuery, showAll]); 

const handleLocationClick = (address) => {
  if (onLocationSearch) {
      onLocationSearch(address);
  }
};

const togglePasswordVisibility = () => {
  setShowPassword(!showPassword);
};

useEffect(() => {
  setFormValid(validateForm());
}, [participationFormData.username, participationFormData.email]);

  return (
    <>
    <ToastContainer position="top-center" />
    <Card extra={"mt-3 !z-5 overflow-hidden"} className="bg-[#F7F5EF]">
      <div className="flex items-center justify-between rounded-t-3xl p-3">
      <h1 className="text-2xl font-bold animate-bounce">Upcoming Events</h1>
    {/* Search Bar */}
    <div className="flex items-center">
  <div className="flex">
    <input
      type="text"
      placeholder="Search for your desired event..."
      className="h-10 rounded-l-md border border-gray-300 px-3 py-2 w-64" 
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  </div>
  <button
    className="h-10 bg-gray-200 p-2 rounded-r-md"
    style={{ backgroundColor: "rgb(0, 107, 190)" }}
  >
    <IoMdSearch style={{ color: "white" }} />
  </button>
</div>
        
        {/* Show the 'Show More' button only if there are more than two upcoming events and 'showAll' is false */}
        {upcomingEvents.length > 0 &&  (
          <button
            className="text-sm text-customOrange"
            onClick={toggleShowAll}
          >
            {showAll ? 'Show Less' : 'Show More'}
          </button>
        )}
      </div>
      <div className="flex justify-center">
      <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
      {/* {visibleEvents.length > 0 ? (
          visibleEvents.map((event, index) => ( */}
        {filteredEvents.length > 0 ? (
         filteredEvents.map((event, index) => (
            <div key={index} className="overflow-hidden rounded-xl bg-white shadow-lg">
              <img
                src={event.image || defaultEventImage}
                alt={event.title}
                className="h-48 w-full object-cover object-center"
              />
              <div className="p-4">
                <h3 className="mb-2 text-xl font-bold">
                  <span className="text-kindydarkblue">Event </span>
                  <span className="text-customOrange">{event.title}</span>
                </h3>
                <p className="text-center text-gray-600">{event.description}</p>
                <div className="mt-2 flex items-center">
                  <FaCalendarAlt className="mr-2 text-customOrange" />
                  <span className="text-kindydarkblue">
                    {new Date(event.startDate).toLocaleDateString("en-US", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="mt-2 flex items-center">
                  <MdAccessTimeFilled className="mr-2 text-customOrange" />
                  <span className="text-kindydarkblue">{event.startTime}</span>
                </div>
               
          
            {event.tickets && (
              <div className="mt-2">
              <h4 className="text-lg font-bold mb-2">Available Tickets For This Event</h4>
              <ul>
      {event.tickets.map((ticket, index) => (
        <li key={index} className="mb-1">
          <div className="flex items-center">
            <span className="font-bold">
            <IoTicketSharp className="mr-2 text-customOrange" />
            </span>
            <span>{ticket.ticketType} Ticket</span>
            <span> , </span>
            <span className="font-bold">
              <GiTakeMyMoney className="mr-2 text-customOrange" />
            </span>
            <span>{ticket.price} TND</span>
          </div>
        </li>
        
      ))}
    </ul>
  </div>
)}
                <div className="flex justify-center mt-4">
                  <button
                    className="bg-transparent border border-kindydarkblue text-kindydarkblue px-4 py-2 rounded-lg hover:bg-kindydarkblue hover:text-white transition-colors"
                    onClick={() => handleMoreInfoClick(event)}
                  >
                    More Info
                  </button>
                </div>
              </div>
              <button 
  onClick={() => handleLocationClick(event.location)}
  className="flex items-center justify-center text-kindyblue px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors"
>
  <FaMapLocationDot  /> 
  &nbsp;&nbsp;  View Location on Map
</button>
            </div>
            
          ))
        ) : (
          <div className="flex items-center justify-center">
            <img
              src={nodatafoundImage}
              alt="No data found"
              className="h-64 w-64"
            />
          </div>
        )}
      </div>
      </div>
      {/* Modal */}
      <Dialog open={open} handler={handleModalClose} size="md">
  <DialogHeader>{selectedEvent?.title || 'Event Details'}</DialogHeader>
  {selectedEvent && !bookingMode && (
    <DialogBody className="flex flex-col space-y-4">
      <h3 className="text-lg font-bold text-center">{selectedEvent.title}</h3>
      <p className="text-center">{selectedEvent.description}</p>
      <div className="flex justify-between">
        <div className="flex items-center">
          <FaCalendarAlt className="text-customOrange" />
          <span className="ml-2">
            Start: {new Date(selectedEvent.startDate).toLocaleDateString()}
          </span>
        </div>
        <div className="flex items-center">
          <FaCalendarAlt className="text-customOrange" />
          <span className="ml-2">
            End: {selectedEvent.endDate ? new Date(selectedEvent.endDate).toLocaleDateString() : 'N/A'}
          </span>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex items-center">
          <FaClock className="text-customOrange" />
          <span className="ml-2">From: {selectedEvent.startTime}</span>
        </div>
        <div className="flex items-center">
          <FaClock className="text-customOrange" />
          <span className="ml-2">To: {selectedEvent.endTime || 'N/A'}</span>
        </div>
      </div>
      <div className="flex items-center">
        <FaMapMarkerAlt className="text-customOrange" />
        <span className="ml-2">{selectedEvent.location || 'N/A'}</span>
      </div>
      <div className="flex items-center">
        <FaUsers className="text-customOrange" />
        <span className="ml-2">Capacity: {selectedEvent.capacity || 'N/A'}</span>
      </div>
      <div className="flex items-center justify-center">
        <FaMusic className="text-customOrange" />
        <span className="ml-2">Type: {selectedEvent.eventType}</span>
      </div>
    </DialogBody>
  )}
  {bookingMode &&  (
  <DialogBody className="flex flex-col space-y-4">
    {showPaymentForm ? (
      // Render the payment form
      <Elements stripe={stripePromise}>
        <PaymentForm
          onSuccessfulPayment={handlePaymentSuccess}
          onProceedLater={handleProceedLater}
        />
      </Elements>
    ) : (
      <>
  <h3 className="text-lg font-bold text-center">Reservation Details</h3>
  <form onSubmit={handleReservationSubmit}>
  <div className="flex items-center justify-center mb-4">
  <label className="mr-4">Do you belong to El Kindy Conservatory community?</label>
  <div className="flex items-center">
    <input
      type="radio"
      id="yes"
      name="isCommunityMember"
      value="true"
      // value={reservationFormData.isGuest}
      onChange={handleIsCommunityMemberChange}
      checked={isCommunityMember === true}
    />
    <label htmlFor="yes" className="ml-2 mr-4">Yes</label>
    <input
      type="radio"
      id="no"
      name="isCommunityMember"
      value="false"
      // value={reservationFormData.isGuest}
      onChange={handleIsCommunityMemberChange}
      checked={isCommunityMember === false}
    />
    <label htmlFor="no" className="ml-2">No (External Guest)</label>
  </div>
</div>
{isCommunityMember && (
  <>
    <div className="flex flex-wrap -mx-3 mb-4">
      <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={reservationFormData.username}
          onChange={handleReservationFormChange}
          className="mt-1 p-2 border rounded-md w-full"
          required
        />
          {/* {errors.username && <div className="text-red-500">{errors.username}</div>} */}

      </div>
      <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={reservationFormData.email}
          onChange={handleReservationFormChange}
          className="mt-1 p-2 border rounded-md w-full"
          required
        />
       {/* {errors.email && <div className="text-red-500">{errors.email}</div>} */}
      </div>
    </div>
    <div className="flex flex-wrap -mx-3 mb-4">
    <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
      Password
    </label>
    <div className="relative">
      <input
        type={showPassword ? 'text' : 'password'}
        id="password"
        name="password"
        value={reservationFormData.password}
        onChange={handleReservationFormChange}
        className="mt-1 p-2 border rounded-md w-full"
        required
      />
      {/* Show password toggle icon */}
      <div
        className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
        onClick={togglePasswordVisibility}
      >
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </div>
    </div>
    {/* {errors.password && <div className="text-red-500">{errors.password}</div>} */}
  </div>
      <div className="w-full md:w-1/2 px-3">
        <label htmlFor="role" className="block text-sm font-medium text-gray-700">
          Select Role
        </label>
        <select
          id="role"
          name="role"
          value={reservationFormData.role}
          onChange={handleReservationFormChange}
          className="mt-1 p-2 border rounded-md w-full"
          required
        >
          {["student", "teacher"].map((role, index) => (
            <option key={index} value={role}>{role}</option>
          ))}
        </select>
        {/* {errors.role && <div className="text-red-500">{errors.role}</div>} */}

      </div>
    </div>
  </>
)}

{!isCommunityMember && (
  <>
    <div className="flex flex-wrap -mx-3 mb-4">
      <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
          First Name
        </label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={reservationFormData.firstName}
          onChange={handleReservationFormChange}
          // onBlur={() => handleBlur('firstName')}
          className="mt-1 p-2 border rounded-md w-full"
          required
        />
      {/* {errors.firstName && <div className="text-red-500">{errors.firstName}</div>} */}
      </div>
      <div className="w-full md:w-1/2 px-3">
        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
          Last Name
        </label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={reservationFormData.lastName}
          onChange={handleReservationFormChange}
          className="mt-1 p-2 border rounded-md w-full"
          required
        />
        {/* {errors.lastName && <div className="text-red-500">{errors.lastName}</div>} */}

      </div>
    </div>
    <div className="flex flex-wrap -mx-3 mb-4">
      <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={reservationFormData.email}
          onChange={handleReservationFormChange}
          className="mt-1 p-2 border rounded-md w-full"
          required
        />
        {/* {errors.email && <div className="text-red-500">{errors.email}</div>} */}

      </div>
      <div className="w-full md:w-1/2 px-3">
        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
          Phone Number
        </label>
        <input
          type="number"
          id="phoneNumber"
          name="phoneNumber"
          value={reservationFormData.phoneNumber}
          onChange={handleReservationFormChange}
          className="mt-1 p-2 border rounded-md w-full"
          required
        />
        {/* {errors.phoneNumber && <div className="text-red-500">{errors.phoneNumber}</div>} */}

      </div>
    </div>
  </>
)}

    <div className="mb-4">
    <label htmlFor="ticketType" className="block text-sm font-medium text-gray-700">
    Select Ticket Type
      </label>
      <select
        id="ticketType"
        name="ticketType"
        value={reservationFormData.ticketType}
        onChange={handleReservationFormChange}
        className="mt-1 p-2 border rounded-md w-full"
        required
      >
        {selectedEvent && selectedEvent.tickets.map((ticket, index) => (
          <option key={index} value={ticket.ticketType}>{ticket.ticketType}</option>
        ))}
      </select>
      {/* {errors.ticketType && <div className="text-red-500">{errors.ticketType}</div>} */}

    </div>
    <div className="mb-4">
      <label htmlFor="ticketCount" className="block text-sm font-medium text-gray-700">
        Number of Tickets
      </label>
      <input
        type="number"
        id="ticketCount"
        name="ticketCount"
        value={reservationFormData.ticketCount}
        onChange={handleReservationFormChange}
        className="mt-1 p-2 border rounded-md w-full"
        min="1"
        required
      />
      {/* {errors.ticketCount && <div className="text-red-500">{errors.ticketCount}</div>} */}
    </div>
    <div>
              <button
                type="button"
                onClick={handleShowPaymentForm}
                className="mt-0 inline-flex items-center px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-700 transition duration-300"
                >
                <FaHandPointRight  />
                &nbsp;&nbsp;Proceed to Payment
              </button>
            </div>

          

{/*    
    <button
      onClick={handleSubmitReservation}
      type="submit"
        className={`px-4 py-2 rounded-md text-white bg-customOrange`}
      // className={`px-4 py-2 rounded-md text-white ${
      //   isFormTouched && !isFormEmpty() && Object.keys(errors).length === 0 
      //   ? 'bg-customOrange' 
      //   : 'bg-orange-300'
      // }`}
      // disabled={!isFormTouched || isFormEmpty() || Object.keys(errors).length > 0}
      >
      Book Now
    </button> */}
    <button
  onClick={handleSubmitReservation}
  type="submit"
  className={`mt-4 px-4 py-2 rounded-md text-white ${isLoading ? 'bg-gray-300' : 'bg-customOrange'}`}
  disabled={isLoading}
>
  {isLoading ? (
    <div className=" flex items-center justify-center">
      {/* Spinner SVG here */}
      <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
      </svg>&nbsp;&nbsp; 
      <span >Processing reservation... please wait!</span>
    </div>
  ) : (
    'Book Now !'
  )}
</button>

  </form>
   </>
   )}
</DialogBody>
  )}
  {/* Modal for Participation */}
  {participationMode && (
  <Dialog open={participationMode} onClose={() => setParticipationMode(false)} size="md">
    <DialogHeader className="text-center ">Participate in {selectedEvent?.title}</DialogHeader>
    <DialogBody className="text-center">
      {/* Alert message */}
      <span className="inline-block align-middle ml-1">
    <GoAlertFill className="text-lg text-orange-500" />
  </span>
      <p className="text-sm text-orange-500 mb-2">
  This participation form is only valid for Elkindy registred users community &nbsp;&nbsp; 
  
</p>
      <form id="participation-form" onSubmit={(event) => handleSubmitParticipation(event)}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Username</label>
          <input
            type="text"
            placeholder="Enter your username"
            className="mt-1 p-2 border rounded-md w-full"
            // className={`mt-1 p-2 border ${errors.username ? 'border-red-500' : ''} rounded-md w-full`}
            value={participationFormData.username}
            onChange={e => setParticipationFormData({ ...participationFormData, username: e.target.value })}
            required
          />
  {errors.username && <p className="text-red-500">{errors.username}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="mt-1 p-2 border rounded-md w-full"
            // className={`mt-1 p-2 border ${errors.email ? 'border-red-500' : ''} rounded-md w-full`}
            value={participationFormData.email}
            onChange={e => setParticipationFormData({ ...participationFormData, email: e.target.value })}
            required
          />
  {errors.email && <p className="text-red-500">{errors.email}</p>}
        </div>
        <div className="mb-4">
          <a href="/auth/register/65db52b1d59f029a2488b527" className="text-sm text-kindydarkblue ">Not registered? Click here to register</a>
        </div>
        <div className="flex justify-between mt-8">
       
          <Button
            className="bg-red-500 text-white px-4 py-2 rounded-md"
            onClick={() => setParticipationMode(false)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className={`bg-kindydarkblue text-white px-4 py-2 rounded-md ${!isFormValid ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={!isFormValid}          >
           Participate Now !
          </Button>
        </div>
      </form>
    </DialogBody>
  </Dialog>
)}

  <DialogFooter>
    {!bookingMode && selectedEvent && renderActionButton(selectedEvent.eventType, selectedEvent)}
    {bookingMode && <Button className="bg-kindydarkblue text-white" onClick={handleCancelBooking}>Cancel Booking</Button>}&nbsp;&nbsp; 
    <Button className="bg-red-500 text-white " onClick={handleModalClose}>Close</Button>
  </DialogFooter>
</Dialog>

    </Card>    
    </>
  );
};

export default HistoryCard;
