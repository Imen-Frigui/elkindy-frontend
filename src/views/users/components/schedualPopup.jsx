import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ScheduleSelector from 'react-schedule-selector';
import Loader from 'components/button/Loader';

const ScheduleComponentpopup = ({ userData, onClose }) => { 
      const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false); // State to track submission status

  useEffect(() => {
    fetchAvailability();
  }, []);

  const userid = userData._id;

  const fetchAvailability = async () => {
    console.log(userid);
    try {
      const response = await axios.get(`https://elkindy-backend.onrender.com/api/users/${userid}/availability`);
      setSchedule(response.data.availability);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching availability:', error);
      // Handle error (e.g., display error message)
    }
  };

  const handleChange = newSchedule => {
    setSchedule(newSchedule);
    setSubmitted(false); // Reset submission status when schedule is changed
  };

  const handleSubmit = async () => {
    try {
      await axios.post(`https://elkindy-backend.onrender.com/api/users/${userid}/addAvailability`, { availability: schedule });
      setSubmitted(true); // Update submission status upon successful submission
      alert('Schedule updated successfully!');
    } catch (error) {
      console.error('Error updating schedule:', error);
      alert('An error occurred while updating the schedule.');
    }
  };

  const handlePopupClose = () => {
    onClose(); // Close the popup
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg">
        <h1 className="text-center text-xl mb-4 font-medium">Change User Schedule</h1>
        <ScheduleSelector
          hoveredColor='orange'
          numDays={7}
          dateFormat='dddd'
          selection={schedule}
          onChange={handleChange}
        />
        <button
          onClick={handleSubmit}
          className={`mt-5 w-full bg-kindyorange py-3 text-base font-medium text-white rounded-full hover:bg-transparent hover:border-kindyorange hover:border-2 hover:text-blue-700 border-2 border-white ${submitted ? 'cursor-not-allowed opacity-50' : ''}`}
          disabled={submitted}
        >
          {submitted ? 'Schedule Submitted' : 'Submit Schedule'}
        </button>
        <button
          onClick={handlePopupClose}
          className="block mx-auto mt-4 bg-gray-300 text-gray-700 px-2 py-1 rounded-md hover:bg-gray-400 focus:outline-none focus:bg-gray-400"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ScheduleComponentpopup;
