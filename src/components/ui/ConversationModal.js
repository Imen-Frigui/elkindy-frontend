import React, { useState } from "react";

function ConversationModal({ isOpen, onClose }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recipient, setRecipient] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleRecipientChange = (e) => {
    setRecipient(e.target.value);
  };

  const handleCheckboxChange = (userId) => {
    const isChecked = selectedUsers.includes(userId);
    if (isChecked) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  return (
    <>
      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="rounded-md bg-white p-4 shadow-lg">
            <h2 className="mb-2 text-lg font-semibold">Compose Message</h2>
            <input
              type="text"
              placeholder="To:"
              value={recipient}
              onChange={handleRecipientChange}
              className="mb-2 w-full rounded-md border border-gray-300 px-3 py-2"
            />
            <div className="flex flex-col">
              {/* Render list of users */}
              {/* {users.map((user) => (
                <label key={user.id} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user.id)}
                    onChange={() => handleCheckboxChange(user.id)}
                    className="mr-2"
                  />
                  {user.name}
                </label>
              ))} */}
            </div>
            <div className="mt-4 flex justify-end">
              <button
                // onClick={handleSendMessage}
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
