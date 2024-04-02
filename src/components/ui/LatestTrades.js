import React, { useState, useEffect } from "react";
import Card from "components/card";
import useExchangeStore from "ZustStore/exchangeStore";
import { useNavigate } from "react-router-dom";
import { CalendarDaysIcon } from "@heroicons/react/24/solid";
function LatestTrades({ trades }) {
  const navigate = useNavigate();
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
  return (
    <Card extra={"w-full h-full p-2"}>
      {/* Header */}
      <div className="mb-8 mt-2 w-full">
        <h4 className="px-2 text-xl font-bold text-navy-700 dark:text-white">
          Latest Trades
        </h4>
      </div>
      {/* Cards */}
      <div className="grid grid-cols-1 gap-4 px-2">
        <div className="grid grid-cols-1 gap-4 px-2">
          {trades.length === 0 ? (
            <div className="flex items-center justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
              <p className="text-base font-medium text-navy-700 dark:text-white">
                You haven't made any trades yet
              </p>
            </div>
          ) : (
            trades.map((trade) => (
              <div
                key={trade._id}
                className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none"
              >
                <div className=" flex w-full flex-row justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Sender Name</p>
                    <p className="text-base font-medium text-navy-700 dark:text-white">
                      {trade.sender.firstName} {trade.sender.lastName}
                    </p>
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

                <div className=" flex w-full flex-wrap justify-between">
                  <p className="text-sm text-gray-600">Your Instrument</p>
                  <p className="text-base font-medium text-navy-700 dark:text-white">
                    {trade.receiverInstrument.title} -{" "}
                    {trade.receiverInstrument.brand}
                  </p>
                  <p className="text-sm text-gray-600">Proposed Instrument</p>
                  <p className="text-base font-medium text-navy-700 dark:text-white">
                    {trade.sender.senderInstrument.title} -{" "}
                    {trade.sender.senderInstrument.brand}
                  </p>
                </div>
                <div className="flex w-full justify-between">
                  <CalendarDaysIcon className="w-5 text-gray-600 " />
                  <div className="justify-end">
                    <p className="justify-end text-base font-medium text-navy-700 dark:text-white">
                      {new Date(trade.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Card>
  );
}

export default LatestTrades;
