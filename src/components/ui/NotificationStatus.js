import React from "react";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

const NotificationStatus = ({ status, onClick }) => {
  const tradeStatusMessage = (status) => {
    switch (status) {
      case "accepted":
        return "Your trade request has been accepted!";
      case "rejected":
        return "Unfortunately, your trade request has been rejected.";
      case "pending":
        return "Your trade request is pending approval.";
      default:
        return "New trade status notification received.";
    }
  };

  return (
    <Link to={"/marketplace/trades"}>
      <button
        className="flex w-full items-center rounded-lg bg-indigo-50 px-3"
        onClick={onClick}
      >
        <div className="flex h-full w-[55px] items-center justify-center rounded-xl py-4 text-2xl text-white">
          {status === "accepted" ? (
            <CheckIcon className="h-4 w-4 text-green-600" />
          ) : (
            <XMarkIcon className="h-4 w-4 text-red-600" />
          )}
        </div>
        <div className="ml-2 flex h-full w-full flex-col justify-center rounded-lg px-1 text-sm">
          <div className="flex flex-col">
            <p className="mb-1 text-left text-base font-bold text-gray-900 dark:text-white">
              {tradeStatusMessage(status)}
            </p>
            <a className="mb-1 text-left text-base font-bold text-gray-900 dark:text-white">
              See more details
            </a>
          </div>
          <p className="font-base text-left text-xs text-gray-900 dark:text-white"></p>
        </div>
      </button>
    </Link>
  );
};

export default NotificationStatus;
