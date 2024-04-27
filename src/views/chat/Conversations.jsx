import React, { useEffect, useState } from 'react';
import useChatStore from 'ZustStore/chatStore';
import { Link, useNavigate } from "react-router-dom";
import selectDiscussion from "assets/svg/selectDiscussion.svg"
import Conversation from "components/ui/Conversations";
import MessageContainer from 'components/ui/MessageContainer';
import { LoadingSpinner } from 'components';
import useSocketStore from "ZustStore/socketStore";
import messageSound from "assets/sound/message.mp3";
function Conversations() {
    const { conversations, loadingConversations, getConversations } = useChatStore();
    const [userConversations, setConversations] = useState([]);
    const [token, setToken] = useState("");
    const navigate = useNavigate();
    const [selectedConversation, setSelectedConversation] = useState({
        _id: "",
        userId: "",
        username: "",
        userProfilePic: "",
    });
    const { socket,onlineUsers } = useSocketStore();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setToken(token);
        }
        else {
            navigate("/auth/sign-in");
        }
        getConversations(token);
    }, [getConversations]);
    const handleConversationClick = (conversation) => {
        setSelectedConversation({
            _id: conversation._id,
            userId: conversation.participants[0]._id,
            username: conversation.participants[0].username,
            userProfilePic: "",
        });
    };

    useEffect(() => {
        socket.on("newMessage", (message) => {
            if (selectedConversation._id === message.conversationId) {
                const token = localStorage.getItem("token");
                getConversations(token);

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

        return () => socket.off("newMessage");
    }, [socket]);

    return (
        <div className="container-fluid mx-auto mt-25 lg:mt-15 bg-white">
            <div className="mt-20 lg:mt-12 min-w-full border rounded lg:grid lg:grid-cols-3">
                <div className="border-r border-gray-300 lg:col-span-1">
                    <div className="mx-3 my-3"></div>
                    <h2 className="my-2 mb-4 ml-2 text-lg text-gray-600" >Conversations ({conversations?.length})</h2>
                    {conversations?.length > 0 ? (
                        conversations?.map(conversation => (
                            <div key={conversation._id} onClick={() => handleConversationClick(conversation)}>
                                <Conversation conversation={conversation} isOnline={onlineUsers.includes(conversation.participants[0]._id)}
                                />
                            </div>))
                    ) : (
                        <p>No conversations found.</p>
                    )
                    }
                </div>
                <div className=" hidden md:col-span-2 md:block">
                    <div className="w-full" >
                        <div className=" flex flex-col justify-center items-center align-middle mt-15 mx-auto">
                            {!selectedConversation._id &&
                                <>
                                    <img src={selectDiscussion} className="w-1/2 lg:w-1/3 " alt="" />
                                    <h1 className=" text-base font-normal text-gray-600 mt-8 " >Select a discussion to start chatting</h1>
                                </>

                            }
                        </div>
                        {selectedConversation._id && <MessageContainer selectedConversation={selectedConversation} setSelectedConversation={setSelectedConversation} isOnline={onlineUsers.includes(selectedConversation.userId)} />}

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Conversations;