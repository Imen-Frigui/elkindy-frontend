import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [search, setSearch] = useState("");

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
      </div>
      
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg mt-4">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">Action</th>
              <th scope="col" className="py-3 px-6">Username</th>
              <th scope="col" className="py-3 px-6">Name</th>
              <th scope="col" className="py-3 px-6">Email</th>
              <th scope="col" className="py-3 px-6">Role</th>
              <th scope="col" className="py-3 px-6">Status</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="py-4 px-6">
                  <button className="bg-kindyblue rounded-md text-white font-bold py-1 px-3 rounded mr-2">Edit</button>
                  <button onClick={() => deleteUser(user._id)} className="bg-red-500 rounded-md text-white font-bold py-1 px-3 rounded-tr-2xl rounded-bl-2xl">Delete</button>
              </td>
                <td className="py-4 px-6">{user.username}</td>
                <td className="py-4 px-6">{`${user.firstName} ${user.lastName}`}</td>
                <td className="py-4 px-6">{user.email}</td>
                <td className="py-4 px-6">{user.role}</td>
                <td className="py-4 px-6">{user.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
