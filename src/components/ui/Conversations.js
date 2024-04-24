import { useState } from "react";

function Conversation({ conversation, isOnline }) {
  const user = conversation.participants[0];
  const lastMessage = conversation.lastMessage;
  const [selectedConversation, setSelectedConversation] = useState(null);

  return (
    <div
      className="hover:bg-sky-100 bg-sky-100 active flex cursor-pointer items-center border-b border-gray-300 
    px-3 py-2 text-sm transition duration-150 
    ease-in-out focus:outline-none"
    >
      <img
        alt="user-image"
        className="h-10 w-10 rounded-full object-cover"
      ></img>
      <div className="w-full pb-2">
        <div className="flex justify-between">
          <div className="flex space-x-2">
            <span class="ml-2 block font-semibold text-gray-600">
              {user.username}
            </span>
            {isOnline ? (
              <span className=" h-3 w-3 rounded-full bg-green-600"></span>
            ) : (
              <span className=" bg-grey-600 h-3 w-3 rounded-full"></span>
            )}
          </div>
          <span className="ml-2 block text-sm text-gray-600">8/14/2024</span>
        </div>
        <span className="ml-2 block text-sm text-gray-600">{lastMessage.text}</span>
      </div>
    </div>
  );
}

export default Conversation;
