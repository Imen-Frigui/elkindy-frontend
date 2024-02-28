import React, { useState, useEffect } from "react";
import { fetchUsers } from "../../services/user/userService";
import { differenceInYears } from 'date-fns';
const AdminRegistrationTable = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try { 
        const usersData = await fetchUsers();
        console.log(usersData); 
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
  
    getUsers();
  }, []);

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-center my-8">Admin Registration</h1>
      <table className="w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Username</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">RegistrationDate</th>
            <th className="px-4 py-2">age</th>
            <th className="px-4 py-2">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{user.username}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">{user.registrationDate ? new Date(user.registrationDate).toISOString().split('T')[0] : ''}</td>
              <td className="border px-4 py-2">{user.dateOfBirth ? differenceInYears(new Date(), new Date(user.dateOfBirth)) : ''}</td>
              <td className="border px-4 py-2">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminRegistrationTable;

