import React, { useEffect, useState } from "react";
import Banner from "./components/Banner";
import General from "./components/General";
import Notification from "./components/Notification";
import Project from "./components/Project";
import Storage from "./components/Storage";
import Upload from "./components/Upload";
import axios from "axios";
import EditProfileModal from "./components/EditProfile";
import ScheduleComponent from "./components/SchedualComponent";
import Loader from "components/button/Loader";

const ProfileOverview = () => {
  const [userData, setUserData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          return;
        }
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get('http://localhost:3000/api/auth/validateSession', config);
        console.log(response);
        setUserData(response.data);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    fetchUserData();
  }, []);

  if (!userData) {
    return <div><Loader></Loader></div>; // Or any other fallback UI
  }
  return (
    <div className="flex w-full flex-col items-center gap-7">
      <div className="self-start">
        <button
          onClick={handleEditClick}
          className="mt-20 bg-kindyblue hover:bg-kindyorange text-white font-bold py-2 px-4 rounded-tr-2xl rounded-bl-2xl"
       // Adjust as needed for the cube appearance
        >
          Edit Profile
        </button>
      </div>
      <EditProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        userData={userData}
      />
      <div className="w-full flex flex-col lg:flex-row gap-5">
        <div className="flex-1">
          <Banner userData={userData} />
        </div>
        <div className="flex-1">
          <ScheduleComponent userData={userData.user} />
        </div>
        {/* Adjust the below components as needed based on your layout requirements */}
        <div className="flex-1">
          <Project />
        </div>
      </div>
    </div>
  );
};

export default ProfileOverview;
