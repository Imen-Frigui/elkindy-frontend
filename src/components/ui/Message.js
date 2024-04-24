import React, { useEffect, useState } from "react";

function Message({ message, userId }) {
  
  return (
    <>
      {message.sender === userId ? (
        <li className="flex justify-end">
          <div className="relative flex max-w-xl rounded-[22px] bg-kindyblue text-white shadow">
            <div className="p-3">
              <span className="font-jost flex whitespace-pre-line text-start text-sm text-white">
                {message.text}
              </span>
              <div className="mt-1 flex justify-between">
                <span className="text-slate-700/80 self-center text-xs">
                  {message.timestamp}
                </span>
              </div>
            </div>
          </div>
        </li>
      ) : (
        <li className="flex justify-start">
          <div className="relative flex max-w-xl justify-center rounded-[22px] bg-white text-gray-700 shadow">
            <div className="item p-3">
              <span className="font-jost flex whitespace-pre-line text-start text-sm text-gray-700">
                {message.text}
              </span>
              <div className="mt-1 flex justify-between">
                <span className="text-slate-700/80 self-center text-xs">
                  {message.timestamp}
                </span>
              </div>
            </div>
          </div>
        </li>
      )}
    </>
  );
}

export default Message;
