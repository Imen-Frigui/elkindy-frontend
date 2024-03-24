import React from "react";
import avatar from "assets/img/avatars/avatar11.png";
import Card from "components/card";
import TradeItem from "./TradeItem";
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/solid";

const IncomingTrades = ({ tradeData }) => {
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
        </div>
      </Card>
  );
};

export default IncomingTrades;
