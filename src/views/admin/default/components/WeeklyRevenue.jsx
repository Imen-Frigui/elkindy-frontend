import React, { useState, useEffect } from 'react';
import Card from "components/card";
import BarChart from "components/charts/BarChart";
import { fetchMonthlyEventCount } from '../../../../services/event/eventService';
import { MdBarChart } from "react-icons/md";

const WeeklyRevenue = () => {
  const [eventData, setEventData] = useState({
    labels: [],
    datasets: [{ data: [] }],
  });

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

  return (
    <Card extra="flex flex-col bg-white w-full rounded-3xl py-6 px-2 text-center">
      <div className="mb-auto flex items-center justify-between px-6">
        <h2 className="text-lg font-bold text-navy-700 dark:text-white">
        Monthly Events Count
                </h2>
        <button className="!linear z-[1] flex items-center justify-center rounded-lg bg-lightPrimary p-2 text-brand-500 !transition !duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10">
          <MdBarChart className="h-6 w-6" />
        </button>
      </div>

      <div className="md:mt-16 lg:mt-0">
        <div className="h-[250px] w-full xl:h-[350px]">
          <BarChart chartData={eventData} />
        </div>
      </div>
    </Card>
  );
};

export default WeeklyRevenue;
