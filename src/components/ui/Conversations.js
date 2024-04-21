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
        <div class="flex justify-between">
          <span class="ml-2 block font-semibold text-gray-600">
            {user.username}
          </span>
          <span class="ml-2 block text-sm text-gray-600">8/14/2024</span>
        </div>
        <span class="ml-2 block text-sm text-gray-600">
          {/* {lastMessage.text.length > 18
            ? lastMessage.text.substring(0, 18) + "..."
            : lastMessage.text} */}
            {lastMessage.text}
        </span>
      </div>
    </div>
  );
}

export default Conversation;
