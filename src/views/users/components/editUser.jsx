import React, { useState } from 'react';

const EditUserModal = ({ user, onClose }) => {
  const [formData, setFormData] = useState({
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
    status: user.status,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You would normally handle the form submission here, for example, sending the updated data back to the server
    console.log(formData);
    onClose(); // Close the modal after submission
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Edit User</h3>
          <div className="mt-2 px-7 py-3">
            <form onSubmit={handleSubmit}>
              <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" className="mb-3 w-full px-3 py-2 border rounded" />
              <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" className="mb-3 w-full px-3 py-2 border rounded" />
              <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" className="mb-3 w-full px-3 py-2 border rounded" />
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="mb-3 w-full px-3 py-2 border rounded" />
              <select name="role" value={formData.role} onChange={handleChange} className="mb-3 w-full px-3 py-2 border rounded">
                <option value="user">User</option>
                <option value="admin">Admin</option>
                {/* Add more roles as needed */}
              </select>
              <select name="status" value={formData.status} onChange={handleChange} className="mb-3 w-full px-3 py-2 border rounded">
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                {/* Add more statuses as needed */}
              </select>
              <div className="items-center px-4 py-3">
                <button id="ok-btn" className="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300">
                  Save
                </button>
              </div>
            </form>
          </div>
          <div className="items-center px-4 py-3">
            <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;
