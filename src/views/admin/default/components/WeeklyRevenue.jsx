import React, { useState, useEffect } from 'react';
import Card from "components/card";
import BarChart from "components/charts/BarChart";
import { fetchMonthlyEventCount } from '../../../../services/event/eventService';
import { MdBarChart } from "react-icons/md";
import axios from "axios"; 

const WeeklyRevenue = () => {
  const [eventData, setEventData] = useState({
    labels: [],
    datasets: [{ data: [] }],
  });

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchEventsCount = async () => {
      try {
        const monthlyEventCount = await fetchMonthlyEventCount();
        const labels = monthlyEventCount.map(item => `${item.month} ${item.year}`);
        const data = monthlyEventCount.map(item => item.count);
        setEventData({ labels, datasets: [{ data }] });
      } catch (error) {
        console.error("Failed to fetch events count:", error);
      }
    };

    fetchEventsCount();
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

  return (
    <Card extra="flex flex-col bg-white h-full w-full rounded-3xl py-6 px-2 text-center">
      <div className="mb-auto mt-0 flex h-full  items-center justify-between px-6">
        <h2 className="text-lg mx-0 font-bold text-navy-700 dark:text-white">
        Monthly Events Count
                </h2>
        <button className="!linear z-[1] flex items-center justify-center rounded-lg bg-lightPrimary p-2 text-brand-500 !transition !duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10">
          <MdBarChart className="h-6 w-6" />
        </button>
      </div>

      <div className="md:mt-16 h-full lg:mt-0">
        <div className=" h-full  w-full ">
          <BarChart chartData={eventData} />
        </div>
      </div>
    </Card>
  );
};

export default WeeklyRevenue;
