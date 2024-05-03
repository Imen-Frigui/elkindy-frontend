import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import EditStatusPopup from "./components/updateStatus";
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/modal";
import ScheduleComponentpopup from "./components/schedualPopup";
import { Button } from "@chakra-ui/react";
import AdminEnrollmentManagementModal from "./components/updateEnrollment";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [isEnrollmentModalOpen, setIsEnrollmentModalOpen] = useState(false);
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/users/getAllUsers');
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };


  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:3000/api/users/deleteUser/${userId}`);
      fetchUsers();  // Re-fetch users after deletion
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const filteredUsers = users.filter(user => {
    const username = user.username ? user.username.toLowerCase().includes(search.toLowerCase()) : false;
    const email = user.email ? user.email.toLowerCase().includes(search.toLowerCase()) : false;
    const role = user.role ? user.role.toLowerCase().includes(search.toLowerCase()) : false;
    const status = user.status ? user.status.toLowerCase().includes(search.toLowerCase()) : false;
    return username || email || role || status;
  });

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredUsers.length / usersPerPage); i++) {
    pageNumbers.push(i);
  }

  const exportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A3, A4, A5, etc.
    const orientation = "portrait"; // portrait or landscape

    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);
    const title = "User List";
    const headers = [["Username", "Name", "Email", "Role", "Status"]];

    // Use filteredUsers to include all filtered results in the PDF
    const data = filteredUsers.map(user => [
      user.username, 
      `${user.firstName} ${user.lastName}`, 
      user.email, 
      user.role, 
      user.status
    ]);

    let content = {
      startY: 50,
      head: headers,
      body: data,
    };

    doc.text(title, 40, 40);
    doc.autoTable(content);
    doc.save("users_list.pdf");
};
const showDeleteConfirmation = (userId) => {
  if (window.confirm("Are you sure you want to delete this user?")) {
      deleteUser(userId);
  }
};
const [selectedUser, setSelectedUser] = useState(null);
const handleEditStatus = (user) => {
  console.log(user)
  setSelectedUser(user);
};

const handleClosePopup = () => {
  setSelectedUser(null);
  fetchUsers(); // Reload the table after closing the popup
};

const [selectedUserData, setSelectedUserData] = useState(null); // State to store selected user data for modal
const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

const handleViewAvailability = (user) => {
  setSelectedUserData(user); // Set the selected user data for the availability modal
  setIsScheduleModalOpen(true); // Open the modal
};

const handleCloseScheduleModal = () => {
  setIsScheduleModalOpen(false); // Close the modal
};
const handleManageEnrollments = () => {
  setIsEnrollmentModalOpen(true);
};

const handleCloseEnrollmentModal = () => {
  setIsEnrollmentModalOpen(false);
};
  return (
    <div className="container mx-auto mt-5">
      <div className="flex justify-between items-center">
        <input
          type="text"
          className="w-1/4 p-2 border rounded-tr-2xl rounded-bl-2xl shadow"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={exportPDF} className="bg-kindyblue rounded-tr-2xl rounded-bl-2xl hover:bg-kindyorange text-white font-bold py-2 px-4 rounded">
          Export PDF
        </button>
        <button onClick={handleManageEnrollments} className="bg-kindyblue rounded-tr-2xl rounded-bl-2xl hover:bg-kindyorange text-white font-bold py-2 px-4 rounded">
          Manage Enrollments
        </button>
      </div>
      
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg mt-4">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">Username</th>
              <th scope="col" className="py-3 px-6">Name</th>
              <th scope="col" className="py-3 px-6">Email</th>
              <th scope="col" className="py-3 px-6">Role</th>
              <th scope="col" className="py-3 px-6">Status</th>
              <th scope="col" className="py-3 px-6">Edit</th>
              <th scope="col" className="py-3 px-6">Availability</th>

            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                
                <td className="py-4 px-6 font-medium ">{user.username}</td>
                <td className="py-4 px-6 font-medium" >{`${user.firstName} ${user.lastName}`}</td>
                <td className="py-4 px-6 font-medium">{user.email}</td>
                <td className="py-4 px-6 font-medium">{user.role}</td>
                <td className="py-4 px-6 font-medium">{user.status}</td>
                <td className="py-4 px-6 font-medium">
                <button  className="mr-5 hover:bg-blue-500 rounded-md text-blue-500 hover:text-white font-bold py-1 px-3 rounded-tr-2xl rounded-bl-2xl" onClick={() => handleEditStatus(user)}>Edit</button>    
                    <button onClick={() => showDeleteConfirmation(user._id)} className="hover:bg-red-500 rounded-md hover:text-white text-red-500 font-bold py-1 px-3 rounded-tr-2xl rounded-bl-2xl">Delete</button>
              </td>
             <td>
             <button onClick={() => handleViewAvailability(user)}>View Availability</button>             </td>
              </tr>
            ))}
          </tbody>
        </table>
        {isEnrollmentModalOpen && (
        <AdminEnrollmentManagementModal
          isVisible={isEnrollmentModalOpen}
          onClose={handleCloseEnrollmentModal}
        />
      )}
      {selectedUser && (
        <EditStatusPopup
          userId={selectedUser._id}
          currentStatus={selectedUser.status}
          onClose={handleClosePopup}
          fetchUsers={fetchUsers} 
        />
      )}
    <Modal isOpen={isScheduleModalOpen} onClose={handleCloseScheduleModal}>
        <ModalOverlay />
        <ModalContent maxW="400px" bg="gray.200" borderRadius="md">
          <ModalCloseButton />
          <ModalBody>
            <ScheduleComponentpopup userData={selectedUserData}  onClose={handleCloseScheduleModal} />
          </ModalBody>
          <ModalFooter>
         
          </ModalFooter>
        </ModalContent>
      </Modal>
        <nav className="mt-4">
          <ul className="inline-flex items-center -space-x-px">
            {pageNumbers.map(number => (
              <li key={number}>
                <button onClick={() => paginate(number)} className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-blue-500 hover:text-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                  {number}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
   
    </div>
  );
};

export default UserList;
