import React, { useEffect, useState, useRef } from "react";
import useChatStore from "ZustStore/chatStore";
import { Link, useNavigate } from "react-router-dom";
import Input from "./Input";
import axios from "axios";
import useSocketStore from "ZustStore/socketStore";
import messageSound from "assets/sound/message.mp3";
import EmojiPicker from "emoji-picker-react";
import Message from "./Message";
import { PhotoIcon, FaceSmileIcon } from "@heroicons/react/24/solid";

function MessageContainer({
  selectedConversation,
  setSelectedConversation,
  isOnline,
}) {
  const { messages, loadingMessages, getMessagesWithUser, sendMessage } =
    useChatStore();
  const [messagesList, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);
  const [openEmoji, setOpenEmoji] = useState(false);
  const [filePreview, setFilePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isTyping, setIsTyping] = useState(false);

  const { socket } = useSocketStore();
  const messageEl = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
    getMessagesWithUser(token, selectedConversation.userId);
    //  setMessages(messagesList)
  }, [selectedConversation]);

  useEffect(() => {
    if (messageEl) {
      messageEl.current.addEventListener("DOMNodeInserted", (event) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: "smooth" });
      });
    }
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

  useEffect(() => {
    socket.on("newMessage", (message) => {
      if (selectedConversation._id === message.conversationId) {
        const token = localStorage.getItem("token");
        getMessagesWithUser(token, selectedConversation.userId);
      }

      if (!document.hasFocus()) {
        const sound = new Audio(messageSound);
        sound.play();
      }

      setSelectedConversation((prevConversation) => ({
        ...prevConversation,
        lastMessage: {
          text: message.text,
          sender: message.sender,
        },
      }));
    });
    socket.on("user-typing", (userId) => {
      setIsTyping(true);
    });

    socket.on("stop-typing", (userId) => {
      setIsTyping(false);
    });
    return () => {
      socket.off("newMessage");
      socket.off("user-typing");
      socket.off("stop-typing");
    };
  }, [socket]);

  const handleTyping = () => {
    socket.emit("user-typing", selectedConversation.userId);
  };
  const handleStopTyping = () => {
    socket.emit("stop-typing", selectedConversation.userId);
  };

  useEffect(() => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setFilePreview(null);
    }
  }, [selectedFile]);

  const handleSelectEmoji = (data) => {
    setMessageText(data);
  };

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
        img: filePreview,
      });
      setMessageText("");
      setFilePreview(null);
      getMessagesWithUser(token, selectedConversation.userId);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageDataURL = reader.result;
        setFilePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedFile(null);
    }
  };
  const removeImage = (index) => {
    setSelectedFile(null);
    setFilePreview(null)
  };

  return (
    <div className=" hidden lg:col-span-2 lg:block">
      <div className="w-full">
        <div className="relative flex flex-wrap  items-center border-b border-gray-300 lg:flex-nowrap">
          <div className="my-0 ml-0 flex  w-full flex-col justify-center lg:my-2 lg:ml-4  ">
            <div className="flex h-[50px] lg:h-auto">
              <img
                src={selectedConversation.userProfilePic}
                alt="user-image"
                className="h-10 w-10 rounded-full object-cover"
              ></img>
              <div className="flex flex-col items-start text-left">
                <div className="flex flex-col items-start space-x-2">
                  <span className=" w-50 ml-2  block font-bold text-gray-600">
                    {selectedConversation.username}
                  </span>
                  <span className="w-50 font-sm mb-2 ml-2 block justify-start self-start text-xs text-black lg:text-sm ">
                    {isOnline ? "Online" : "Offline"}
                  </span>
                </div>
              </div>
              {isOnline ? (
                <span className=" ml-2 h-3 w-3 rounded-full bg-green-600"></span>
              ) : (
                <span className=" bg-grey-600 ml-2 h-3 w-3 rounded-full"></span>
              )}
            </div>
          </div>
          <div className="flex h-[3rem] w-full border-l border-gray-300 lg:h-[5rem]">
            <button
              aria-label=""
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
        <div
          className="relative h-[320px] w-full overflow-y-auto bg-gray-100 p-6 lg:h-[480px]"
          ref={messageEl}
        >
          <ul className="space-y-1">
            {messages.map((message, index) => (
              <div key={index}>
                <Message
                  message={message}
                  userId={userId}
                  isLastMessage={
                    index === messages.length - 1 ||
                    (message.sender === userId &&
                      messages[index + 1]?.sender !== userId)
                  }
                />
              </div>
            ))}
            {isTyping ? (
              <div className="flex w-1/6 items-center justify-center space-x-1 rounded-[22px] bg-white p-2 text-gray-700 shadow">
                <div class="h-2 w-2 animate-bounce rounded-full bg-gray-700 [animation-delay:-0.2s]"></div>
                <div class="h-2 w-2 animate-bounce rounded-full bg-gray-700 [animation-delay:-0.15s]"></div>
                <div class="h-2 w-2 animate-bounce rounded-full bg-gray-700"></div>
              </div>
            ) : null}
          </ul>
        </div>
        <div className="flex w-full items-center justify-between border-gray-300 p-3 md:mb-0">
          <div className=" flex w-full flex-row items-center justify-center  ">
            <div className="mt-2">
              <button
                className="p-0"
                onClick={() => setOpenEmoji((prev) => !prev)}
              >
                <FaceSmileIcon
                  className="h-6 w-6 text-gray-400"
                  aria-hidden="true"
                />
              </button>
            </div>

            <div className="">
              <label htmlFor="imageUpload">
                <input
                  id="imageUpload"
                  type="file"
                  accept="image/*"
                  className="hidden cursor-pointer"
                  onChange={handleFileChange}
                />{" "}
                <PhotoIcon
                  className="h-6 w-6 cursor-pointer text-gray-400"
                  aria-hidden="true"
                />
              </label>
            </div>
            <input
              className="focus:border-primary focus:ring-primary ml-3 mr-3 w-full rounded-[22px] border border-gray-300 px-6 py-2 focus:outline-none focus:ring-1"
              placeholder="Type a message"
              value={messageText}
              onChange={(e) => {
                setMessageText(e.target.value);
                handleTyping();
              }}
              onBlur={handleStopTyping}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
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
        <EmojiPicker
          open={openEmoji}
          width={450}
          onEmojiClick={(e) => handleSelectEmoji(e.emoji)}
        />
        <div
          data-rbd-droppable-id="imageList"
          data-rbd-droppable-context-id="0"
          className="relative mt-4 grid w-full grid-cols-4 gap-3"
        >
          {filePreview && (
            <div className="relative">
              <img src={filePreview} className="h-15 w-full rounded-lg " />
              <div className="absolute right-1 top-1 -translate-y-1/2 translate-x-1/2">
                <button
                  onClick={() => removeImage()}
                  className="rounded-full bg-kindyorange p-1 text-white"
                >
                  <svg
                    stroke="#FFFFFF"
                    fill="#FFFFFF"
                    strokeWidth="0"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                    height="14"
                    width="14"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MessageContainer;
