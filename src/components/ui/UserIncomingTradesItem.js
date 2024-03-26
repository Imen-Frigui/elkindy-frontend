import React from "react";
import avatar from "assets/img/avatars/avatar11.png";
import Card from "components/card";
import TradeItem from "./TradeItem";
import {
  EnvelopeIcon,
  PhoneIcon,
  CheckIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import useExchangeStore from "ZustStore/exchangeStore";
import useSocketStore from "ZustStore/socketStore";

const IncomingTrades = ({ tradeData }) => {
  const { updateTradeStatus } = useExchangeStore();
  const { socket } = useSocketStore();

  const token = localStorage.getItem("token");
  const handleAcceptTrade = async () => {
    try {
      await updateTradeStatus(token, tradeData._id, "accepted");
      handleNotification("accepted");
    } catch (error) {}
  };

  const handleRejectTrade = async () => {
    try {
      await updateTradeStatus(token, tradeData._id, "rejected");
      handleNotification("rejected");
    } catch (error) {}
  };

  const handleNotification = (status) => {
    socket.emit("sendTradeStatus", {
      receiverId: tradeData.sender.id,
      status: status,
    });
  };

  return (
    <Card
      extra={"flex md:flex-row items-center w-auto h-full p-[5px] bg-cover"}
    >
      <div className="flex flex-col  items-center justify-center rounded-xl p-5 ">
        <div className=" h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400 dark:!border-navy-700">
          <img
            className="h-full w-full rounded-full"
            src={avatar}
            alt="User Avatar"
          />
        </div>
        <div>
          <p className="text-sm font-bold text-navy-700 dark:text-white">
            {tradeData.sender.firstName} {tradeData.sender.lastName}
          </p>
        </div>
        <div className="flex flex-col justify-center space-x-3  md:flex-row">
          <EnvelopeIcon className="w-4 text-navy-700" />
          <PhoneIcon className="w-4 text-navy-700" />
        </div>
      </div>
      <div className="ml-3 ">
        <div className=" mt-1 flex justify-center rounded-xl bg-cover">
          <TradeItem
            item={tradeData.sender.senderInstrument}
            status={tradeData.status}
          />
        </div>
        {tradeData.status === "requested" && (
          <div className="mt-3 flex justify-end space-x-2  ">
            <button onClick={handleAcceptTrade}>
              <CheckIcon className="h-6 w-6 rounded-lg bg-green-500 text-white" />
            </button>
            <button onClick={handleRejectTrade}>
              <XMarkIcon className="h-6 w-6 rounded-lg bg-red-500 text-white" />
            </button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default IncomingTrades;
