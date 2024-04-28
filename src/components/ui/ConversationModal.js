import React, { useState, useEffect } from "react";
import useChatStore from "ZustStore/chatStore";

function ConversationModal({ isOpen, onClose }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recipient, setRecipient] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const { getUsers, users, sendMessage, getConversations } = useChatStore();

  useEffect(() => {
    if (isOpen) {
      const token = localStorage.getItem("token");
      getUsers(token);
    }
  }, [isOpen]);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const handleRecipientChange = (e) => {
    const input = e.target.value;
    setRecipient(input);

    if (input.trim() === "") {
      setFilteredUsers(null);
    } else {
      const filteredUsers = users.filter((user) =>
        user.username.toLowerCase().startsWith(input.toLowerCase())
      );
      setFilteredUsers(filteredUsers);
    }
  };

  const handleCheckboxChange = (userId) => {
    console.log(userId);
    setSelectedUser(selectedUser === userId ? null : userId);
  };
  const isSendDisabled = selectedUser === null;
  const handleSendMessage = async () => {
    const token = localStorage.getItem("token");
    await sendMessage(token, {
      message: "Hi",
      recipientId: selectedUser,
    });
    await getConversations(token);
    onClose();
  };
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="h-1/2 w-1/3 rounded-md bg-white p-4 shadow-lg">
            <h2 className="mb-2 text-lg font-semibold">New Message</h2>
            <input
              type="text"
              placeholder="To:"
              value={recipient}
              onChange={handleRecipientChange}
              className="mb-2 w-full rounded-md border border-gray-300 px-3 py-2"
            />
            <div className="">
              {filteredUsers !== null ? (
                filteredUsers.map((user) => (
                  <div className="flex flex-row justify-between ">
                    <div className="flex space-x-2">
                      <img
                        src={user.image}
                        className="h-10 w-10 rounded-xl"
                        alt={user.username}
                      />
                      <div className="flex flex-col">
                        <span className="font-medium">{user.username}</span>
                        <span className="text-gray-500">{user.email}</span>{" "}
                      </div>
                    </div>

                    <div>
                      <input
                        type="checkbox"
                        // checked={() => setSelectedUser(user._id)}
                        onChange={() => handleCheckboxChange(user._id)}
                        className="w-18 mr-2 rounded-full "
                      />
                    </div>
                  </div>
                ))
              ) : (
                <p>Tap to search for a user</p>
              )}
              {filteredUsers !== null && filteredUsers.length === 0 && (
                <p>No account found</p>
              )}
            </div>
            <div className="mt-4 flex justify-end self-end">
              <button
                disabled={isSendDisabled}
                onClick={handleSendMessage}
                className="mr-2 rounded-md bg-kindyblue px-4 py-2 text-white shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Send
              </button>
              <button
                onClick={onClose}
                className="rounded-md bg-gray-300 px-4 py-2 text-gray-700 shadow hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ConversationModal;
