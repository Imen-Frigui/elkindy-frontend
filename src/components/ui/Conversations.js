import { useState } from "react";
import { format } from "date-fns";

function Conversation({ conversation, isOnline }) {
  const user = conversation.participants[0];
  const lastMessage = conversation.lastMessage;
  const updatedAt = conversation.updatedAt;
  const formattedDate = format(new Date(updatedAt), "MMMM do yyyy, h:mm a");
  const [isTruncated, setIsTruncated] = useState(true);
  const [selectedConversation, setSelectedConversation] = useState(null);

  const toggleTruncation = () => {
    setIsTruncated(!isTruncated);
  };
  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };
  return (
    <div
      className="hover:bg-sky-100 bg-sky-100 active flex cursor-pointer items-center rounded-xl border-b 
    border-gray-300 bg-gray-200 px-3 py-2 text-sm 
    transition duration-150 ease-in-out focus:outline-none "
    >
      <img
        src={user.image}
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
          <span className="ml-2 block text-sm text-gray-600">
            {formattedDate}
          </span>
        </div>
        <span
          className="ml-2 block text-sm text-gray-600"
          style={{
            maxWidth: "200px",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {lastMessage.text.length > 50
            ? lastMessage.text.slice(0, 50) + "..."
            : lastMessage.text}
        </span>
      </div>
    </div>
  );
}

export default Conversation;
