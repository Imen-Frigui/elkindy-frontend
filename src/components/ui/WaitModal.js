import React, { useState, useEffect } from "react";
import useChatStore from "ZustStore/chatStore";
import useSocketStore from "ZustStore/socketStore";
import LoadingSpinner from "./LoadingSpinner";

function WaitModal({ isOpen, onClose, selectedConversation }) {
  const [waiting, setWaiting] = useState(false);

  const { getUsers, users, sendMessage, getConversations } = useChatStore();
  const { socket } = useSocketStore();

  useEffect(() => {
    socket.on("decline-invite", (message) => {
      console.log("closing");
      onClose();
    });

    return () => {
      socket.off("decline-invite");
    };
  }, [socket]);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="h-1/2 w-1/3 rounded-md bg-white p-4 shadow-lg">
            <h2 className="mb-2 text-lg font-semibold">
              Waiting for the response
            </h2>
            <LoadingSpinner />
          </div>
        </div>
      )}
    </>
  );
}

export default WaitModal;
