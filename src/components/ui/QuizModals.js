import React, { useState } from "react";
import useChatStore from "ZustStore/chatStore";
import useSocketStore from "ZustStore/socketStore";
const QuizModals = ({
  isOpen,
  onClose,
  onSubmit,
  setIsWaitingForResponse,
  selectedConversation,
  userId,
  setShowPlayModal,
  onSelectionChange,
}) => {
  const [lengthOfQuestions, setLengthOfQuestions] = useState(3);
  const [topic, setTopic] = useState("Music");
  const [level, setLevel] = useState("easy");
  const [waiting, setWaiting] = useState(false);

  const { getUsers, users, sendMessage, getConversations } = useChatStore();
  const { socket } = useSocketStore();

  const handleSubmit = () => {
    console.log(selectedConversation);
    socket.emit("start-playing", selectedConversation.userId);
    console.log(userId);
    setIsWaitingForResponse();
    setShowPlayModal();
    onClose();
  };
  const handleSelectionChange = () => {
    onSelectionChange(lengthOfQuestions, topic, level);
  };
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="h-auto w-1/3 rounded-md bg-white p-4 shadow-lg">
            <h2 className="mb-4 text-2xl font-bold">
              Start a Quiz Game with Friends
            </h2>
            <div>
              <label className="font-bol text-xl ">Number of Questions:</label>
              <div className="items-center p-3">
                <button
                  className="rounded-2xl p-3"
                  style={{
                    backgroundColor:
                      lengthOfQuestions === 3 ? "lightblue" : "transparent",
                  }}
                  onClick={() => setLengthOfQuestions(3)}
                >
                  3
                </button>
                <button
                  className="rounded-2xl p-3"
                  style={{
                    backgroundColor:
                      lengthOfQuestions === 5 ? "lightblue" : "transparent",
                  }}
                  onClick={() => setLengthOfQuestions(5)}
                >
                  5
                </button>
                <button
                  className="rounded-2xl p-3"
                  style={{
                    backgroundColor:
                      lengthOfQuestions === 6 ? "lightblue" : "transparent",
                  }}
                  onClick={() => setLengthOfQuestions(6)}
                >
                  6
                </button>
              </div>
            </div>
            <div className="items-center p-3">
              <label className="font-bol text-xl ">Topic:</label>
              <div>
                <button
                  className="rounded-2xl p-3"
                  style={{
                    backgroundColor:
                      topic === "Music" ? "lightblue" : "transparent",
                  }}
                  onClick={() => setTopic("Music")}
                >
                  Music
                </button>
                <button
                  className="rounded-2xl p-3"
                  style={{
                    backgroundColor:
                      topic === "Musical Instruments"
                        ? "lightblue"
                        : "transparent",
                  }}
                  onClick={() => setTopic("Musical Instruments")}
                >
                  Musical Instruments
                </button>
                <button
                  className="rounded-2xl p-3"
                  style={{
                    backgroundColor:
                      topic === "Music History" ? "lightblue" : "transparent",
                  }}
                  onClick={() => setTopic("Music History")}
                >
                  Music History
                </button>
              </div>
            </div>
            <div className="items-center p-3">
              <label className="font-bol text-xl ">Difficulty Level:</label>
              <div>
                <button
                  className="rounded-2xl p-3"
                  style={{
                    backgroundColor:
                      level === "easy" ? "lightblue" : "transparent",
                  }}
                  onClick={() => setLevel("easy")}
                >
                  Easy
                </button>
                <button
                  className="rounded-2xl p-3"
                  style={{
                    backgroundColor:
                      level === "medium" ? "lightblue" : "transparent",
                  }}
                  onClick={() => setLevel("medium")}
                >
                  Medium
                </button>
                <button
                  className="rounded-2xl p-3"
                  style={{
                    backgroundColor:
                      level === "hard" ? "lightblue" : "transparent",
                  }}
                  onClick={() => setLevel("hard")}
                >
                  Hard
                </button>
              </div>
            </div>
            <button
              onClick={() => {
                handleSubmit();
                handleSelectionChange(); 
              }}
              className="focus:shadow-outline hover:rounded-kindyorange flex justify-end self-end rounded-full bg-kindyorange px-4 py-2 font-bold text-white hover:rounded-xl hover:bg-white hover:text-kindyorange focus:outline-none"
            >
              Invite to challenge
            </button>{" "}
          </div>
        </div>
      )}
    </>
  );
};

export default QuizModals;
