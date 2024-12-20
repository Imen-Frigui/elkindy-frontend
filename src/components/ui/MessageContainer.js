import React, { useEffect, useState, useRef } from "react";
import useChatStore from "ZustStore/chatStore";
import { Link, useNavigate } from "react-router-dom";
import Input from "./Input";
import axios from "axios";
import useSocketStore from "ZustStore/socketStore";
import messageSound from "assets/sound/message.mp3";
import EmojiPicker from "emoji-picker-react";
import Message from "./Message";
import {
  PhotoIcon,
  FaceSmileIcon,
  PhoneIcon,
  VideoCameraIcon,
  PlayCircleIcon,
  StopIcon,
  MicrophoneIcon,
  TrashIcon,
  PuzzlePieceIcon,
  ArrowDownCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import { ZIM } from "zego-zim-web";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import ringtone from "assets/sound/ringtone.mp3";
import unmute from "assets/sound/unmute.mp3";

import { useRecordWebcam } from "react-record-webcam";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import StartQuizz from "./PlayQuizz";
import WaitModal from "./WaitModal";
import QuizModals from "./QuizModals";

function MessageContainer({
  selectedConversation,
  setSelectedConversation,
  isOnline,
}) {
  const { messages, loadingMessages, getMessagesWithUser, sendMessage } =
    useChatStore();
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  const {
    createRecording,
    openCamera,
    startRecording,
    stopRecording,
    download,
    activeRecordings,
    closeCamera,
    clearPreview,
  } = useRecordWebcam();
  const [messagesList, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [userId, setUserId] = useState(null);
  const [userID, setUserID] = useState(null);
  const [token, setToken] = useState(null);
  const [openEmoji, setOpenEmoji] = useState(false);
  const [filePreview, setFilePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [userInfo, setUserInfo] = useState();
  const [isRecording, setIsRecording] = useState(false);
  const [isCleared, setIsCleared] = useState(false);
  const [recordingId, setRecordingId] = useState(null);
  const [showPlayModal, setShowPlayModal] = useState(null);
  const [showQuizOptions, setShowQuizOptions] = useState(null);
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);
  const [formData, setFormData] = useState(new FormData());
  const { socket } = useSocketStore();
  const messageEl = useRef(null);
  const zeroCloudInstance = useRef(null);
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
        setUserInfo(response.data.user.username);
        init(response.data.user._id, response.data.user.username);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
    // init();
  }, []);
  async function init(userID, userName) {
    const appID = 1024160343;
    const serverSecret = "b6392353ca3b75fde33a9df0f805c8e5";
    const TOKEN = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      null,
      userID,
      userName
    );
    zeroCloudInstance.current = ZegoUIKitPrebuilt.create(TOKEN);
    zeroCloudInstance.current.addPlugins({ ZIM });
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
    getMessagesWithUser(token, selectedConversation.userId);
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
    socket.on("start-playing", (userId) => {
      setShowPlayModal(true);
      if (!document.hasFocus()) {
        const sound = new Audio(messageSound);
        sound.play();
      }
    });
    // socket.on("decline-invite", (userId) => {
    //   // setShowPlayModal(false);
    //   console.log("declining invite")
    //   setIsWaitingForResponse(false);
    // });

    return () => {
      socket.off("newMessage");
      socket.off("user-typing");
      socket.off("stop-typing");
      socket.off("start-playing");
      socket.off("decline-invite");
      socket.off("accept-invite");
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
    setMessageText((previousValue) => previousValue + data);
  };

  const handleSendMessage = async () => {
    try {
      const token = localStorage.getItem("token");
      await sendMessage(token, {
        message: messageText,
        recipientId: selectedConversation.userId,
        img: filePreview,
        // video: formData,
      });
      setFormData(new FormData());
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
    setFilePreview(null);
  };
  const [calleeId, setCalleeId] = useState(selectedConversation.userId);

  function invite(callType) {
    const callee = calleeId;
    if (!callee) {
      alert("userID cannot be empty!!");
      return;
    }
    const sound = new Audio(ringtone);
    zeroCloudInstance.current.setCallInvitationConfig({
      ringtoneConfig: {
        incomingCallFileName: ringtone,
        outgoingCallFileName: ringtone,
      },
    });

    zeroCloudInstance.current
      .sendCallInvitation({
        callees: [{ userID: callee, userName: selectedConversation.username }],
        callType: callType,
        timeout: 60,
      })
      .then((res) => {
        console.warn(res);
      })
      .catch((err) => {
        console.warn(err);
      });
  }

  async function handleStartRecording() {
    setIsRecording(true);
    const recording = await createRecording();
    await openCamera(recording.id);
    await startRecording(recording.id);
    setRecordingId(recording.id);
  }
  async function handleStopRecording() {
    setIsRecording(false);
    const recorded = await stopRecording(recordingId);
    const formData = new FormData();
    formData.append("file", recorded.blob, "recorded.webm");
    setFormData(formData);
  }
  async function handleDownloadRecording() {
    await download(recordingId);
    setIsCleared(true);
  }
  async function handleClearRecording() {
    // await closeCamera(recordingId);

    await clearPreview(recordingId);
    await closeCamera(recordingId);
    setIsCleared(true);
  }
  async function handleStartListening() {
    const sound = new Audio(unmute);
    sound.play();
    SpeechRecognition.startListening({
      continuous: false,
    }).then((e) => {});
  }
  useEffect(() => {
    setMessageText(transcript);
  }, [transcript]);

  const inviteToPlay = () => {
    setShowQuizOptions(true);
  };
  const [selectedLengthOfQuestions, setSelectedLengthOfQuestions] = useState(3);
  const [selectedTopic, setSelectedTopic] = useState("Music");
  const [selectedLevel, setSelectedLevel] = useState("easy");
  const handleSelectionChange = (lengthOfQuestions, topic, level) => {
    setSelectedLengthOfQuestions(lengthOfQuestions);
    setSelectedTopic(topic);
    setSelectedLevel(level);
  };

  return (
    <div className=" col-span-1 md:col-span-2 md:block">
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
          <div className="mr-2 flex h-[3rem] w-full items-center justify-end space-x-4 self-end border-gray-300 md:h-[5rem]">
            <PhoneIcon
              onClick={() => invite(ZegoUIKitPrebuilt.InvitationTypeVoiceCall)}
              className="h-6 w-6 text-gray-400"
              aria-hidden="true"
            />
            <VideoCameraIcon
              onClick={() => invite(ZegoUIKitPrebuilt.InvitationTypeVideoCall)}
              className="h-6 w-6 text-gray-400"
              aria-hidden="true"
            />
            <PuzzlePieceIcon
              onClick={inviteToPlay}
              className="h-6 w-6 text-gray-400"
              aria-hidden="true"
            />
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
              // <div className="flex h-auto w-auto items-center justify-center space-x-1 rounded-[22px] bg-white text-gray-700 shadow">
              <li className="flex max-w-xl justify-start">
                <div className="relative flex max-w-xl justify-center rounded-[22px] bg-white p-3 text-gray-700 shadow">
                  <div class="h-2 w-2 animate-bounce rounded-full bg-gray-700 [animation-delay:-0.2s]"></div>
                  <div class="h-2 w-2 animate-bounce rounded-full bg-gray-700 [animation-delay:-0.15s]"></div>
                  <div class="h-2 w-2 animate-bounce rounded-full bg-gray-700"></div>
                </div>
              </li>
            ) : // </div>
            null}
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

            {isRecording ? (
              <StopIcon
                onClick={() => handleStopRecording()}
                className="h-7 w-7 cursor-pointer text-gray-400"
                aria-hidden="true"
              />
            ) : (
              <PlayCircleIcon
                onClick={() => handleStartRecording()}
                className="h-7 w-7 cursor-pointer text-gray-400"
                aria-hidden="true"
              />
            )}

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
            <MicrophoneIcon
              onClick={() => handleStartListening()}
              className="mr-3 h-6 w-6 text-gray-400"
              aria-hidden="true"
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
        {activeRecordings.map((recording) => (
          <div key={recording.id}>
            {isRecording ? (
              <div className="p-4">
                <video ref={recording.webcamRef} autoPlay />
              </div>
            ) : (
              <div></div>
            )}
            {!isCleared ? (
              <div className="relative p-5">
                <video ref={recording.previewRef} autoPlay loop />
                {recording.blob && (
                  <div className=" relative right-1 top-1 mt-3 flex -translate-y-1/2 translate-x-1/2">
                    <ArrowDownCircleIcon
                      onClick={() => handleDownloadRecording()}
                      className="h-8 w-8 text-kindyorange"
                    />
                    <XCircleIcon
                      onClick={() => handleClearRecording()}
                      className="h-8 w-8 text-kindyorange"
                    />
                  </div>
                )}
              </div>
            ) : (
              <div></div>
            )}
          </div>
        ))}
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

        <QuizModals
          isOpen={showQuizOptions}
          onClose={() => setShowQuizOptions(false)}
          selectedConversation={selectedConversation}
          userId={selectedConversation.userId}
          setIsWaitingForResponse={() => setIsWaitingForResponse(true)}
          setShowPlayModal={() => setShowPlayModal(true)}
          onSelectionChange={handleSelectionChange}
        />
        <StartQuizz
          isOpen={showPlayModal}
          selectedConversation={userInfo}
          userId={selectedConversation.userId}
          onClose={() => setShowPlayModal(false)}
          topic={selectedTopic} 
          level={selectedLevel} 
          lengthOfQuestions={selectedLengthOfQuestions}
        />
        <WaitModal
          isOpen={isWaitingForResponse}
          onClose={() => setIsWaitingForResponse(false)}
          topic={selectedTopic} 
          level={selectedLevel} 
          lengthOfQuestions={selectedLengthOfQuestions}
        />
      </div>
    </div>
  );
}

export default MessageContainer;
