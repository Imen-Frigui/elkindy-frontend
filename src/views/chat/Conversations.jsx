import React, { useEffect, useState } from 'react';
import useChatStore from 'ZustStore/chatStore';
import { Link, useNavigate } from "react-router-dom";
import selectDiscussion from "assets/svg/selectDiscussion.svg"
import Conversation from "components/ui/Conversations";
import MessageContainer from 'components/ui/MessageContainer';
import { LoadingSpinner } from 'components';

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
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setToken(token);
        }
        else {
            navigate("/auth/sign-in");
        }
        getConversations(token);
        console.log(conversations)
    }, [getConversations]);
    const handleConversationClick = (conversation) => {
        setSelectedConversation({
            _id: conversation._id,
            userId: conversation.participants[0]._id,
            username: conversation.participants[0].username,
            userProfilePic: "",
        });
    };

    return (
        <div className="container-fluid mx-auto mt-25 lg:mt-15 bg-white">
            <div className="mt-20 lg:mt-12 min-w-full border rounded lg:grid lg:grid-cols-3">
                <div className="border-r border-gray-300 lg:col-span-1">
                    <div className="mx-3 my-3"></div>
                    <h2 className="my-2 mb-4 ml-2 text-lg text-gray-600" >Conversations ({conversations?.length})</h2>
                    {loadingConversations ? (
                        <p><LoadingSpinner /></p>
                    ) : conversations?.length > 0 ? (
                        conversations?.map(conversation => (

                            <div key={conversation._id} onClick={() => handleConversationClick(conversation)}>
                                <Conversation conversation={conversation} />
                            </div>))
                    ) : (
                        <p>No conversations found.</p>
                    )
                    }
                </div>
                <div className=" hidden lg:col-span-2 lg:block">
                    <div className="w-full" >
                        <div className=" flex flex-col justify-center items-center align-middle mt-15 mx-auto">
                            {!selectedConversation._id &&
                                <>
                                    <img src={selectDiscussion} className="w-1/2 lg:w-1/3 " alt="" />
                                    <h1 className=" text-base font-normal text-gray-600 mt-8 " >Select a discussion to start chatting</h1>
                                </>

                            }
                        </div>
                        {selectedConversation._id && <MessageContainer selectedConversation={selectedConversation} />}

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Conversations;