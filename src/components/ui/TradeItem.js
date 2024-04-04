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
      className={`w-auto cursor-pointer  items-center justify-between rounded-2xl p-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none 
      `}
    >
      <div className="w-full items-center justify-end space-y-4 ">
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
            className=" h-1/2 w-1/2  rounded-xl "
            src={item.img}
            alt="item image"
          />
        </div>
        <div className="w-full flex-col">
          <p className="text-base font-medium text-navy-700 dark:text-white">
            {item.title}
          </p>
          <Link
            className="border-neutral-300 text-neutral-600 hover:bg-neutral-100 mr-4 flex w-full justify-center rounded-lg border py-2 font-medium"
            to={"/admin/marketplace/instrument/" + item._id}
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 24 24"
              class="mr-6 self-center text-gray-600"
              height="20"
              width="20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path d="M1.181 12C2.121 6.88 6.608 3 12 3c5.392 0 9.878 3.88 10.819 9-.94 5.12-5.427 9-10.819 9-5.392 0-9.878-3.88-10.819-9zM12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0-2a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"></path>
              </g>
            </svg>
            See instrument details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TradeItem;
