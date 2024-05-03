import React, { useState } from 'react';
import axios from 'axios';

const EditStatusPopup = ({ userId, courseId, currentStatus, currentPaymentStatus, onClose, fetchUsers }) => {
  const [newStatus, setNewStatus] = useState(currentStatus);
  const [newPaymentStatus, setNewPaymentStatus] = useState(currentPaymentStatus);

  const handleStatusChange = async () => {
    try {
      const url = `http://localhost:3000/api/users/update-status`; // Update this URL to your actual API route
      const payload = {
        userId: userId,
        courseId: courseId,
        newCourseStatus: newStatus,
        newPaymentStatus: newPaymentStatus
      };
      await axios.post(url, payload);
      onClose(); // Close the pop-up after status is updated
      fetchUsers(); // Re-fetch the user data to update the table
    } catch (error) {
      console.error('Error updating status:', error);
      // Optionally handle error more gracefully
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-96">
        <h2 className="text-lg font-bold mb-4">Edit Course and Payment Status</h2>
        <label className="block mb-4">
          <span className="text-gray-700">New Course Status:</span>
          <select
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          >
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </select>
        </label>
        <label className="block mb-4">
          <span className="text-gray-700">New Payment Status:</span>
          <select
            value={newPaymentStatus}
            onChange={(e) => setNewPaymentStatus(e.target.value)}
            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          >
            <option value="paid">Paid</option>
            <option value="unpaid">Unpaid</option>
            <option value="rejected">Payment Rejected</option>
          </select>
        </label>
        <div className="flex justify-end">
          <button
            onClick={handleStatusChange}
            className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Update Status
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditStatusPopup;
