import React, { useState } from "react";
import Card from "components/card";
import { useNavigate } from "react-router-dom";
import { CalendarDaysIcon } from "@heroicons/react/24/solid";
import avatar1 from "assets/img/avatars/avatar1.png";
import trade from "assets/img/trade.png";
import { ArrowsRightLeftIcon } from "@heroicons/react/24/solid";

function LatestTrades({ trades }) {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");
  const getStatusColor = (status) => {
    switch (status) {
      case "accepted":
        return "bg-green-500";
      case "rejected":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };
  const filtered = trades.filter((trade) => {
    if (filter === "all") return true;
    return trade.status === filter;
  });
  return (
    <Card extra={"w-full h-full p-2  "}>
      <div className="max-h-[500px] overflow-y-scroll rounded-lg bg-white">
        <div className="mb-8 mt-2 flex w-full justify-between p-3">
          <h4 className="px-2 text-xl font-bold text-navy-700 dark:text-white">
            Latest Trades
          </h4>
          {/* <img src={trade} className="mr-3 h-6 w-6" alt="trade icon" /> */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-md border border-gray-300 px-3 py-1 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          >
            <option value="all">All Trades</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <div className="grid grid-cols-1 gap-4 px-2">
          <div className="grid grid-cols-1 gap-4 px-2">
            {trades.length === 0 ? (
              <div className="flex items-center justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <p className="text-base font-medium text-navy-700 dark:text-white">
                  You haven't made any trades yet.
                </p>
              </div>
            ) : (
              filtered.map((trade) => (
                <div
                  key={trade._id}
                  className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border  shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none"
                >
                  <div className="flex w-full flex-row justify-between p-3 ">
                    <div className="flex">
                      <span className="z-10  h-8 w-8 rounded-full border-2 border-white dark:!border-navy-800">
                        <img
                          className="h-5 w-5 rounded-full object-cover"
                          src={avatar1}
                          alt=""
                        />
                      </span>
                      <div className=" space-x-3">
                        <p className="text-base font-medium text-navy-700 dark:text-white">
                          {trade.sender.firstName} {trade.sender.lastName}
                        </p>
                        {new Date(trade.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                        })}
                      </div>
                    </div>
                    <div className="justify-end">
                      <button
                        className={`rounded-3xl px-2 text-white ${getStatusColor(
                          trade.status
                        )}`}
                      >
                        {trade.status}
                      </button>
                    </div>
                  </div>

                  <div className=" border-1 flex w-full flex-row justify-between rounded-lg p-3 ">
                    <div className="w-full flex-col ">
                      <p className="text-sm text-gray-600">Your Instrument</p>
                      <p className="text-base font-medium text-navy-700 dark:text-white">
                        {trade.receiverInstrument.title} -{" "}
                        {trade.receiverInstrument.brand}
                      </p>
                    </div>
                    <div className="p-5">
                      <ArrowsRightLeftIcon className="h-10 w-10 text-kindyblue" />
                    </div>
                    <div className="w-full flex-col text-right">
                      <p className="text-sm text-gray-600">Swap For</p>
                      <p className="text-base font-medium text-navy-700 dark:text-white">
                        {trade.sender.senderInstrument.title} -{" "}
                        {trade.sender.senderInstrument.brand}
                      </p>
                    </div>
                  </div>
                  {trade.status === "rejected" && (
                    <div className="flex w-full  justify-between p-3">
                      <p className="text-sm text-gray-600">
                        Reason for rejection
                      </p>
                      <p className="text-base font-medium text-navy-700 dark:text-white">
                        {trade.declineReason}
                      </p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}

export default LatestTrades;
