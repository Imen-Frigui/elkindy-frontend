import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useChatStore from "ZustStore/chatStore";
import useSocketStore from "ZustStore/socketStore";

function StartQuizz({
  isOpen,
  onClose,
  selectedConversation,
  userId,
  topic,
  level,
  lengthOfQuestions,
}) {
  const [waiting, setWaiting] = useState(false);

  const { getUsers, users, sendMessage, getConversations } = useChatStore();
  const { socket } = useSocketStore();

  useEffect(() => {
    socket.on("queue", (message) => {
      setWaiting(true);
      //   if (!document.hasFocus()) {
      //     const sound = new Audio(messageSound);
      //     sound.play();
      //   }
    });
    socket.on("decline-invite", () => {
      onClose();
    });
    socket.on("accept-invite", () => {
      onClose();

      const newWindow = window.open("/admin/chat/quiz", "_blank");
      newWindow.focus();
    });

    return () => {
      socket.off("queue");
      socket.off("accept-invite");
      socket.off("decline-invite");
    };
  }, [socket]);

  const handleAcceptInvite = () => {
    socket.emit("accept-invite", userId);
  };
  const handleDeclineInvite = () => {
    socket.emit("decline-invite", userId);
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="h-auto w-1/3 rounded-md bg-white p-4 shadow-lg">
            <h2 className="mb-2 text-lg font-semibold">
              {selectedConversation} is inviting you to play a quick quiz!
            </h2>
            <p className="mb-4 text-gray-700">Are you up for the challenge?</p>
            <div className="flex justify-end">
              <button
                className="mr-2 rounded bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300"
                onClick={handleDeclineInvite}
              >
                Decline
              </button>
              <Link to="quiz" target="_blank">
                <button
                  className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                  onClick={handleAcceptInvite}
                >
                  Accept
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default StartQuizz;
