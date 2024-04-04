import React from "react";
import guitar from "assets/img/nfts/acoustic-guitar-grey.jpg";
import { Link } from "react-router-dom";

function TradeItem({ item, status, data }) {
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
      className={` w-full cursor-pointer items-center justify-between rounded-2xl  p-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none 
      `}
    >
      <div className=" w-full items-center justify-end ">
        {new Date(data.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
        })}
        <div>
          <button
            className={`rounded-3xl px-2 text-white ${getStatusColor(status)}`}
          >
            {status}
          </button>
        </div>
        <div>
          <img
            className=" h-1/2 w-full rounded-xl 3xl:h-full 3xl:w-full"
            src={item.img}
            alt=""
          />
        </div>
        <div className="ml-4">
          <p className="text-base font-medium text-navy-700 dark:text-white">
            {item.title}
          </p>
          <p className="mt-2 overflow-hidden text-ellipsis text-sm text-gray-600">
            {item.details}
            <Link
              className="ml-1 font-medium text-brand-500  hover:text-brand-500 dark:text-white"
              to={"/admin/marketplace/instrument/" + item._id}
            >
              See instrument details
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default TradeItem;
