import React, { useEffect, useState } from "react";
import Banner from "./components/Banner";
import General from "./components/General";
import Notification from "./components/Notification";
import Project from "./components/Project";
import Storage from "./components/Storage";
import Upload from "./components/Upload";
import axios from "axios";
import EditProfileModal from "./components/EditProfile";
import { UserSearches } from "components";
import Loader from "components/button/Loader";
import ScheduleComponent from "./components/SchedualComponent";

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
      >
        Edit Profile
      </button>
    </div>
    <EditProfileModal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      userData={userData}
    />
    {/* Grid container */}
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-5">
      {/* Banner, Project, and UserSearches side by side */}
     
      <div className="lg:col-span-4">
        <Banner userData={userData} />
      </div>
      <div className="lg:col-span-8">
        <ScheduleComponent userData={userData.user} />
      </div>
      <div className="lg:col-span-4">
        <Project />
      </div>
      <div className="lg:col-span-4">
        <UserSearches />
      </div>
    
    </div>
  </div>
  );
};

export default ProfileOverview;
