import React, { useEffect, useState } from "react";
import { getFeedbacks } from '../../../../services/feedback/feedbackService';
import { fetchEventById } from '../../../../services/event/eventService';
import PieChart from "components/charts/PieChart";
import { GrFormPreviousLink, GrFormNextLink } from 'react-icons/gr';
import { GrScorecard } from "react-icons/gr";
import axios from "axios";  
import {
  MdArrowDropUp,
  MdOutlineCalendarToday,
  MdBarChart,
} from "react-icons/md";
import { FaChartPie } from "react-icons/fa";
import { AiOutlineDotChart } from "react-icons/ai";
import Card from "components/card";
import {
  lineChartDataTotalSpent,
  lineChartOptionsTotalSpent,
} from "variables/charts";
import LineChart from "components/charts/LineChart";

const TotalSpent = () => {

  const [eventDetails, setEventDetails] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2; 
  const staticEventId = "660b1ae86f1883ba4168298e"; 
  // const staticEventId = "65f37c7d16a359849e0e1eeb"; 
  const [userData, setUserData] = useState(null);

  const indexOfLastFeedback = currentPage * itemsPerPage;
  const indexOfFirstFeedback = indexOfLastFeedback - itemsPerPage;
  const currentFeedbacks = feedbacks.slice(indexOfFirstFeedback, indexOfLastFeedback);

  const handlePreviousPage = () => {
    setCurrentPage(currentPage > 1 ? currentPage - 1 : currentPage);
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(feedbacks.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageNumberClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  
  const getSentimentDetails = (score) => {
    if (score > 0.5) {
      return { text: "largely positive", color: "blue" };
    } else if (score <= 0.1) {
      return { text: "mostly negative", color: "red" };
    } else {
      return { text: "neutral", color: "orange" };
    }
  }

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const event = await fetchEventById(staticEventId);
        setEventDetails(event);
        const fetchedFeedbacks = await getFeedbacks(staticEventId);
        setFeedbacks(fetchedFeedbacks);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await axios.get('http://localhost:3000/api/auth/validateSession', config);
        setUserData(response.data);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    if (!userData) {
      fetchUserData();
    }
  }, [userData]);

  const isAdmin = userData?.user?.role === 'admin';

  if (!isAdmin) {
    return null; 
  }

  // const pieChartOptions = {
  //   responsive: [{
  //     breakpoint: 480,
  //     options: {
  //       chart: {
  //         width: 200
  //       },
  //       legend: {
  //         position: 'bottom'
  //       }
  //     }
  //   }]
  // };

  const preparePieData = () => {
    let positive = 0;
    let negative = 0;
    let neutral = 0;
    feedbacks.forEach(feedback => {
      const sentiment = feedback.sentiment;
      if (sentiment > 0.5) positive++;
      else if (sentiment <= 0.1) negative++;
      else neutral++;
    });
    return [negative, positive, neutral];
  };

  return (
    // <Card extra="!p-[20px] text-center">
    //   <div className="flex justify-between">
    //     <button className="linear mt-1 flex items-center justify-center gap-2 rounded-lg bg-lightPrimary p-2 text-gray-600 transition duration-200 hover:cursor-pointer hover:bg-gray-100 active:bg-gray-200 dark:bg-navy-700 dark:hover:opacity-90 dark:active:opacity-80">
    //       <MdOutlineCalendarToday />
    //       <span className="text-sm font-medium text-gray-600">This month</span>
    //     </button>
    //     <button className="!linear z-[1] flex items-center justify-center rounded-lg bg-lightPrimary p-2 text-brand-500 !transition !duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10">
    //       <MdBarChart className="h-6 w-6" />
    //     </button>
    //   </div>

    //   <div className="flex h-full w-full flex-row justify-between sm:flex-wrap lg:flex-nowrap 2xl:overflow-hidden">
    //     <div className="flex flex-col">
    //       <p className="mt-[20px] text-3xl font-bold text-navy-700 dark:text-white">
    //         $37.5K
    //       </p>
    //       <div className="flex flex-col items-start">
    //         <p className="mt-2 text-sm text-gray-600">Total Spent</p>
    //         <div className="flex flex-row items-center justify-center">
    //           <MdArrowDropUp className="font-medium text-green-500" />
    //           <p className="text-sm font-bold text-green-500"> +2.45% </p>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="h-full w-full">
    //       <LineChart
    //         options={lineChartOptionsTotalSpent}
    //         series={lineChartDataTotalSpent}
    //       />
    //     </div>
    //   </div>
    // </Card>
    <Card extra="!p-[20px] text-center">
    <div className="flex justify-between">
      <button className="linear mt-1 flex items-center justify-center gap-2 rounded-lg bg-lightPrimary p-2 text-gray-600 transition duration-200 hover:cursor-pointer hover:bg-gray-100 active:bg-gray-200 dark:bg-navy-700 dark:hover:opacity-90 dark:active:opacity-80">
      <FaChartPie />
        <span className="text-sm font-medium text-gray-600 font-bold">Feedback Dashboard Sentiment Analysis For Event: {eventDetails ? eventDetails.title : 'Loading...'}</span>
      </button>
      <button className="!linear z-[1] flex items-center justify-center rounded-lg bg-lightPrimary p-2 text-brand-500 !transition !duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10">
        <AiOutlineDotChart className="h-6 w-6" />
      </button>
    </div>
    <PieChart 
        series={preparePieData()} 
        options={{
          chart: {
            width: 380,
            type: 'pie'
          },
          colors: ['#FF4560', '#1679AB', '#FF8A08'],
          labels: ['Negative', 'Positive', 'Neutral'],
          legend: {
            position: 'bottom'
          },
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: 'bottom'
              }
            }
          }]
        }} 
      />
    
    {currentFeedbacks.length > 0 ? (
        currentFeedbacks.map((feedback, index) => (
          <div key={index}>
<p className="font-bold animate-bounce">
<p className="font-bold flex items-center">
  <GrScorecard className="mr-2" />
  <strong>Overall Sentiment Score:</strong>
  <span style={{ color: feedback.sentiment > 0.5 ? 'green' : 'inherit' }}>
    {feedback.sentiment?.toFixed(2) || "N/A"}
  </span>
</p>
</p>          
  <ul>
              <li><strong>Best Part:</strong> {feedback.detailedSentiments?.bestPart?.toFixed(2) || "N/A"}</li>
              <li><strong>Improvements:</strong> {feedback.detailedSentiments?.improvements?.toFixed(2) || "N/A"}</li>
              <li><strong>Final Comments & Feedbacks:</strong> {feedback.detailedSentiments?.finalComments?.toFixed(2) || "N/A"}</li>
            </ul>
            <div style={{ marginTop: "10px", fontSize: "16px", color: "#555" }}>
              <h3>Sentiment Score Interpretation:</h3>
              <p style={{ color: getSentimentDetails(feedback.sentiment).color }}>
                A score of {feedback.sentiment?.toFixed(2)} indicates that feedback is {getSentimentDetails(feedback.sentiment).text}.
              </p>
            </div>
          </div>
        ))
      ) : <p>No feedback available for this event.</p>}
     
    {/* Pagination Controls */}
<div className="mt-4 flex items-center justify-center gap-4">
  <button
    onClick={handlePreviousPage}
    disabled={currentPage === 1}
    className={`flex items-center gap-2 rounded-full px-4 py-2 text-white transition-colors ${
      currentPage === 1 ? "cursor-not-allowed bg-gray-300" : "bg-[#f6a12d] hover:bg-blue-500"
    }`}
  >
    <GrFormPreviousLink />
    Previous
  </button>

  {Array.from(
    { length: Math.ceil(feedbacks.length / itemsPerPage) },
    (_, i) => i + 1
  ).map((pageNumber) => (
    <button
      key={pageNumber}
      onClick={() => handlePageNumberClick(pageNumber)}
      className={`flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors ${
        currentPage === pageNumber ? "bg-blue-500" : "bg-[#f6a12d] hover:bg-blue-500"
      }`}
    >
      {pageNumber}
    </button>
  ))}

  <button
    onClick={handleNextPage}
    disabled={currentPage === Math.ceil(feedbacks.length / itemsPerPage)}
    className={`flex items-center gap-2 rounded-full px-4 py-2 text-white transition-colors ${
      currentPage === Math.ceil(feedbacks.length / itemsPerPage) ? "cursor-not-allowed bg-gray-300" : "bg-[#f6a12d] hover:bg-blue-500"
    }`}
  >
    Next
    <GrFormNextLink />
  </button>
</div>
  </Card>
  );
};

export default TotalSpent;
