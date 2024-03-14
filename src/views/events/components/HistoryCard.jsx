import React from "react";
import Card from "components/card";
import nft7 from "assets/img/nfts/Nft7.jpg";

const HistoryCard = ({ event }) => {
  // Function to format date in the format MM/DD/YYYY
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };

  // Function to format time in the format HH:MM AM/PM
  const formatTime = (timeString) => {
    const time = new Date(`1970-01-01T${timeString}`);
    return time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  };

  return (
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
            <div className="h-16 w-16">
              <img
                className="h-full w-full rounded-xl"
                // src={event.image}
                src={nft7}
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
    </Card>
  );
};

export default HistoryCard;
