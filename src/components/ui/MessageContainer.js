import React, { useEffect, useState } from "react";
import useChatStore from "ZustStore/chatStore";
import { Link, useNavigate } from "react-router-dom";
import Input from "./Input";
import axios from "axios";

function MessageContainer({ selectedConversation }) {
  const { messages, loadingMessages, getMessagesWithUser, sendMessage } =
    useChatStore();
  const [messageText, setMessageText] = useState("");
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    getMessagesWithUser(token, selectedConversation.userId);
  }, []);
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
  const customStyles = {
    borderRadius: "21px",
    borderColor: "rgb(234, 234, 234)",
    fontSize: "15px",
    fontFamily: "sans-serif",
  };
  const handleSendMessage = async () => {
    try {
      const token = localStorage.getItem("token");
      await sendMessage(token, {
        message: messageText,
        recipientId: selectedConversation.userId,
      });
      console.log(messageText);
      setMessageText("");
      getMessagesWithUser(token, selectedConversation.userId);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className=" hidden lg:col-span-2 lg:block">
      <div className="w-full">
        <div className="relative flex flex-wrap  items-center border-b border-gray-300 lg:flex-nowrap">
          <div className="my-0 ml-0 flex  w-full flex-col justify-center lg:my-2 lg:ml-4  ">
            <div className="flex h-[50px] lg:h-auto">
              <div className="flex items-center justify-center">
                <div className=" flex ">
                  <span className=" h-3 w-3 rounded-full bg-green-600"></span>
                </div>
                <div className="flex flex-col">
                  <span className=" w-50 ml-2 mt-2 block font-bold text-gray-600">
                    {selectedConversation.username}
                  </span>
                  <span className="w-50 mb-2 ml-2 block self-end text-xs font-bold text-blue-500 lg:text-sm ">
                    Item 2
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex h-[3rem] w-full border-l border-gray-300 lg:h-[5rem]">
            <button
              aria-label="Voir l'annonce"
              className="text-2xs flex h-full w-1/2  items-center justify-center self-center  bg-gray-200 p-[6px] font-semibold text-gray-700 hover:bg-gray-200/50 lg:text-base"
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 20 20"
                aria-hidden="true"
                className="mr-2 self-center text-gray-600"
                height="20"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
                <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path>
              </svg>
              Show Item
            </button>
            <button className="text-primary bg-primary/10 hover:bg-primary/5 flex h-full w-1/2 items-center justify-center self-center text-xs font-semibold  lg:text-base ">
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 20 20"
                aria-hidden="true"
                className="mr-2 self-center "
                height="20"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              Block
            </button>
          </div>
        </div>
        <div className="relative h-[320px] w-full overflow-y-auto bg-gray-100 p-6 lg:h-[480px]">
          <ul className="space-y-4">
            {messages.map((message, index) => (
              <>
                {message.sender === userId ? (
                  <li key={index} className="flex justify-end">
                    <div className="relative flex max-w-xl rounded-lg bg-kindyblue  text-white shadow">
                      <div className="p-3">
                        <span className="font-jost flex whitespace-pre-line text-start text-sm text-white">
                          {message.text}{" "}
                        </span>
                        <div className=" mt-1 flex justify-between">
                          <span className="text-slate-700/80 self-center text-xs">
                            {message.timestamp}{" "}
                          </span>
                        </div>
                      </div>
                      {/* <span className="hover:bg-red-500 flex h-full w-10 cursor-pointer items-center justify-center rounded-r-lg bg-white"></span> */}
                    </div>
                  </li>
                ) : (
                  <li key={index} className="flex justify-start">
                    <div className="relative flex max-w-xl rounded-lg bg-white  text-gray-700 shadow justify-center ">
                      <div className="p-3 item">
                        <span className="font-jost flex whitespace-pre-line text-start text-sm text-gray-700">
                          {message.text}{" "}
                        </span>
                        <div className="mt-1 flex justify-between">
                          <span className="text-slate-700/80 self-center text-xs">
                            {message.timestamp}{" "}
                          </span>
                        </div>
                      </div>
                    </div>
                  </li>
                )}
              </>
            ))}
          </ul>
        </div>
        <div className="flex w-full items-center justify-between border-t border-gray-300 p-3 lg:mb-0">
          <div className="relative flex w-full items-center ">
            <div className="react-input-emoji--container" style={customStyles}>
              {/* <div className="react-input-emoji--wrapper">
                <div className="react-input-emoji--placeholder">
                  Type a message
                </div>
                <div
                  tabindex="0"
                  contenteditable="true"
                  className="react-input-emoji--input"
                  data-testid="react-input-emoji--input"
                ></div>
              </div> */}
            </div>
            {/* <div className="react-emoji-picker--container"></div>
            <button type="button" className="react-input-emoji--button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className="react-input-emoji--button--icon"
              >
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0m0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10"></path>
                <path d="M8 7a2 2 0 1 0-.001 3.999A2 2 0 0 0 8 7M16 7a2 2 0 1 0-.001 3.999A2 2 0 0 0 16 7M15.232 15c-.693 1.195-1.87 2-3.349 2-1.477 0-2.655-.805-3.347-2H15m3-2H6a6 6 0 1 0 12 0"></path>
              </svg>
            </button> */}
            <input
              className="w-full"
              placeholder="Type a message"
              onChange={(e) => setMessageText(e.target.value)}
              value={messageText}
            />
          </div>
          <button type="submit" onClick={handleSendMessage}>
            <svg
              className="h-5 w-5 origin-center rotate-90 transform text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default MessageContainer;
