import React, { useState, useEffect } from "react";
import Card from "components/card";
import { useNavigate } from "react-router-dom";
import avatar1 from "assets/img/avatars/avatar1.png";
import { ArrowsRightLeftIcon } from "@heroicons/react/24/solid";
import axios from "axios";

function LatestTrades({ trades }) {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");
  const [userId, setUserId] = useState(null);

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
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found");
          return;
        }
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(
          "http://localhost:3000/api/auth/validateSession",
          config
        );
        setUserId(response.data.user._id);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const filtered = trades.filter((trade) => {
    if (filter === "all") return true;
    return trade.status === filter;
  });

  const isCurrentUserReceiver = (trade) => {
    console.log(trade.receiverInstrument.author === userId);
    return trade.receiverInstrument.author === userId;
  };

  return (
    <Card extra={"w-full h-full p-2  "}>
      <div className="max-h-[500px] overflow-y-scroll rounded-xl bg-white dark:bg-navy-800">
        <div className="mb-8 mt-2 flex w-full justify-between p-3">
          <h4 className="px-2 text-xl font-bold text-navy-700 dark:text-white">
            Latest Trades
          </h4>
          <div className="relative right-5 flex items-center">
            <span class="relative left-8">
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 20 20"
                aria-hidden="true"
                class="text-gray-600"
                height="20"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </span>{" "}
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="select text-2xs select-sm select border-1 h-[40px] max-h-full w-full max-w-full rounded-md border-gray-300 bg-gray-100 bg-gray-200/70 pl-10 text-xs font-light  text-gray-600 hover:!text-gray-700 focus:outline-none focus:outline-offset-0 xl:w-fit dark:text-white"
            >
              <option value="all">All Trades</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 px-2">
          <div className="grid grid-cols-1 gap-4 px-2">
            {filtered.length === 0 ? (
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
                    {trade.sender.id === userId ? (
                      <div className=" border-1 flex w-full flex-row justify-between rounded-lg p-3 ">
                        <div className="w-full flex-col ">
                          <p className="text-sm text-gray-600">
                            Your Instrument
                          </p>
                          <p className="text-base font-medium text-navy-700 dark:text-white">
                            {trade.sender.senderInstrument.title} -{" "}
                            {trade.sender.senderInstrument.brand}
                          </p>
                        </div>
                        <div className="p-5">
                          <ArrowsRightLeftIcon className="h-10 w-10 text-kindyblue" />
                        </div>
                        <div className="w-full flex-col text-right">
                          <p className="text-sm text-gray-600">Swap For</p>
                          <p className="text-base font-medium text-navy-700 dark:text-white">
                            {trade.receiverInstrument.title} -{" "}
                            {trade.receiverInstrument.brand}{" "}
                            {trade.moneyProposed !== 0 && (
                              <div>+ {trade.moneyProposed}DT</div>
                            )}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className=" border-1 flex w-full flex-row justify-between rounded-lg p-3 ">
                        <div className="w-full flex-col ">
                          <p className="text-sm text-gray-600">
                            Your Instrument
                          </p>
                          <p className="text-base font-medium text-navy-700 dark:text-white">
                            {trade.receiverInstrument.title} -{" "}
                            {trade.receiverInstrument.brand}{" "}
                            {trade.moneyProposed && (
                              <div>+ {trade.moneyProposed}DT</div>
                            )}
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
                    )}
                    {/* <div className="w-full flex-col ">
                      <p className="text-sm text-gray-600">Your Instrument</p>
                      <p className="text-base font-medium text-navy-700 dark:text-white">
                        {trade.receiverInstrument.title} -{" "}
                        {trade.receiverInstrument.brand}{" "}
                        {trade.moneyProposed && (
                          <div>+ {trade.moneyProposed}DT</div>
                        )}
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
                    </div> */}
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
