import React from "react";
import guitar from "assets/img/nfts/acoustic-guitar-grey.jpg";
import { Link } from "react-router-dom";

function TradeItem({ item, status }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "requested":
        return "bg-gray-500";
      case "accepted":
        return "bg-green-500";
      case "rejected":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };
  return (
    <div
      className={` mb-3 flex w-full cursor-pointer flex-row items-center justify-between rounded-2xl bg-white p-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none 
      `}
    >
      <div>
        <div className="flex items-center justify-end bg-white">
          <div>
            <img className="h-[83px] w-[83px] rounded-lg" src={guitar} alt="" />
          </div>
          <div className="ml-4">
            <p className="text-base font-medium text-navy-700 dark:text-white">
              {item.title}
            </p>
            <p className="mt-2 text-sm text-gray-600">
              {item.details}
              <Link to={"/admin/marketplace/instrument/" + item._id}>
                <a
                  className="ml-1 font-medium text-brand-500 hover:text-brand-500 dark:text-white"
                  href="# "
                >
                  See instrument details
                </a>
              </Link>
            </p>
          </div>
          <div>
            <button
              className={`rounded-3xl px-2 text-white ${getStatusColor(
                status
              )}`}
            >
              {" "}
              {status}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TradeItem;
