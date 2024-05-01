import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ScheduleSelector from 'react-schedule-selector';
import Loader from 'components/button/Loader';

const ScheduleComponent = ({userData}) => {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(true); // State to track submission status

  useEffect(() => {
    fetchAvailability();
  }, []);
const userid = userData._id;

  const fetchAvailability = async () => {
    console.log(userid)
    try {
      const response = await axios.get(`http://localhost:3000/api/users/${userid}/availability`);
      setSchedule(response.data.availability);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching availability:', error);
    }
  };

  const handleChange = newSchedule => {
    setSchedule(newSchedule);
    setSubmitted(false); // Reset submission status when schedule is changed
  };

  const handleSubmit = async () => {
    try {
      await axios.post(`http://localhost:3000/api/users/${userid}/addAvailability`, { availability: schedule });
      setSubmitted(true); // Update submission status upon successful submission
      //alert('Schedule updated successfully!');
    } catch (error) {
      console.error('Error updating schedule:', error);
     // alert('An error occurred while updating the schedule.');
    }
  };

  if (loading) {
    return <div><Loader></Loader></div>;
  }

  return (
    <div>
      <h1 className="mx-25 font-medium"> Choose Your Schedule</h1>
      <ScheduleSelector
      hoveredColor='orange'
      numDays={7}
      hourlyChunks={.5}

      minTime={12}
      maxTime={20}
      dateFormat='dddd'
        selection={schedule}
        onChange={handleChange}
      />
  <button
  onClick={handleSubmit}
  className={`mt-5 bg-kindyorange py-2 px-4 text-sm font-medium text-white rounded-tl-3xl rounded-br-3xl hover:bg-transparent hover:border-kindyorange hover:border-2 hover:text-blue-700 border-2 border-white/0 hover:bg-white/0 hover:text-kindyorange ${submitted ? 'cursor-not-allowed opacity-50' : ''}`}
  disabled={submitted} // Disable button if already submitted
>
  {submitted ? 'Schedule Submitted' : 'Submit Schedule'}
</button>

    </div>
  );
};

export default ScheduleComponent;
