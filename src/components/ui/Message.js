import React, { useEffect, useState } from "react";
import { format } from "date-fns";

function Message({ message, userId, isLastMessage }) {
  const formattedDate = format(new Date(message.createdAt), " h:mm a");

  return (
    <>
      {message.sender === userId ? (
        <li className="flex justify-end">
          <div className="relative flex max-w-xl rounded-[22px] bg-kindyblue text-white shadow">
            <div className="p-3">
              <span className="font-jost flex whitespace-pre-line text-start text-sm text-white">
                {message.text}
              </span>
              {message.img && <img className="w-auto " src={message.img} />}

              <div className="mt-1 flex justify-between">
                {/* {isLastMessage && (
                  <div className="mt-1 flex justify-between">
                    <span className="text-slate-700/80 self-center text-xs">
                      {formattedDate}
                    </span>
                  </div>
                )} */}
              </div>
            </div>
          </div>
        </li>
      ) : (
        <div>
          <li className="flex justify-start">
            <div className="relative flex max-w-xl justify-center rounded-[22px] bg-white text-gray-700 shadow">
              <div className="item p-3">
                <span className="font-jost flex whitespace-pre-line text-start text-sm text-gray-700">
                  {message.text}
                </span>
                {message.img && <img className="w-auto " src={message.img} />}
              </div>
            </div>
          </li>
          <div className="mt-1 ">
            {isLastMessage && (
              <div className="mt-1 flex justify-between">
                <span className="self-center text-xs text-gray-600">
                  {formattedDate}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Message;
