import React, { useState, useEffect } from "react";
import useChatStore from "ZustStore/chatStore";
import useSocketStore from "ZustStore/socketStore";
import LoadingSpinner from "./LoadingSpinner";

function WaitModal({
  isOpen,
  onClose,
  selectedConversation,
  topic,
  level,
  lengthOfQuestions,
}) {
  const [waiting, setWaiting] = useState(false);

  const { getUsers, users, sendMessage, getConversations } = useChatStore();
  const { socket } = useSocketStore();

  useEffect(() => {
    socket.on("decline-invite", (message) => {
      onClose();
    });
    socket.on("accept-invite", (message) => {
      onClose();
      // const topic = "Music";
      // const level = "easy";
      // const lengthOfQuestions = 3;
      // const url = `/admin/chat/quiz/${encodeURIComponent(
      //   topic
      // )}/${encodeURIComponent(level)}/${encodeURIComponent(lengthOfQuestions)}`;

      const newWindow = window.open("/admin/chat/quiz", "_blank");
      newWindow.focus();
    });

    return () => {
      socket.off("decline-invite");
    };
  }, [socket]);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 p-3">
          <div className="h-auto w-1/3  flex-col items-center justify-center rounded-md bg-white p-4 shadow-lg">
            <h2 className="mb-2 text-lg font-semibold">
              Waiting for opponent the response
            </h2>
            <div className=" flex items-center justify-center">
              <LoadingSpinner />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default WaitModal;
